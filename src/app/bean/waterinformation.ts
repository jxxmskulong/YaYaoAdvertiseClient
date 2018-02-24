//流水信息
  export class Waterinformation{
    constructor(
   public water_information_id:string,//id
   public name:string,//名称
   public type:string,//类型
   public money:string,//金钱
   public create_date:string,//创建时间
   public admin_id:string//管理员id外键
    ){}
}