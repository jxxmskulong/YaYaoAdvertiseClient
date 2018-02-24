//权限信息
  export class Jurisdiction{
    constructor(
   public jurisdiction_id:string,//id
   public name:string,//权限工作流名
   public addtion:string,//增加
   public deletion:string,//删除
   public updation:string,//修改
   public queries:string,//查询
   public update_date:string,//更新时间
   public role_id:string//角色id
    ){}
}