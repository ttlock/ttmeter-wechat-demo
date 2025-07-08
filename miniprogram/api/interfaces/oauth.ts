import Config from "../tools/config";
import { $post } from "../tools/httpRequest";

/** 用户登录 */
export const token = (params: IOauth.Params.GetToken) => {
    return $post<IOauth.Result.Token>("/oauth2/token", {
        "clientId": Config?.CLIENT_ID,
        "clientSecret": Config?.CLIENT_SECRET,
        "username": params?.username,
        "password": params?.password,
    })
}