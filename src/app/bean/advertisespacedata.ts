//广告位数据
export class Advertisespacedata{
    constructor(
        public advertise_space_data_id:string,//广告位数据id
        public pvs:string,//浏览次数，即页面浏览量或点击量，用户每次刷新即被计算一次。
        public uvs:string,//独立访客访问您网站的一台电脑客户端为一个访客。00:00-24:00内相同的客户端只被计算一次。
        public ips:string,//独立IP数，00:00-24:00内相同IP地址之被计算一次
        public forward:string,//转发数
        public daily_day:string,//每日日期
        public advertise_space_id:string,//广告位id
    ){}
}