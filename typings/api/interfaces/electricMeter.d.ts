declare module IElectricMeter {
    namespace Params {
        interface List {
            groupId?: number; // 分组ID
            searchStr?: string; // 搜索条件，支持搜索表名称以及表号电表ID列表
        }

        interface Detail {
            electricMeterId: number; // 电表ID
        }
    }

    namespace List {
        interface ElemeterMeterInfo {
            electricMeterId?: number; // 电表ID
            online?: number; // 0 -不在线, 1 -在线
            rssi?: number; // 信号强度
            onOff?: number; // 通电状态 0-断电, 1-通电, 2-未知
            name?: string; // 电表名称
            number?: string; // 智能电表表号
            payMode?: number; // 工作模式： 0-计能模式，1-预付费模式
            totalKwh?: string; // 总用电量
            remainderKwh?: string; // 剩余电量
            price?: string; // 单价
        }
    }

    namespace Result {
        interface List extends HttpResponseResult {
            list?: Array<List.ElemeterMeterInfo>;
        }

        interface Detail extends HttpResponseResult {
            electricMeterId?: number; // 电表ID
            mac?: string; // 电表MAC
            featureValue?: string; // 特征值
            modelNum?: string; // 产品型号
            hardwareRevision?: string; // 硬件版本号
            firmwareRevision?: string; // 固件版本号
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
            maxPower?: string; // 最大功率
            groupName?: string; // 分组名称
            groupId?: number; // 分组ID
        }
    }
}