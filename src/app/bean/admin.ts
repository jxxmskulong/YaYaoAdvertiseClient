//管理员信息
  export class Admin{
    constructor(
   public admin_id:string,//id
   public name:string,//姓名
   public cell_phone:string,//手机号
   public email:string,//邮箱
   public password:string,//密码
   public money:string,//金钱
   public withdrawals:string,//提现金钱
   public recharge:string,//recharge
   public identity_cards:string,//身份证
   public qq:string,//QQ
   public wechat:string,//微信号
   public bank_user_name:string,//开户人
   public bank_name:string,//开户银行
   public bank_account:string,//银行账号
   public bank_address:string,//开户银行地址
   public status:string,//账号状态
   public can_open_account:string,//能否开户
   public create_date:string,//创建时间
   public last_login_date:string,//最后登录时间
   public role_id:string,//角色id
   public parent_id:string//上级id
    ){}
}