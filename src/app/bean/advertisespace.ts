//广告位
export class Advertisespace{
    constructor(
        public advertise_space_id:string,//广告位id
        public name:string,//广告位名称
        public platform:string,//投放平台
        public type:string,//展示类型
        public business_type:string,//业务类型
        public billing_mode:string,//计费方式
        public region:string,//地域
        public location:string,//广告位置
        public unit_price:string,//单价
        public now_unit_delivery_number:string,//获取的点击次数
        public now_unit_money:string,//获取的广告位金额
        public status:string,//状态
        public update_date:string,//更新时间
        public admin_id:string//管理员id外键
    ){}
}