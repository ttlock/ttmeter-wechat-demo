// pages/water-meter/init/index.ts
import Config from "../../../api/tools/config";
import lodashMixin from "../../../mixins/lodash.js";
import * as Crypto from "../../../utils/crypto";
import * as HttpHandler from "../../../api/handle/httpHandler";
Page({
    ...lodashMixin,
    data: {
        deviceList: [], // 扫描到的智能设备列表
        isEnable: false, // 是否允许调用插件接口
        errCode: "", // 最后一次操作错误码
        errMsg: "", // 错误提示信息

        showInput: false, // 是否展示输入框
        deviceInfo: null, // 待添加的智能设备信息
        price: "", // 水费单价
    },
    onLoad() {
        const accessToken = Crypto.AES_Decrypt(wx.getStorageSync("access_token") || "") || ""; // 当前用户登录状态
        const uid = Number(Crypto.AES_Decrypt(wx.getStorageSync("uid") || "0") || "0") || 0; // 当前用户登录状态
        if (!accessToken || !(uid > 0)) this.handleLogout(() => { HttpHandler.showErrorMsg("登录已失效，请重新登录"); })
    },
    onReady() {
        this.handleInit();
    },
    onUnload() {
        if (!this.data.isEnable) return;
        this.data.isEnable = false;
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        plugin.stopAllOperations();
    },
    handleInputEmpty() {}, // 解决绑定数据输入报错
    /** 水费充值 */
    handleCheckInput(event) {
        const value = event?.detail?.value;
        if (!/^[1-9]{1}[0-9]{0,7}$/.test(value?.price || "")) {
            HttpHandler.showErrorMsg("请输入正确的水费单价(1-99999999)");
            return false;
        } else {
            return true;
        }
    },

    handleLogout(callback?: WechatMiniprogram.ReLaunchCompleteCallback) { this.debounce(this._handleLogout, 300, callback) },
    handleInit() { this.debounce(this._handleInit, 300) },
    handleSubmit(event) { this.debounce(this._handleSubmit, 300, event) },
    /** 用户退出登录 */
    _handleLogout(callback?: WechatMiniprogram.ReLaunchCompleteCallback) {
        wx.removeStorageSync("access_token");
        wx.removeStorageSync("uid");
        wx.reLaunch({
            url: "../../user/home/index",
            complete: callback
        });
    },

    /** 初始化蓝牙接口 */
    _handleInit() {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const accessToken = Crypto.AES_Decrypt(wx.getStorageSync("access_token") || "") || ""; // 当前用户登录状态
        const uid = Number(Crypto.AES_Decrypt(wx.getStorageSync("uid") || "0") || "0") || 0; // 当前用户登录状态
        if (!accessToken || !(uid > 0)) return;

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
			accessToken: accessToken, // 用户登录Token
			uid: uid, // 用户ID
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
    
    /** 开启蓝牙水表扫描(0.0.4) */
	startScan: async function() {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
		wx.showLoading({ title: "" });
		this.setData({ errMsg: "正在开启蓝牙水表扫描" });
		/**
		 * @TTMeterPlugin 开启蓝牙水表扫描(0.0.4)
		 * @description 接口不进行设备连接，安卓设备需【额外】开启【位置开关】、微信【位置授权】
		 */
		TTWaterMeter.startScan({
			onFoundDevice: (result) => {
				const index = (this.data.deviceList || []).findIndex(item => (item?.mac == result?.mac));
				this.data.deviceList.splice(index, index >= 0 ? 1 : 0, result);
				const list = this.data.deviceList
					.filter(item => ((Date.now() - item?.scanTime) <= 3000))
					.sort((a, b) => {
						if (a?.isInited == b?.isInited) return (b?.RSSI || 0) - (a?.RSSI || 0);
						else if (a?.isInited) return 1;
						else return -1;
					});
				this.setData({ deviceList: list });
			},
			onNoDeviceFound: (res) => {
				/**
				 * @description 安卓设备需【额外】开启【位置开关】、微信【位置授权】，触发回调将自动关闭蓝牙扫描
				 */
				console.log("安卓设备10s内未扫描到任意设备", res);
				this.setData({ errCode: res?.errCode, errMsg: `安卓设备10s内未扫描到任意设备：${res?.errMsg}` });
			}
		}).then(res => {
			wx.hideLoading({});
			console.log("开启蓝牙水表扫描完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `开启蓝牙水表扫描结束：${res?.errMsg}` });
		})
	},
	/** 关闭蓝牙水表扫描(0.0.4) */
	stopScan: async function() {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
		wx.showLoading({ title: "" });
		this.setData({ errMsg: "关闭蓝牙水表扫描" });
		/**
		 * @TTMeterPlugin 关闭蓝牙水表扫描(0.0.3)
		 */
		plugin.stopScan().then(res => {
			wx.hideLoading({});
			console.log("关闭蓝牙水表扫描完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `关闭蓝牙水表扫描结束：${res?.errMsg}`, deviceList: [] });
		})
    },
    /** 点击添加蓝牙智能水表 */
    toInit: async function (event) {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const deviceInfo = JSON.parse(JSON.stringify(event?.currentTarget?.dataset?.item || "{}")) as TTWaterMeter.DeviceModel;
		if (typeof deviceInfo?.isInited != "boolean") return;
		else if (deviceInfo.isInited) return wx.showModal({ content: '蓝牙水表已被添加，请先删除', showCancel: false });
		try {
			wx.showLoading({ title: "" });
			this.setData({ errMsg: "正在关闭蓝牙水表扫描" });
			/**
			 * @TTMeterPlugin 停止蓝牙水表扫描(0.0.3)
			 * @description 安卓设备需【额外】开启【位置开关】、微信【位置授权】
			 */
			const stopRes = await plugin.stopScan();
            console.log("停止蓝牙水表扫描完成", stopRes);
            this.setData({
                errCode: stopRes?.errCode,
                errMsg: `停止蓝牙水表扫描结束：${stopRes?.errMsg}`,
                showInput: stopRes?.errCode == 0 ? true : false,
                deviceInfo: stopRes?.errCode == 0 ? deviceInfo : null,
                deviceList: [],
                price: ""
            })
		} catch(err) {
			console.log(err);
		} finally {
            wx.hideLoading({});
		}
    },
    /** 表单提交 */
    async _handleSubmit(event) {
        const value = event?.detail?.value;
        if (!this.handleCheckInput(event)) return;
        this.add(Number(value?.price));
    },
	/** 添加蓝牙智能水表(0.0.4) */
	add: async function(price: number) {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
        const TTWaterMeter = plugin.TTWaterMeter;
        const deviceInfo = this.data?.deviceInfo as TTWaterMeter.DeviceModel;
		if (typeof deviceInfo?.isInited != "boolean") return;
		else if (deviceInfo.isInited) return wx.showModal({ content: '蓝牙水表已被添加，请先删除', showCancel: false });
		try {
			wx.showLoading({ title: "" });
			this.setData({ errMsg: `正在连接智能水表：${deviceInfo.mac}`, deviceList: [] });
			const connRes = await TTWaterMeter.connect(deviceInfo.mac);
			console.log("连接蓝牙水表完成", connRes);
			if (connRes?.errCode != 0) {
				return this.setData({ errCode: connRes?.errCode, errMsg: `连接蓝牙水表结束：${connRes?.errMsg}` });
			}
			console.log("水表连接", deviceInfo, 1111)
			this.setData({ errMsg: `正在添加蓝牙水表${deviceInfo?.name}, 单价：${price}元/t, 付费方式：${deviceInfo?.payMode == 1 ? '预付费' : '计能'}` });
			const addRes = await TTWaterMeter.add({
				name: deviceInfo?.name,
				payMode: deviceInfo?.payMode,
				price: price
			});
			console.log("添加蓝牙水表完成", addRes);
            this.setData({
                errCode: addRes?.errCode,
                errMsg: `添加蓝牙水表结束：${addRes?.errMsg}`,
                showInput: addRes?.errCode == 0 ? false : true
            });
            if (addRes?.errCode == 0) {
                HttpHandler.showErrorMsg("蓝牙水表已添加");
                setTimeout(() => { wx.navigateBack() }, 1500);
            }
		} catch(err) {
			console.log(err);
		} finally {
			const res = await plugin.finishOperations();
			wx.hideLoading({});
            console.log("操作结束", res);
            // wx.navigateBack()
			// this.setData({ errCode: res?.errCode, errMsg: `断开蓝牙水表连接结束：${res?.errMsg}` });
		}
    },
    /** 中断连接(0.0.4) */
	stopAllOperations() {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
	    wx.showLoading({ title: "" });
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
    /** 修改日志输出开关(0.0.3) */
	handleChangeLog() {
        const plugin = requirePlugin("ttmeter-plugin") as TTMeterPlugin; // 引入插件
		let flag = !this.data.log;
		this.setData({ log: flag })
		plugin.setShowLog(flag, this._showLog);
		this.setData({ errMsg: `当前日志开关：${flag}` });
	},
})