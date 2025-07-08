import Config from "../tools/config";
import * as Crypto from "../../utils/crypto";
import { $post } from "../tools/httpRequest";

/** 获取水表列表 */
export const list = (params?: IWaterMeter.Params.List) => {
    const accessToken = Crypto.AES_Decrypt((wx.getStorageSync("access_token"))); // 当前用户登录状态
    return $post<IWaterMeter.Result.List>("/v3/waterMeter/list", {
        ...(params || {}),
        "clientId": Config?.CLIENT_ID,
        "accessToken": accessToken,
        "date": Date.now()
    })
}

/** 管理员获得水表详情 */
export const detail = (params?: IWaterMeter.Params.Detail) => {
    const accessToken = Crypto.AES_Decrypt((wx.getStorageSync("access_token"))); // 当前用户登录状态
    return $post<IWaterMeter.Result.Detail>("/v3/waterMeter/detail", {
        ...(params || {}),
        "clientId": Config?.CLIENT_ID,
        "accessToken": accessToken,
        "date": Date.now()
    })
}