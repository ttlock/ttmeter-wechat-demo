// pages/user/admin/index.ts
import lodashMixin from "../../../mixins/lodash.js";
import * as Crypto from "../../../utils/crypto";
import * as OauthAPI from "../../../api/interfaces/oauth";
import * as HttpHandler from "../../../api/handle/httpHandler";
Page({
    data: {
        username: "", // 用户名
        password: "", // 密码
    },
    onLoad () {
        const username = Crypto.AES_Decrypt(wx.getStorageSync("user_id") || "") || "";
        const password = Crypto.AES_Decrypt(wx.getStorageSync("user_psd") || "") || "";
        const accessToken =  Crypto.AES_Decrypt(wx.getStorageSync("access_token") || "");
        const uid = Number(Crypto.AES_Decrypt(wx.getStorageSync("uid") || "") || "0");
        if (!!accessToken && (uid > 0)) {
            wx.redirectTo({ url: '../../electric-meter/list/index' });  
        } else {
            wx.removeStorageSync("uid");
            wx.removeStorageSync("access_token");
            this.setData({ username: username, password: password });
        }
    },
    handleInputEmpty() {}, // 解决绑定数据输入报错
    /** 登录验证 */
    handleCheckInput(event) {
        const value = event?.detail?.value;
        if (!value?.username) {
            HttpHandler.showErrorMsg("请输入登录账号");
            return false;
        } else if (!value?.password) {
            HttpHandler.showErrorMsg("请输入登录密码");
            return false;
        } else {
            return true;
        }
    },
    ...lodashMixin,
    handleSubmit(event) { this.debounce(this._handleSubmit, 300, event) },
    /** 管理员登录 */
    async _handleSubmit(event) {
        const value = event?.detail?.value;
        if (!this.handleCheckInput(event)) return;
        wx.showLoading({ title: "Loading..." });
        OauthAPI.token({
            "username": value?.username || "",
            "password": Crypto.MD5_Encrypt(value?.password || "")
        }).then(res => {
            wx.hideLoading();
            if (HttpHandler.isResponseTrue(res)) {
                wx.setStorageSync("user_id", Crypto.AES_Encrypt(value?.username || ""));
                wx.setStorageSync("user_psd", Crypto.AES_Encrypt(value?.password || ""));
                wx.setStorageSync("access_token", Crypto.AES_Encrypt(res?.access_token));
                wx.setStorageSync("uid", Crypto.AES_Encrypt(String(res?.uid)));
                wx.redirectTo({ url: '../../electric-meter/list/index' })
            } else {
                HttpHandler.handleResponseError(res);
            }
        }).catch(err => {
            wx.hideLoading();
            HttpHandler.handleServerError(err);
        });
    },
})