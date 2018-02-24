export class Website{
    constructor(
        public website_id:string,//网站id
        public name:string,//网站名称
        public type:string,//网站类型
        public url:string,//网站url
        public status:string,//网站状态
        public remark:string,//备注(先用作评级)
        public update_date:string,//更新时间
        public admin_id:string//管理员id
    ){}
}