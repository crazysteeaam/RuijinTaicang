// 医生视角数据类型
export interface 诊室状态 {
  id: string;
  名称: string;
  位置: { x: number, y: number };
  当前患者: {
    id: string;
    姓名: string;
    开始时间: string;
    预计结束时间: string;
  } | null;
  已签到未检查人数: number;
  预约未检查总人数: number;
  等待患者数: number;
  状态: '忙碌' | '空闲' | '过渡中';
  优先级: '高' | '中' | '低';
}

// 患者视角数据类型
export interface 位置 {
  x: number;
  y: number;
}

export interface 等待时间数据 {
  id: string;
  诊室名称: string;
  当前等待时间: number;
  预计等待时间: number;
  状态: '拥挤' | '适中' | '空闲';
  位置: 位置;
  排队人数: number;
  建议顺序?: string;
}

// 管理者视角数据类型
export interface 管理者建议 {
  诊室ID: string;
  诊室名称: string;
  当前利用率: number; // 百分比
  等待患者数: number;
  推荐操作: '增加容量' | '分流患者' | '优化流程';
  待分流患者数: number;
  目标诊室: string[];
  预计影响: {
    等待时间减少: number; // 分钟
    吞吐量增加: number; // 百分比
  };
}

// 实时模式类型
export type 实时模式类型 = 'doctor' | 'patient' | 'manager'; 