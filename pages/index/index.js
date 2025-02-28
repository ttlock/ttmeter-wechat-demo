/** TODO 请修改为实际的蓝牙电表MAC地址(1.0.0) */
const MAC = "3F:37:D5:73:69:70";
const plugin = requirePlugin("ttmeter-plugin"); // 引入插件

Page({
    data: {
        log: false,
        errCode: 0,
        errMsg: ""
    },
    onLoad() {
    },
	onReady() {
		/**
		 * @TTMeterPlugin 设置用户操作日志输出方案(1.0.0)
		 */
		plugin.setShowLog(this.data.log, this._showLog);
		
		wx.showLoading({ title: "" });
		this.setData({ errMsg: "正在初始化蓝牙接口" });
		/**
		 * @TTMeterPlugin 初始化蓝牙调用参数(1.0.0)
		 * @description 该接口不测试服务器参数是否有效
		 */
		plugin.init({
			host: "", // 服务器域名(必填)
			clientId: "", // Client ID(必填)
			clientSecret: "", // Client Secret(必填)
			packageName: "", // 包名(必填)
			onNetworkWeakChange: this._onNetworkWeakChange, // 弱网状态改变(可选)
			onBluetoothAdapterStateChange: this._onBluetoothAdapterStateChange, // 弱网状态改变(可选)
			onBLEDisconnectStateChange: this._onBLEDisconnectStateChange, // 设备连接状态改变(可选)
		}).then(res => {
			wx.hideLoading({});
			console.log("初始化蓝牙接口完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `初始化蓝牙接口结束：${res?.errMsg}` });
		});
	},
	/** 跳转使用组件调用(1.0.0) */
	handleToUseComponent() {
		wx.navigateTo({ url: "../use-cp/index" });
	},
	/** 日志回调(1.0.0) */
	_showLog: function(...args) {
		console.log("操作日志：", ...args);
	},
	/** 弱网状态改变回调(1.0.0) */
	_onNetworkWeakChange: function(result) {
		console.log("检测到网络状态变化", result);
	},
	/** 蓝牙适配器启用状态变化回调(1.0.0) */
	_onBluetoothAdapterStateChange: function(result) {
		console.log("检测到蓝牙适配器状态变化", result);
	},
	/** 设备断连回调(1.0.0) */
	_onBLEDisconnectStateChange: function(result) {
		console.log("检测到设备断开链接", result);
		this.setData({ errMsg: `设备已断开连接，deviceId：${result?.deviceId}` });
	},
	/** 电表设备扫描定位(1.0.0) */
    scan: async function() {
		wx.showLoading({ title: "" });
		this.setData({ errMsg: "正在扫描定位蓝牙电表" });
		/**
		 * @TTMeterPlugin 扫描定位蓝牙电表(1.0.0)
		 * @description 接口不进行设备连接，安卓设备需【额外】开启【位置开关】、微信【位置授权】
		 */
		plugin.scanBLEElecMeter(MAC).then(res => {
			wx.hideLoading({});
			console.log("电表扫描定位完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `电表扫描定位结束：${res?.errMsg}` });
		})
    },
	/** 连接蓝牙电表(1.0.0) */
    connect: async function() {
        wx.showLoading({ title: "" });
        this.setData({ errMsg: "正在连接蓝牙电表" });
		/**
		 * @TTMeterPlugin 连接蓝牙电表(1.0.0)
		 * @description 接口同时仅允许连接一台设备
		 * 	1. 若需切换设备，请先调用handleFinishOperations关闭前一设备的连接
		 * 	2. 若前已设备连接未关闭，连接过程中可能触发前一设备断连回调
		 */
        plugin.connectBLEElecMeter(MAC).then(res => {
			wx.hideLoading({});
			console.log("连接蓝牙电表完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `连接蓝牙电表结束：${res?.errMsg}` });
        });
    },
	/** 断开蓝牙电表连接(1.0.0) */
    disconnect() {
        wx.showLoading({ title: "" });
        this.setData({ errMsg: "正在断开蓝牙电表连接" });
		/**
		 * @TTMeterPlugin 断开蓝牙电表连接(1.0.0)
		 * @description 若调用时设备已断开连接，该接口将跳过操作直接返回错误码
		 */
        plugin.handleFinishOperations().then(res => {
            wx.hideLoading({});
            console.log("断开蓝牙电表连接完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `断开蓝牙电表连接结束：${res?.errMsg}` });
        })
    },
	/** 蓝牙电表抄表(1.0.0) */
    syncElecMeterState() {
		wx.showLoading({ title: "" });
		this.setData({ errMsg: "正在同步蓝牙电表数据" });
		/**
		 * @TTMeterPlugin 蓝牙电表抄表，与服务器同步蓝牙电表数据(1.0.0)
		 * @description 调用成功后，请通过服务器接口重新获取蓝牙电表数据
		 */
        plugin.syncElecMeterState({}).then(res => {
			wx.hideLoading({});
			console.log("同步蓝牙电表数据完成", res);
            this.setData({ errCode: res?.errCode, errMsg: `同步蓝牙电表数据结束：${res?.errMsg}` });
        })
    },
	/** 蓝牙电表充值(1.0.0) */
    chargeElecMeter() {
		/**
		 * TODO 请先完成支付相关对接并获取充值token后操作
		 */
		wx.showLoading({ title: "" });
		this.setData({ errMsg: "正在充值" });
		/**
		 * @TTMeterPlugin 蓝牙电表充值(1.0.0)
		 * @description 调用成功后，请【额外】调用【蓝牙抄表接口】更新电表数据
		 */
        plugin.chargeElecMeter({
            executeToken: "00000c0f" // TODO 充值token(必填)
        }).then(res => {
			wx.hideLoading({});
			console.log("蓝牙电表充值完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `蓝牙电表充值结束：${res?.errMsg}` });
			if (res?.errCode == 0) {
				wx.showToast({ title: "充值成功，请点击抄表同步电表数据" })
			}
        })
    },
	/** 蓝牙电表设置电量(1.0.0) */
    setElecMeter() {
        wx.showLoading({ title: "" });
        this.setData({ errMsg: "正在设置电表电量" });
		/**
		 * @TTMeterPlugin 设置蓝牙电表电量(1.0.0)
		 * @description 调用成功后，请【额外】调用【蓝牙抄表接口】更新电表数据
		 */
        plugin.setElecMeter({
            remainderKwh: 46.23 // 剩余电量(必填)
        }).then(res => {
			wx.hideLoading({});
			console.log("电量设置完成", res);
			this.setData({ errCode: res?.errCode, errMsg: `电量设置结束：${res?.errMsg}` });
            if (res?.errCode == 0) {
            	wx.showToast({ title: "电量设置成功，请点击抄表同步电表数据" })
            }
        })
    },
	/** 修改日志输出开关(1.0.0) */
	handleChangeLog() {
		let flag = !this.data.log;
		this.setData({ log: flag })
		plugin.setShowLog(flag, this._showLog);
		this.setData({ errMsg: `当前日志开关：${flag}` });
	},
	/** 完整的设置电量流程(1.0.0) */
	async setElecMeterEg() {
		try {
			wx.showLoading({ title: "" });
			this.setData({ errMsg: "正在连接智能电表" });
			let connRes = await plugin.connectBLEElecMeter(MAC);
			console.log("连接蓝牙电表完成", connRes);
			if (connRes?.errCode != 0) {
				return this.setData({ errCode: connRes?.errCode, errMsg: `连接蓝牙电表结束：${connRes?.errMsg}` });
			}
			this.setData({ errMsg: "正在设置剩余电量" });
			let setRes = await plugin.setElecMeter({ remainderKwh: 46.23 });
			console.log("电量设置完成", setRes);
			if (setRes?.errCode != 0) {
				return this.setData({ errCode: setRes?.errCode, errMsg: `电量设置结束：${setRes?.errMsg}` });
			}
			this.setData({ errMsg: "正在抄表" });
			let syncRes = await plugin.syncElecMeterState({});
			console.log("抄表完成", syncRes);
			this.setData({ errCode: syncRes?.errCode, errMsg: `电量设置结束：${syncRes?.errMsg}` });
		} catch(err) {
			console.log(err);
		} finally {
			wx.showLoading({ title: "正在断连" });
			const res = await plugin.handleFinishOperations();
			wx.hideLoading({});
			console.log("操作结束", res);
			this.setData({ errCode: res?.errCode, errMsg: `断开蓝牙电表连接结束：${res?.errMsg}` });
		}
	},
})
