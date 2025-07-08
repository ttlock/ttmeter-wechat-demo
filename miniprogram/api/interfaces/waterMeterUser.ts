import Config from "../tools/config";
import { $post } from "../tools/httpRequest";

/** 租客获得水表详情 */
export const detail = (params?: IWaterMeterUser.Params.Detail) => {
    return $post<IWaterMeterUser.Result.Detail>("/v3/waterMeterUser/detail", {
        ...(params || {}),
        "clientId": Config?.CLIENT_ID,
        "date": Date.now()
    })
}