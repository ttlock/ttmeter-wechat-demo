// pages/user/home/index.ts
import lodashMixin from "../../../mixins/lodash.js";
import * as Crypto from "../../../utils/crypto";
import * as HttpHandler from "../../../api/handle/httpHandler";

Page({
    data: {

    },
    onLoad() {

    },
    
    /** 执行跳转 */
    _handleLogin(event) {
        const target = event?.currentTarget?.dataset?.target as string;
        if (target == "TENANT") wx.navigateTo({ url: "../tenant/index"}); // 跳转租客身份进入
        else if (target == "ADMIN") {
            const accessToken =  Crypto.AES_Decrypt(wx.getStorageSync("access_token") || "");
            const uid = Number(Crypto.AES_Decrypt(wx.getStorageSync("uid") || "") || "0");
            if (!!accessToken && (uid > 0)) wx.redirectTo({ url: '../../electric-meter/list/index' });
            else wx.navigateTo({ url: "../admin/index" }); // 跳转管理员登录
        } else HttpHandler.showErrorMsg("无效地址");
    },
    ...lodashMixin,
    handleLogin(event) { this.debounce(this._handleLogin, 300, event) },
})