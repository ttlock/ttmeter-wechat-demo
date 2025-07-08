import Config from "../tools/config";
import { $post } from "../tools/httpRequest";

/** 租客获得电表详情 */
export const detail = (params?: IElectricMeterUser.Params.Detail) => {
    return $post<IElectricMeterUser.Result.Detail>("/v3/electricMeterUser/detail", {
        ...(params || {}),
        "clientId": Config?.CLIENT_ID,
        "date": Date.now()
    })
}