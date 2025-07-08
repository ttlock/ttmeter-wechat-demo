// pages/user/tenant/index.ts
import lodashMixin from "../../../mixins/lodash.js";
import * as Crypto from "../../../utils/crypto";
import * as HttpHandler from "../../../api/handle/httpHandler";
Page({
    data: {
        MAC: "", // 智能设备MAC地址
    },
    onLoad() {
        const MAC = Crypto.AES_Decrypt(wx.getStorageSync("device_mac") || "") || "";
        wx.removeStorageSync("uid");
        wx.removeStorageSync("access_token");
        this.setData({ MAC: MAC });
    },
    handleInputEmpty() {}, // 解决绑定数据输入报错
    /** 登录验证 */
    handleCheckInput(event) {
        const target = event?.detail?.target?.dataset?.target;
        const value = event?.detail?.value;
        if (target == "ELECTRIC_METER") {
            if (!value?.MAC) {
                HttpHandler.showErrorMsg("请先填写智能电表MAC地址");
                return false;
            } else if (!/^([0-9a-fA-F]{2}.){5}([0-9a-fA-F]{2})$/.test(value?.MAC || "")) {
                HttpHandler.showErrorMsg("请填写正确的MAC地址");
                return false;
            } else {
                return true;
            }
        } else if (target == "WATER_METER") {
            if (!value?.MAC) {
                HttpHandler.showErrorMsg("请先填写智能水表MAC地址");
                return false;
            } else if (!/^([0-9a-fA-F]{2}.){5}([0-9a-fA-F]{2})$/.test(value?.MAC || "")) {
                HttpHandler.showErrorMsg("请填写正确的MAC地址");
                return false;
            } else {
                return true;
            }
        } else {
            HttpHandler.showErrorMsg("无效操作");
            return false;
        }
    },
    ...lodashMixin,
    handleSubmit(event) { this.debounce(this._handleSubmit, 300, event) },
    /** 租客登录 */
    async _handleSubmit(event) {
        if (!this.handleCheckInput(event)) return;
        const value = event?.detail?.value;
        const target = event?.detail?.target?.dataset?.target;
        wx.removeStorageSync("access_token");
        wx.removeStorageSync("uid");
        wx.setStorageSync("device_mac", Crypto.AES_Encrypt(value?.MAC || ""));
        if (target == "ELECTRIC_METER") wx.redirectTo({ url: `../../electric-meter/detail/index?mac=${value?.MAC}` });
        else wx.redirectTo({ url: `../../water-meter/detail/index?mac=${value?.MAC}` });
    },
})