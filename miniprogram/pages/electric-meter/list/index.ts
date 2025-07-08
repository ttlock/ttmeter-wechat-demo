// pages/electric-meter/list/index.ts
import lodashMixin from "../../../mixins/lodash.js";
import * as ElectricMeterAPI from "../../../api/interfaces/electricMeter";
import * as HttpHandler from "../../../api/handle/httpHandler";
Page({
    data: {
        deviceList: [], // 设备列表
        isEmpty: false, // 数据是否为空
        isLoading: false, // 是否正在加载中
    },
    ...lodashMixin,
    onLoad() {
        this.data.isLoading = true;
        this.handleReload();
    },
    onShow() {
        this.data.isLoading = true;
        this.handleReload();
    },
    onPullDownRefresh() {
        this.data.isLoading = true;
        this.handleReload();
    },
    handleReload() { this.debounce(this._handleReload, 300) },
    toDetail(event) { this.debounce(this._toDetail, 300, event)},
    handleToUseComponent() { this.debounce(this._handleToUseComponent, 300)},
    handleToInit() { this.debounce(this._handleToInit, 300)},
    handleLogout(callback?: WechatMiniprogram.ReLaunchCompleteCallback) { this.debounce(this._handleLogout, 300, callback) },
    /** 加载智能电表列表 */
    _handleReload() {
        wx.showLoading({ title: "Loading...", mask: true, isLoading: true });
        ElectricMeterAPI.list().then(res => {
            wx.hideLoading();
            wx.stopPullDownRefresh();
            if (HttpHandler.isResponseTrue(res)) {
                const list = this.data?.deviceList || [];
                list.splice(0, list?.length, ...(res?.list || []));
                this.setData({
                    deviceList: list,
                    isEmpty: list?.length > 0 ? false : true,
                    isLoading: false
                });
            } else {
                this.handleLogout(() => { HttpHandler.handleResponseError(res); })
            }
        }).catch(err => {
            console.log(err)
            wx.hideLoading();
            wx.stopPullDownRefresh();
            this.handleLogout(() => { HttpHandler.handleServerError(err); })
        })
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
    /** 跳转智能电表详情 */
	_toDetail (event) {
        const deviceInfo = event?.target?.dataset?.item as IElectricMeter.List.ElemeterMeterInfo;
		wx.navigateTo({ url: `../detail/index?id=${deviceInfo?.electricMeterId}` })
    },
    /** 跳转添加智能电表 */
    _handleToInit() {
        wx.navigateTo({ url: "../init/index" });
    },
	/** 跳转智能水表列表页面 */
	_handleToUseComponent() {
		wx.navigateTo({ url: "../../water-meter/list/index" });
    }
})