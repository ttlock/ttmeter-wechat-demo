/// <reference path="./oauth.d.ts" />

declare interface HttpResponseResult {
    errcode?: number; // 服务器错误码
    errmsg?: string; // 服务器错误信息
    description?: string; // 服务器错误描述
}