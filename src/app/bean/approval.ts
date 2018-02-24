//审批类
  export class Approval{
    constructor(
   public approval_id:string,//审批id
   public name:string,//审批名
   public create_time:string,//创建时间
   public details:string,//详情
   public status:string,//转态  分为 审批中、同意、驳回
   public channel_id:string,//渠道id
   public merchant_id:string//广告主id
    ){}
}