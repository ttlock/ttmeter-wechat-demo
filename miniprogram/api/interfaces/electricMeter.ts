import Config from "../tools/config";
import * as Crypto from "../../utils/crypto";
import { $post } from "../tools/httpRequest";

/** 获取电表列表 */
export const list = (params?: IElectricMeter.Params.List) => {
    const accessToken = Crypto.AES_Decrypt((wx.getStorageSync("access_token"))); // 当前用户登录状态
    return $post<IElectricMeter.Result.List>("/v3/electricMeter/list", {
        ...(params || {}),
        "clientId": Config?.CLIENT_ID,
        "accessToken": accessToken,
        "date": Date.now()
    })
}

/** 管理员获得电表详情 */
export const detail = (params?: IElectricMeter.Params.Detail) => {
    const accessToken = Crypto.AES_Decrypt((wx.getStorageSync("access_token"))); // 当前用户登录状态
    return $post<IElectricMeter.Result.Detail>("/v3/electricMeter/detail", {
        ...(params || {}),
        "clientId": Config?.CLIENT_ID,
        "accessToken": accessToken,
        "date": Date.now()
    })
}