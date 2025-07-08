declare module IWaterMeter {
    namespace Params {
        interface List {
            groupId?: number; // 分组ID
            searchStr?: string; // 搜索条件，支持搜索表名称以及表号水表ID列表
        }

        interface Detail {
            waterMeterId: number; // 水表ID
        }
    }

    namespace List {
        interface WaterMeterInfo {
            waterMeterId?: number; // 水表ID
            online?: number; // 0 -不在线, 1 -在线
            rssi?: number; // 信号强度
            onOff?: number; // 通水状态 0-断水, 1-通水, 2-未知
            name?: string; // 水表名称
            number?: string; // 智能水表表号
            payMode?: number; // 工作模式： 0-计能模式，1-预付费模式
            totalM3?: string; // 总用水量
            remainderM3?: string; // 剩余水量
            price?: string; // 单价
            electricQuantity?: number; // 电量
        }
    }

    namespace Result {
        interface List extends HttpResponseResult {
            list?: Array<List.WaterMeterInfo>;
        }

        interface Detail extends HttpResponseResult {
            waterMeterId?: number; // 水表ID
            mac?: string; // 水表MAC
            featureValue?: string; // 特征值
            modelNum?: string; // 产品型号
            hardwareRevision?: string; // 硬件版本号
            firmwareRevision?: string; // 固件版本号
            online?: number; // 0 -不在线, 1 -在线
            rssi?: number; // 信号强度
            onOff?: number; // 通电状态 0-断电, 1-通水, 2-未知
            name?: string; // 水表名称
            number?: string; // 智能水表表号
            payMode?: number; // 工作模式： 0-计能模式，1-预付费模式
            totalM3?: string; // 总用水量
            remainderM3?: string; // 剩余水量
            price?: string; // 单价
            syncM3Date?: number; // 最后一次抄表时间
            maxPower?: string; // 最大功率
            groupName?: string; // 分组名称
            groupId?: number; // 分组ID
            electricQuantity?: number; // 电量
        }
    }
}