declare module IElectricMeterUser {
    namespace Params {
        interface Detail {
            mac: string; // 电表MAC地址
        }
    }

    namespace Result {
        interface Detail extends HttpResponseResult {
            electricMeterId?: number; // 电表ID
            mac?: string; // 电表MAC
            featureValue?: string; // 特征值
            online?: number; // 0 -不在线, 1 -在线
            rssi?: number; // 信号强度
            onOff?: number; // 通电状态 0-断电, 1-通电, 2-未知
            name?: string; // 电表名称
            number?: string; // 智能电表表号
            payMode?: number; // 工作模式： 0-计能模式，1-预付费模式
            totalKwh?: string; // 总用电量
            remainderKwh?: string; // 剩余电量
            price?: string; // 单价
            syncKwhDate?: number; // 最后一次抄表时间
            executeToken?: string; // 充值token
        }
    }
}