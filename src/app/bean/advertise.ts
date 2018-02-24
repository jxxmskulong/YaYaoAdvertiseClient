//广告
export class Advertise{
    constructor(
        public advertise_id:string,//广告id
        public name:string,//广告名称
        public type:string,//类型
        public subtype:string,//子类型
        public billing_mode:string,//计费方式
        public region:string,//地域
        public title:string,//标题
        public img:string,//广告图片
        public link:string,//链接地址
        public unit_price:string,//单价
        public unit_delivery_number:string,//投放次数
        public now_unit_delivery_number:string,//消耗的投放次数
        public unit_money:string,//广告金额
        public now_unit_money:string,//消耗的广告金额
        public status:string,//广告状态
        public start_delivery_date:string,//投放开始时间
        public end_delivery_date:string,//投放结束时间
        public update_date:string,//更新时间
        public admin_id:string//管理员id外键
    ){}
}