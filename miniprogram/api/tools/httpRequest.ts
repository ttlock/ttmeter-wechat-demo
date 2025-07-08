import wxp from "../../utils/promise";
import Config from "./config";
import * as Assert from "../../utils/assert";
import * as Crypto from "../../utils/crypto";
import { G as GenerateDefaultError, E as ErrCode } from "../../utils/error";

/** 获取网络请求头 */
function _generateDefaultHeader(header: Record<string, string> = {}) {
    const systemInfo = wx.getDeviceInfo(); // 获取系统信息
    const accessToken = Crypto.AES_Decrypt((wx.getStorageSync("access_token"))); // 当前用户登录状态
    const uid = Crypto.AES_Decrypt((wx.getStorageSync("user_id")));
    return JSON.parse(JSON.stringify({
        "content-type": "application/x-www-form-urlencoded",
        "appId": Config.CLIENT_ID,
        "appSecret": Config.CLIENT_SECRET,
        "language": Config.LANGUAGE,
        "platform":  systemInfo?.platform,
        "version": Config.API_VERSION,
        "accessToken": accessToken || undefined,
        "operatorUid": uid || undefined,
        "date": Date.now()
    }))
}

async function _requestAPI<T>(
    url: string,
    method: "GET" | "POST" = "GET",
    params: Record<string, any> = {},
    header: Record<string, string> = {}
): Promise<T> {
    try {
        console.log("[Request]请求参数", params);
        const result: WechatMiniprogram.RequestSuccessCallbackResult<T> = await wxp.request<T>({
			url,
			method,
			dataType: "json",
			data: params,
			header: _generateDefaultHeader(header)
        }) as any;
        console.log("[Request]网络请求结果", result?.data);
        switch(result?.statusCode) {
        case 200: return result?.data;
        default: throw(result);
        }
    } catch (err) {
        console.log("[Request]请求报错", err);
        throw(err);
    }
};

/** 远程POST请求 */
export function $post<T>(url: string, params?: Record<string, any>, header: Record<string, string> = {}) {
    return _requestAPI<T>(`${Config.BASE_DOMAIN}${url || ""}`, "POST", params || {}, header || {});
}

/** 远程GET请求 */
export function $get<T>(url: string, params?: Record<string, any>, header: Record<string, string> = {}) {
    return _requestAPI<T>(`${Config.BASE_DOMAIN}${url || ""}`, "GET", params || {}, header || {});
}