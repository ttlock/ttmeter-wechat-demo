// pages/water-meter/detail/index.ts
import Config from "../../../api/tools/config";
import lodashMixin from "../../../mixins/lodash.js";
import * as Crypto from "../../../utils/crypto";
import * as WaterMeterAPI from "../../../api/interfaces/waterMeter";
import * as WaterMeterUserAPI from "../../../api/interfaces/waterMeterUser";
import * as HttpHandler from "../../../api/handle/httpHandler";
Page({
    ...lodashMixin,
    data: {
        meterId: 0, // 管理员登录智能设备ID
        MAC: "", // 租客登录智能设备MAC地址
        meterInfo: null,
        isEnable: false, // 是否允许调用插件接口
        errCode: "", // 最后一次操作错误码
        errMsg: "", // 错误提示信息

        showInput: false, // 1 -设置总用水量, 2 -租客充值, 3 -设置剩余水量, 4 -管理员充值, 5 -配置APN, 6 -配置远程服务器
        totalM3: "", // 总用水量
        remainderM3: "", // 剩余水量
        executeToken: "", // 租客充值token
        rechargeM3: "", // 管理员充值水量
        deviceInfo: null, // 水表设备信息(1.3.0)
        apn: "", // APN接入点名称
        serverAddress: "", // 远程服务器地址
        portNumber: "", // 远程服务器端口
    },
    onLoad(option) {
        const ID = Number(option?.id || "0") || 0;
        const MAC = String(option?.mac || "");
        if (ID > 0) { // 管理员登录
            this.data.meterId = ID;
            this.setData({ meterId: ID, MAC: "" })
        } else if (/^([0-9a-fA-F]{2}.){5}([0-9a-fA-F]{2})$/.test(MAC)) { // 租客登录
            this.data.MAC = MAC;
            this.setData({ meterId: 0, MAC: MAC })
        } else {
            this.handleLogout(() => { HttpHandler.showErrorMsg("无效地址，请重新登录"); })
        }
    },
    onReady() {
        const ID = this.data.meterId;
        const MAC = this.data.MAC;
        if (!!ID) this.handleLoadAdminInfo(ID, true); // 管理员登录
        else if (!!MAC) this.handleLoadTenantInfo(MAC, true); // 租客登录
    },
    onUnload() {
        if (!this.data.isEnable) return;
        this.data.isEnable = false;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        plugin.stopAllOperations();
    },
    handleInputEmpty() {}, // 解决绑定数据输入报错
    /** 表单验证 */
    handleCheckInput(event) {
        const target = event?.detail?.target?.dataset?.target;
        const value = event?.detail?.value;
        if (target == "TOTAL_M3") {
            if (!/^[1-9]{1}[0-9]{0,4}$/.test(value?.totalM3 || "")) {
                HttpHandler.showErrorMsg("请输入正确的总用水量(1-99999)");
                return false;
            } else {
                return true;
            }
        } else if (target == "TENANT_RECHARGE") {
            if (!!!value?.executeToken) {
                HttpHandler.showErrorMsg("请填写租客充值token(可向管理员申请)");
                return false;
            } else {
                return true;
            }
        } else if (target == "REMAINDER_M3") {
            if (!/^[1-9]{1}[0-9]{0,4}$/.test(value?.remainderM3 || "")) {
                HttpHandler.showErrorMsg("请输入正确的剩余水量(1-99999)");
                return false;
            } else {
                return true;
            }
        } else if (target == "RECHARGE_M3") {
            if (!/^[1-9]{1}[0-9]{0,2}$/.test(value?.rechargeM3 || "")) {
                HttpHandler.showErrorMsg("请输入正确的待充值水量(1-999)");
                return false;
            } else {
                return true;
            }
        } else if (target == "CONFIG_APN") {
            if (!!!value?.apn) {
                HttpHandler.showErrorMsg("请输入APN接入点名称");
                return false;
            } else {
                return true;
            }
        } else if (target == "CONFIG_SERVER") {
            const portNumber = Number(value?.portNumber || 0);
            if (!!!value?.serverAddress) {
                HttpHandler.showErrorMsg("请输入远程服务器地址");
                return false;
            } else if (!/^[1-9]{1}[0-9]{0,4}$/.test(String(value?.portNumber || "")) || portNumber > 65535) {
                HttpHandler.showErrorMsg("请输入正确的远程服务器端口(1-65535)");
                return false;
            } else {
                return true;
            }
        } else {
            HttpHandler.showErrorMsg("无效操作");
            return false;
        }
    },

    handleLogout(callback?: WechatMiniprogram.ReLaunchCompleteCallback) { this.debounce(this._handleLogout, 300, callback) },
    handleLoadAdminInfo(meterId: number, needInit?: boolean) { this.debounce(this._handleLoadAdminInfo, 300, meterId, needInit) },
    handleLoadTenantInfo(meterMAC: string, needInit?: boolean) { this.debounce(this._handleLoadTenantInfo, 300, meterMAC, needInit) },
    handleInit() { this.debounce(this._handleInit, 300) },
    handleReload() { this.debounce(this._handleReload, 300) },
    toSetTotalUsage() { this.debounce(this._toSetTotalUsage, 300) },
    toSetWaterMeter() { this.debounce(this._toSetWaterMeter, 300) },
    toChargeMeter() { this.debounce(this._toChargeMeter, 300) },
    toConfigApn() { this.debounce(this._toConfigApn, 300) },
    toConfigServer() { this.debounce(this._toConfigServer, 300) },
    handleSubmit(event) { this.debounce(this._handleSubmit, 300, event) },
    /** 表单提交 */
    _handleSubmit(event) {
        const target = event?.detail?.target?.dataset?.target;
        const value = event?.detail?.value;
        if (!this.handleCheckInput(event)) return;
        switch(target) {
        case "TOTAL_M3": this.setTotalUsage(Number(value?.totalM3)); break;
        case "TENANT_RECHARGE": this.chargeWaterMeter(String(value?.executeToken)); break;
        case "REMAINDER_M3": this.setWaterMeter(Number(value?.remainderM3)); break;
        case "RECHARGE_M3": this.chargeWaterMeter(Number(value?.rechargeM3)); break;
        case "CONFIG_APN": this.configMeterApn(String(value?.apn)); break;
        case "CONFIG_SERVER": this.configMeterServer(String(value?.serverAddress), Number(value?.portNumber)); break;
        }
    },
    /** 用户退出登录 */
    _handleLogout(callback?: WechatMiniprogram.ReLaunchCompleteCallback) {
        wx.removeStorageSync("access_token");
        wx.removeStorageSync("uid");
        wx.reLaunch({
            url: "../../user/home/index",
            complete: callback
        });
    },
    /** 加载管理员设备信息 */
    _handleLoadAdminInfo(meterId: number, needInit?: boolean) {
        wx.showLoading({ title: "Loading...", mask: true });
        WaterMeterAPI.detail({ waterMeterId: meterId }).then(res => {
            wx.hideLoading();
            if (HttpHandler.isResponseTrue(res)) {
                if (res?.waterMeterId) {
                    this.setData({ meterInfo: res });
                    wx.setNavigationBarTitle({ title: `${res?.number || ""}(管理员)` });
                    if (needInit) wx.nextTick(() => this.handleInit());
                    // this.handleConfigServerInfo(accessToken, uid);
                } else {
                    wx.navigateBack({ complete: () => {
                        setTimeout(() => HttpHandler.showErrorMsg("设备信息加载失败"), 1200)
                    }});
                }
            } else {
                this.handleLogout(() => { HttpHandler.handleResponseError(res); });
            }
        }).catch(err => {
            wx.hideLoading();
            this.handleLogout(() => { HttpHandler.handleServerError(err); });
        })
    },
    /** 加载租客设备信息 */
    _handleLoadTenantInfo(meterMAC: string, needInit?: boolean) {
        wx.showLoading({ title: "Loading...", mask: true });
        wx.removeStorageSync("access_token");
        wx.removeStorageSync("uid");
        WaterMeterUserAPI.detail({ mac: meterMAC }).then(res => {
            wx.hideLoading();
            if (HttpHandler.isResponseTrue(res)) {
                if (res?.waterMeterId) {
                    this.setData({ meterInfo: res });
                    wx.setNavigationBarTitle({ title: `${res?.number || ""}(租客)` });
                    if (needInit) wx.nextTick(() => this.handleInit());
                    // this.handleConfigServerInfo(accessToken, uid);
                } else {
                    this.handleLogout(() => { HttpHandler.showErrorMsg("MAC地址不正确，请重新登录"); });
                }
            } else {
                this.handleLogout(() => { HttpHandler.handleResponseError(res); });
            }
        }).catch(err => {
            wx.hideLoading();
            this.handleLogout(() => { HttpHandler.handleServerError(err); });
        })
    },
    /** 重新加载数据 */
    _handleReload() {
        const ID = this.data.meterId;
        const MAC = this.data.MAC;
        if (!!ID) this.handleLoadAdminInfo(ID, false); // 管理员登录
        else if (!!MAC) this.handleLoadTenantInfo(MAC, false); // 租客登录
    },

    /** 初始化蓝牙接口 */
    _handleInit() {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const accessToken = Crypto.AES_Decrypt(wx.getStorageSync("access_token") || "") || ""; // 当前用户登录状态
        const uid = Number(Crypto.AES_Decrypt(wx.getStorageSync("uid") || "0") || "0") || 0; // 当前用户登录状态

		/**
		 * @TTMeterPlugin 设置用户操作日志输出方案(0.0.3)
		 */
		plugin.setShowLog(Config.SHOW_PLUGIN_LOG, this._showLog);
		/**
		 * @TTMeterPlugin 配置远程服务器请求信息(0.0.3)
		 * @description 该接口不测试服务器参数是否有效
		 */
		const flag = plugin.setClientParam(JSON.parse(JSON.stringify({
			url: `${Config.BASE_DOMAIN}/v3//waterMeter/executeCommand`, // 服务器域名(必填)
			clientId: Config.CLIENT_ID, // Client ID(必填)
			clientSecret: Config.CLIENT_SECRET, // Client Secret(必填)
			accessToken: accessToken || undefined, // 用户登录Token(不传为租客)
			uid: uid || undefined, // 用户ID(不传为租客)
        })))
        console.log("服务器参数配置完成", flag);
        if (!flag) {
            HttpHandler.showErrorMsg("服务器配置失败...");
            return;
        }
		
		wx.showLoading({ title: "初始化中...", mask: true });
		this.setData({ errMsg: "正在初始化蓝牙接口" });
		/**
		 * @TTMeterPlugin 初始化蓝牙调用参数(0.0.3)
		 */
		plugin.init({
			onNetworkWeakChange: this._onNetworkWeakChange, // 弱网状态改变(可选)
			onBluetoothAdapterStateChange: this._onBluetoothAdapterStateChange, // 弱网状态改变(可选)
			onBLEDisconnect: this._onBLEDisconnect, // 设备连接状态改变(可选)
		}).then(res => {
			wx.hideLoading({});
			console.log("初始化蓝牙接口完成", res);
			this.setData({
                errCode: res?.errCode,
                errMsg: `初始化蓝牙接口结束：${res?.errMsg}`,
                isEnable: res?.errCode == 0 ? true : false
            });
		});
    },
    /** 日志回调 */
	_showLog: function(...args) {
		console.log("操作日志：", ...args);
    },
    /** 弱网状态改变回调 */
	_onNetworkWeakChange: function(result) {
		console.log("检测到网络状态变化", result);
	},
	/** 蓝牙适配器启用状态变化回调 */
	_onBluetoothAdapterStateChange: function(result) {
		console.log("检测到蓝牙适配器状态变化", result);
	},
	/** 设备断连回调 */
	_onBLEDisconnect: function(result) {
        console.log("检测到设备断开链接", result);
        HttpHandler.showErrorMsg(`设备已断开连接，deviceId：${result?.deviceId}`);
		// this.setData({ errMsg: `设备已断开连接，deviceId：${result?.deviceId}` });
    },
    
    /** 修改日志输出开关(0.0.3) */
	handleChangeLog() {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
		let flag = !this.data.log;
		this.setData({ log: flag })
		plugin.setShowLog(flag, this._showLog);
		this.setData({ errMsg: `当前日志开关：${flag}` });
	},
    /** 中断连接(0.0.4) */
	stopAllOperations() {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
	    wx.showLoading({ title: "Loading..." });
	    this.setData({ errMsg: "正在强行停止蓝牙操作" });
		/**
		 * @TTMeterPlugin 停止所有蓝牙操作(0.0.4)
		 * @description 若调用时设备已断开连接，该接口将跳过操作直接返回错误码
		 */
	    plugin.stopAllOperations().then(res => {
	        wx.hideLoading({});
	        console.log("强行停止蓝牙操作完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `强行停止蓝牙操作结束：${res?.errMsg}` });
	    })
    },
    /** 删除蓝牙智能水表(0.0.4) */
	async DeleteMeter() {
        const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg:  `正在删除蓝牙水表：${MAC}` });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 删除蓝牙智能水表(0.0.4)
			 */
			const res = await TTWaterMeter.delete({});
			wx.hideLoading({});
			console.log("删除蓝牙水表数据完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `删除蓝牙水表数据结束：${res?.errMsg}` });
            if (res?.errCode == 0) {
                HttpHandler.showErrorMsg("蓝牙电表已删除");
                setTimeout(() => { wx.navigateBack() }, 1500);
            }
	    } catch(err) {
            console.log(err);
            this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
    },
    
    /** 蓝牙水表抄表(0.0.4) */
    async syncWaterMeterState() {
        const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail | IWaterMeterUser.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: "正在同步蓝牙水表数据" });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 蓝牙水表抄表，与服务器同步蓝牙水表数据(0.0.4)
			 * @description 调用成功后，请通过服务器接口重新获取蓝牙水表数据
			 */
			const res = await TTWaterMeter.readData();
			wx.hideLoading({});
			console.log("同步蓝牙水表数据完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `同步蓝牙水表数据结束：${res?.errMsg}` });
            this.handleReload();
        } catch(err) {
            console.log(err);
            this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
    },
    /** 水量充值 */
    _toChargeMeter() {
        const ID = this.data.meterId;
        const MAC = this.data.MAC;
        if (!!ID) this.setData({ showInput: 4, rechargeM3: "" }); // 管理员充值
        else if (!!MAC) this.setData({ showInput: 2, executeToken: "" }); // 租客登录
    },
    /** 蓝牙水表充值(0.0.4) */
    async chargeWaterMeter(tokenOrM3: string | number) {
        const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
        const executeToken = typeof tokenOrM3 == "string" ? tokenOrM3 : undefined;
        const rechargeM3 = typeof tokenOrM3 == "string" ? undefined : tokenOrM3;
        const rechargeAmount = typeof tokenOrM3 == "string" ? undefined : (tokenOrM3 * Number(meterInfo?.price || 0));
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: "正在充值..." });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
            if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 蓝牙水表充值(0.0.4)
			 * @description 调用成功后，请【额外】调用【蓝牙抄表接口】更新水表数据
			 */
			let res = await TTWaterMeter.recharge(JSON.parse(JSON.stringify({
				rechargeAmount: rechargeAmount || undefined,
				rechargeM3: rechargeM3 || undefined,
				executeToken: executeToken || undefined // TODO 充值token(必填)
			})));
			console.log("蓝牙水表充值完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `蓝牙水表充值结束：${res?.errMsg}, 正在抄表`, showInput: false });
			/**
			 * @TTMeterPlugin 蓝牙水表抄表，与服务器同步蓝牙水表数据(0.0.4)
			 * @description 调用成功后，请通过服务器接口重新获取蓝牙水表数据
			 */
			res = await TTWaterMeter.readData();
			wx.hideLoading({});
			console.log("同步蓝牙水表数据完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `同步蓝牙水表数据结束：${res?.errMsg}` });
            this.handleReload();
        } catch(err) {
			wx.hideLoading({});
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
			await plugin.finishOperations();
		}
    },
    /** 设置剩余水量 */
    _toSetWaterMeter() {
        this.setData({ showInput: 3, remainderM3: "" });
    },
    /** 蓝牙水表设置水量(0.0.4) */
	async setWaterMeter(remainderM3: number) {
	    const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
	    this.setData({ errMsg: `正在设置水表水量: ${remainderM3}t` });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 设置蓝牙水表水量(0.0.4)
			 * @description 调用成功后，请【额外】调用【蓝牙抄表接口】更新水表数据
			 */
			let res = await TTWaterMeter.setRemainingWater({
				remainderM3: remainderM3, // 剩余水量(必填)
			});
			console.log("水量设置完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `水量设置结束：${res?.errMsg}, 正在抄表`, showInput: false });
            /**
			 * @TTMeterPlugin 蓝牙水表抄表，与服务器同步蓝牙水表数据(0.0.4)
			 * @description 调用成功后，请通过服务器接口重新获取蓝牙水表数据
			 */
			res = await TTWaterMeter.readData();
			console.log("同步蓝牙水表数据完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `同步蓝牙水表数据结束：${res?.errMsg}` });
            this.handleReload();
	    } catch(err) {
			wx.hideLoading({});
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
			await plugin.finishOperations();
		}
	},
	/** 蓝牙水表清空水量(0.0.4) */
	async clearWaterMeter() {
	    const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
	    this.setData({ errMsg: "正在清空水表水量" });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 清空蓝牙水表水量(0.0.4)
			 * @description 调用成功后，请【额外】调用【蓝牙抄表接口】更新水表数据
			 */
			let res = await TTWaterMeter.clearRemainingWater({});
			console.log("水量清空完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `水量清空结束：${res?.errMsg}, 正在抄表` });
	        /**
			 * @TTMeterPlugin 蓝牙水表抄表，与服务器同步蓝牙水表数据(0.0.4)
			 * @description 调用成功后，请通过服务器接口重新获取蓝牙水表数据
			 */
			res = await TTWaterMeter.readData();
			console.log("同步蓝牙水表数据完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `同步蓝牙水表数据结束：${res?.errMsg}` });
            this.handleReload();
	    } catch(err) {
			wx.hideLoading({});
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
			await plugin.finishOperations();
		}
	},
    /** 设置水表通断水状态(0.0.4) */
	async setWaterOnOff() {
		const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: `正在设置通断水状态：${meterInfo?.onOff == 1  ? '断水': "通水"}` });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 设置水表通断水状态(0.0.4)
			 * @description 若调用时设备已断开连接，该接口将跳过操作直接返回错误码
			 */
			const res = await TTWaterMeter.setWaterOnOff({
				onOff: meterInfo?.onOff == 1 ? false : true
			});
			console.log("设置水表通断水状态完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `设置水表通断水状态结束：${res?.errMsg}` });
            this.handleReload();
	    } catch(err) {
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
    },
    /** 设置水表付费模式(0.0.4) */
	async configWorkMode() {
		const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: `正在切换水表付费模式：${meterInfo?.payMode == 0 ? '预付费模式': '计能模式'}` });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 设置水表付费模式(0.0.4)
			 * @description 调用成功后，请通过服务器接口重新获取蓝牙水表数据
			 */
			const res = await TTWaterMeter.setPayMode({
				payMode: meterInfo?.payMode == 0 ? 1 : 0,
				price: Number(meterInfo?.price)
			});
			console.log("设置水表付费模式完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `设置水表付费模式结束：${res?.errMsg}` });
			this.handleReload();
        } catch(err) {
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
    },
    /** 设置总用水量 */
    _toSetTotalUsage() {
        this.setData({ showInput: 1, totalM3: "" });
    },
    /** 设置总用水量(0.0.4) */
	async setTotalUsage(totalM3: number) {
		const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: `正在设置总用水量: ${totalM3}t` });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 设置总用水量(0.0.4)
			 * @description 调用成功后，请通过服务器接口重新获取蓝牙水表数据
			 */
			const res = await TTWaterMeter.setTotalUsage({
				totalM3: totalM3,
			});
			console.log("设置总用水量完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `设置总用水量结束：${res?.errMsg}, 当前总用水量：${totalM3}t`, showInput: false });
            this.handleReload();
	    } catch(err) {
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
	},
	/** 获取水表特征值(0.0.4) */
	async getFeatureValue() {
		const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: "正在查询水表特征值" });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 获取水表特征值(0.0.4)
			 * @description 调用成功后，请通过服务器接口重新获取蓝牙水表数据
			 */
			const res = await TTWaterMeter.getFeatureValue();
			console.log("查询水表特征值完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `查询水表特征值结束：${res?.errMsg}` });
            this.handleReload();
	    } catch(err) {
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
	},
    /** 维持蓝牙智能水表连接(1.2.0) */
    async keepConnection() {
        const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: "正在维持水表蓝牙连接" });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 维持蓝牙智能水表连接(1.2.0)
			 * @description 设备长时间无操作将自动断开连接，批量操作间隔较长时可调用该接口维持当前连接
			 */
			const res = await TTWaterMeter.keepConnection();
			console.log("维持蓝牙水表连接完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `维持蓝牙水表连接结束：${res?.errMsg}` });
	    } catch(err) {
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
    },
    /** 重置蓝牙智能水表(1.3.0) */
    async resetMeter() {
        const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
        const modalRes = await wx.showModal({ title: "重置水表", content: "重置将影响水表内的数据，请谨慎操作！是否继续？" });
        if (!modalRes?.confirm) return;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: "正在重置蓝牙水表" });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 重置蓝牙智能水表(1.3.0)
			 * @description 重置将影响水表内的数据，请谨慎操作
			 */
			const res = await TTWaterMeter.reset({});
			console.log("重置蓝牙水表完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `重置蓝牙水表结束：${res?.errMsg}` });
            this.handleReload();
	    } catch(err) {
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
    },
    /** 获取水表设备信息(1.3.0) */
    async getDeviceInfo() {
        const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: "正在查询水表设备信息" });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 获取水表设备信息(1.3.0)
			 * @description 该接口仅4G版本智能水表支持，设备信息通过返回值data域返回
			 */
			const res = await TTWaterMeter.getDeviceInfo({});
			console.log("查询水表设备信息完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `查询水表设备信息结束：${res?.errMsg}`, deviceInfo: res?.data || null });
	    } catch(err) {
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
    },
    /** 配置水表APN */
    _toConfigApn() {
        this.setData({ showInput: 5, apn: "" });
    },
    /** 配置水表4G模块APN(1.3.0) */
    async configMeterApn(apn: string) {
        const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: `正在配置水表APN: ${apn}` });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 配置水表4G模块APN(1.3.0)
			 * @description 该接口仅4G版本智能水表支持
			 */
			const res = await TTWaterMeter.configApn({ apn: apn });
			console.log("配置水表APN完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `配置水表APN结束：${res?.errMsg}`, showInput: false });
	    } catch(err) {
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
    },
    /** 配置水表远程服务器地址 */
    _toConfigServer() {
        this.setData({ showInput: 6, serverAddress: "", portNumber: "" });
    },
    /** 配置水表远程服务器地址(1.3.0) */
    async configMeterServer(serverAddress: string, portNumber: number) {
        const meterInfo = this.data?.meterInfo as IWaterMeter.Result.Detail;
        const MAC = meterInfo?.mac;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "Loading..." });
		this.setData({ errMsg: `正在配置水表远程服务器：${serverAddress}:${portNumber}` });
		try {
			const connRes = await TTWaterMeter.connect(MAC);
			if (connRes?.errCode != 0) throw(connRes);
			/**
			 * @TTMeterPlugin 配置水表4G模块远程上报的服务器地址及端口(1.3.0)
			 * @description 该接口仅4G版本智能水表支持
			 */
			const res = await TTWaterMeter.configServer({
				serverAddress: serverAddress, // 远程服务器地址(必填)
				portNumber: portNumber // 远程服务器端口(必填)
			});
			console.log("配置水表远程服务器完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `配置水表远程服务器结束：${res?.errMsg}`, showInput: false });
	    } catch(err) {
			this.setData({ errCode: err?.errCode, errMsg: `操作结束：${err?.errMsg}` });
		} finally {
            await plugin.finishOperations();
            wx.hideLoading({});
		}
    },
})