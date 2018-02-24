//公告
  export class Notice{
    constructor(
   public notice_id:string,//公告id
   public title:string,//标题
   public type:string,//标签类型
   public content:string,//内容
   public update_date:string,//更新时间
    ){}
}