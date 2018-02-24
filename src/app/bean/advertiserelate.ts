//广告位广告关系
export class Advertiserelate{
    constructor(
        public advertise_relate_id:string,//广告位广告关系id
        public update_date:string,//更新时间
        public advertise_space_id:string,//广告位id外键
        public advertise_id:string//广告id外键
    ){}
}