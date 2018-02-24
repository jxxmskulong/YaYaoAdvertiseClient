import { Component,OnInit,ViewChild} from '@angular/core';
declare let myUtils: any;
declare let $: any;
declare let echarts: any;
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthLoginService } from '../../../service/authlogin.service';
import {RoleService } from '../../../service/role.service';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Advertise } from '../../../bean/advertise';
import { Advertisedata } from '../../../bean/advertisedata';
import { PaginationService } from '../../../service/pagination.service';//分页服务

@Component({
  selector: 'main-rightbar-advertise-data',
  templateUrl:'dataadvertise.component.html'
})
//数据页面组件
export class DataadvertiseComponent implements OnInit {
   advertise:Advertise=new Advertise('','','','','','','','','','','','','','','','','','','');//修改
   roleList:Role[]=[];
  advertisedataList:Advertisedata[]=[];//每日数据
  advertisedataListInit:Advertisedata[]=[];//初始化每日数据
  
   sessionAdmin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//当前登录的admin;
   sessionRole:Role=new Role('','','','');//当前登录的role;

   todayDataBtn=true;//默认今日数据按钮点击
   sevendayDataBtn=false;//默认今日数据按钮点击
   thirtydayDataBtn=false;//默认今日数据按钮点击
    ngOnInit(){
  
//this.todayData();
    }

    //echartsInit
    echartsInit(daily_dayData ,pvData,uvData,ipData,forwardData){
         // 指定图表的配置项和数据
    let myChart = echarts.init($('#main')[0]);
        let option = {
    // title: {
    //     text: titleText
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['浏览次数(PV)','独立访客(UV)','IP','转发']
    },
    // grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    // },
    toolbox: {
        feature: {
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap:  false,
       data: daily_dayData    
      // data: ["ss",'saa','sdf',23]   
    },
     yAxis: [
        {
            type: 'value',
            // scale: true,
            name: '数量'
            ,min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name:'浏览次数(PV)',
            type:'line',
            data: pvData
        },
        {
            name:'独立访客(UV)',
            type:'line',
            data:uvData
        },
        {
            name:'IP',
            type:'line',
            data:ipData
        },
        {
            name:'转发',
            type:'line',
            data:forwardData
        }
    ]
};

    myChart.setOption(option);
    }
    
    daily_dayData=[];
    pvData=[];
    uvData=[];
    ipData=[];
    forwardData=[];

    //今日数据
    todayData(){
    this.advertisedataListInit=[];
   this.advertisedataListInit=[
    new Advertisedata('0','0','0','0','0',myUtils.timeStampToDayDate(myUtils.beforeDayToTodayTime(0)),'0')
    ];
    this.todayDataBtn=true;
   this.sevendayDataBtn=false;
   this.thirtydayDataBtn=false;
   $.ajax({
     url:myUtils.getDomain()+"/advertiseData/list/advertise?advertiseId="+
    // this.advertise.advertise_id+"&startDailyDay="+myUtils.timeStampToDate(myUtils.todayStartTime())+"&endDailyDay="+myUtils.timeStampToDate(myUtils.todayEndTime())+
     this.advertise.advertise_id+"&startDailyDay="+myUtils.timeStampToDate(myUtils.todayStartTime())+"&endDailyDay="+myUtils.timeStampToDate(myUtils.todayEndTime())+
     "&pageSize=1",
     async:false
  }).success((data)=>{
         this.advertisedataList=data;
       this.getAdvertiseDataList();
    });

    }
    //七日数据
    sevendayData(){
         this.advertisedataListInit=[];
     for(let i=6;i>=0;i--){
this.advertisedataListInit.push(new Advertisedata('0','0','0','0','0',myUtils.timeStampToDayDate(myUtils.beforeDayToTodayTime(i)),'0'));
      }
 this.todayDataBtn=false;
   this.sevendayDataBtn=true;
   this.thirtydayDataBtn=false;
   $.ajax({
     url:myUtils.getDomain()+"/advertiseData/list/advertise?advertiseId="+
     this.advertise.advertise_id+"&startDailyDay="+myUtils.timeStampToDate(myUtils.beforeDayToTodayTime(6))+"&endDailyDay="+myUtils.timeStampToDate(myUtils.todayToNDayEndTime(0))+
     "&pageSize=7",
     async:false
  }).success((data)=>{
         this.advertisedataList=data;
        this.getAdvertiseDataList();
    });

    }
    //30日数据
    thirtydayData(){
           this.advertisedataListInit=[];
     for(let i=29;i>=0;i--){
this.advertisedataListInit.push(new Advertisedata('0','0','0','0','0',myUtils.timeStampToDayDate(myUtils.beforeDayToTodayTime(i)),'0'));
      }
 this.todayDataBtn=false;
   this.sevendayDataBtn=false;
   this.thirtydayDataBtn=true;
     $.ajax({
     url:myUtils.getDomain()+"/advertiseData/list/advertise?advertiseId="+
     this.advertise.advertise_id+"&startDailyDay="+myUtils.timeStampToDate(myUtils.beforeDayToTodayTime(29))+"&endDailyDay="+myUtils.timeStampToDate(myUtils.todayToNDayEndTime(0))+
     "&pageSize=30",
     async:false
  }).success((data)=>{
         this.advertisedataList=data;
        this.getAdvertiseDataList();
    });

    }
    //获取AdvertiseDataList数据
    getAdvertiseDataList(){
        this.daily_dayData=[];
   this.pvData=[];
   this.uvData=[];
   this.ipData=[];
   this.forwardData=[];
// if(this.advertisedataList.length<=0){
//     this.echartsInit(this.daily_dayData ,this.pvData,this.uvData,this.ipData,this.forwardData);
//     return;
// }
  this.advertisedataListInit.forEach(init => {//先循环所有天数
  if(this.advertisedataList.length>0){
this.advertisedataList.forEach((element)=>{//循环已有的天数
  if(myUtils.timeStampToDayDate(element.daily_day)==init.daily_day){
   init.daily_day=myUtils.timeStampToDayDate(element.daily_day);
   init.pvs=element.pvs;
   init.uvs=element.uvs;
   init.ips=element.ips;
   init.forward=element.forward;
  }
   });
  }  
   this.daily_dayData.push(init.daily_day);
   this.pvData.push(init.pvs);
   this.uvData.push(init.uvs);
   this.ipData.push(init.ips);
   this.forwardData.push(init.forward);
  });
   this.echartsInit(this.daily_dayData ,this.pvData,this.uvData,this.ipData,this.forwardData);
    }
  
}


@Component({
  selector: 'main-rightbar-advertise-update',
  templateUrl:'updateadvertise.component.html'
})
//更新页面组件
export class UpdateadvertiseComponent implements OnInit {
   advertise:Advertise=new Advertise('','','','','','','','','','','','','','','','','','','');//修改
   roleList:Role[]=[];
   advertisesubtypes=[];
   advertisebilling_modes=[];
   advertiseregions=[];
   sessionAdmin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//当前登录的admin;
   sessionRole:Role=new Role('','','','');//当前登录的role;
    ngOnInit(){
          $(".form_datetime").datetimepicker({
              language: 'zh-CN',
              format: 'yyyy-mm-dd hh:ii:ss',
   	          autoclose: true
            });
this.getDateTime("input[name='start_delivery_date']","advertise","start_delivery_date");
this.getDateTime("input[name='end_delivery_date']","advertise","end_delivery_date");
    }

//动态获取datetimepicker,注入model
getDateTime(element,clazz,name){
  var _this=this;
  $(element).on("change",function(){
   _this[clazz][name]=$(this).val();
   });
}
//动态金钱
//获取每日广告金额
getUnitMoney(){
   if(this.advertise.billing_mode=='CPM'){
    this.advertise.unit_money=String((parseFloat(this.advertise.unit_price)*parseFloat(this.advertise.unit_delivery_number)/1000).toFixed(2));
    }else if(this.advertise.billing_mode=='CPC'){
    this.advertise.unit_money=String((parseFloat(this.advertise.unit_price)*parseFloat(this.advertise.unit_delivery_number)).toFixed(2));
    }
}
//修改图片
updateAdvertiseImg(){
myUtils.fileUpload(
    {inputfile:$("#updateAdvertiseImg"),
     proportion:16/5,
    ajaxObj:{
        formData:[
            {key:"img",value:$("#updateAdvertiseImg").get(0).files[0]}
            ],
        url:myUtils.getDomain()+"/advertise/img/add",
        success:(data)=>{
            if(data){
            myUtils.myLoadingToast("上传成功",null);
            this.advertise.img=myUtils.getDomain()+data;
            }
        }
    
    }
}
);
}
//提交
  updateAdvertiseSubmit(){
         if(new Date(this.advertise.start_delivery_date).getTime()<=new Date().getTime()+1000*60*20){
          return myUtils.myLoadingToast("开始时间需比当前时间迟20分钟");
      }
      if(new Date(this.advertise.end_delivery_date).getTime()<=new Date(this.advertise.start_delivery_date).getTime()+1000*60*60){
          return myUtils.myLoadingToast("结束时间必须大开始时间一小时");
      }
      if(this.sessionRole.name!="超级管理员" && this.sessionRole.name!="广告管理员"){
      if(parseFloat(this.advertise.unit_price)<0.3){
        return myUtils.myLoadingToast("单价最低为0.3元");
      }}
     $.post(myUtils.getDomain()+"/advertise/update",
    {
      advertiseId:this.advertise.advertise_id,
      name:this.advertise.name,
      type:this.advertise.type,
      subtype:this.advertise.subtype,
      billingMode:this.advertise.billing_mode,
      region:this.advertise.region,
      title:this.advertise.title,
      img:this.advertise.img,
      link:this.advertise.link,
      unitPrice:this.advertise.unit_price,
      unitDeliveryNumber:this.advertise.unit_delivery_number,
      nowUnitDeliveryNumber:this.advertise.now_unit_delivery_number,
      unitMoney:this.advertise.unit_money,
      nowUnitMoney:this.advertise.now_unit_money,
      status:this.advertise.status,
      startDeliveryDate:this.advertise.start_delivery_date,
      endDeliveryDate:this.advertise.end_delivery_date,
      updateDate:this.advertise.update_date,
      adminId:this.advertise.admin_id
    },
    (data)=>{
      if(data&&data.code==200){
        myUtils.myLoadingToast("更新成功");
        $("#myModalClose").click();
      return;
      }
    });
  }
  
}

@Component({
  selector: 'main-rightbar-advertise',
  templateUrl:'advertise.component.html'
})
export class AdvertiseComponent implements OnInit{
  advertiseList:Advertise[]=[];//后台右侧首页广告信息
  advertisesubtypes=['文学资讯','影视音乐','娱乐图片','网络游戏','动漫在线','软件下载','交友婚介','聊天论坛','运动体育','男性网站','女性网站','地域门户','网站导航','电子商务','电脑网络','教育培训','休闲旅游','综合站点','游戏外挂','军事站点','其他'];
 advertisebilling_modes=['CPM','CPC'];
 advertiseregions=['全国','北京市','天津市','上海市','重庆市','河北省','河南省','云南省','辽宁省','黑龙江省',
 '湖南省','安徽省','山东省','新疆维吾尔','江苏省','浙江省','江西省','湖北省','广西壮族','甘肃省',
 '山西省','内蒙古','陕西省','吉林省','福建省','贵州省','广东省','青海省','西藏','四川省',
 '宁夏回族','海南省','台湾省','香港特别行政区','澳门特别行政区'];
  roleList:Role[]=[];
  sessionAdmin:Admin;//当前管理员
  sessionRole:Role;

  totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showAdvertiseListIcon=true;//显示数据前的icon

  advertiseAdminId;//展示广告数据广告主id

@ViewChild(UpdateadvertiseComponent)
private updateadvertiseComponent :UpdateadvertiseComponent;
@ViewChild(DataadvertiseComponent)
private dataadvertiseComponent :DataadvertiseComponent;
  constructor(public activatedRoute :ActivatedRoute, public router:Router,private paginationService:PaginationService,private authLoginService:AuthLoginService,private roleService:RoleService){}
  ngOnInit() {

      //初始化advertiseAdminId
  this.activatedRoute.params.subscribe((params: Params) => {
       this.advertiseAdminId=params['advertiseAdminId'];
         });
        console.log( this.advertiseAdminId) 

       $(".form_datetime").datetimepicker({
           language: 'zh-CN',
           format: 'yyyy-mm-dd hh:ii:ss',
   	       autoclose: true
});
this.getDateTime("input[name='start_delivery_date']","advertise","start_delivery_date");
this.getDateTime("input[name='end_delivery_date']","advertise","end_delivery_date");
 //初始化
  if( this.authLoginService.checkLogin()){
      this.sessionAdmin=this.authLoginService.getAdmin();
      this.sessionRole=this.roleService.getRole();
    }
this.advertiseListInit();
  }
  //动态获取datetimepicker,注入model
getDateTime(element,clazz,name){
  var _this=this;
  $(element).on("change",function(){
   _this[clazz][name]=$(this).val();
   });
}
//获取每日广告金额
getUnitMoney(){
    if(this.advertise.billing_mode=='CPM'){
    this.advertise.unit_money=String((parseFloat(this.advertise.unit_price)*parseFloat(this.advertise.unit_delivery_number)/1000).toFixed(2));
    }else if(this.advertise.billing_mode=='CPC'){
    this.advertise.unit_money=String((parseFloat(this.advertise.unit_price)*parseFloat(this.advertise.unit_delivery_number)).toFixed(2));
    }
}

advertiseListInit(){
      $.get(myUtils.getDomain()+"/advertise/count?adminId="+ this.advertiseAdminId,(cd)=>{
      // $.get(myUtils.getDomain()+"/advertise/count/"+this.sessionAdmin.admin_id,(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 
        //初始化
  $.get(myUtils.getDomain()+"/advertise/list/admin?adminId="+ this.advertiseAdminId+"&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
  //$.get(myUtils.getDomain()+"/advertise/list/admin?adminId="+this.sessionAdmin.admin_id+"&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.advertiseList=pld;
           this.showAdvertiseListIcon=false;
               });
       });
  }
//点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showAdvertiseListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.advertiseListInit();
  }
}
toggleListAdvertiseValue="添加广告";
advertise:Advertise=new Advertise('','','','','','','','','','','','','','','','','','','');//添加

isDisabledAdvertiseInfo=false;//可以修改
 // 切换广告管理
  toggleListAdvertise(){
   if(this.toggleListAdvertiseValue=="添加广告"){
     this.toggleListAdvertiseValue="广告列表";
   } else{
      this.advertiseListInit();
     this.toggleListAdvertiseValue="添加广告";
   }
  }
  //增加图片
  addAdvertiseImg(){
    //    var fr = new FileReader;
    //     fr.readAsDataURL($("#advertiseImg").get(0).files[0]);
    //     fr.onload = function () {//onload文件读取完成事件
    //         var img = new Image;
    //         img.src = fr.result;
    //         img.onload = function () {
    //             var width = img.width;
    //             var height = img.height;
    //             console.log(width)
    //             console.log(height)
    //         };
    //     }
myUtils.fileUpload(
    {
        inputfile:$("#advertiseImg"),
        proportion:16/5,
    ajaxObj:{
        formData:[
            {key:"img",value:$("#advertiseImg").get(0).files[0]}
            ],
        url:myUtils.getDomain()+"/advertise/img/add",
        success:(data)=>{
            if(data){
            myUtils.myLoadingToast("上传成功",null);
            this.advertise.img=myUtils.getDomain()+data;
            }
        }
    
    }
}
);
  }

 //新增
  saveAdvertise(){
      if(new Date(this.advertise.start_delivery_date).getTime()<=new Date().getTime()+1000*60*20){
          return myUtils.myLoadingToast("开始时间需比当前时间迟20分钟");
      }
      if(new Date(this.advertise.end_delivery_date).getTime()<=new Date(this.advertise.start_delivery_date).getTime()+1000*60*60){
          return myUtils.myLoadingToast("结束时间必须大开始时间一小时");
      }
      if(this.sessionRole.name!="超级管理员" && this.sessionRole.name!="广告管理员"){
      if(this.advertise.billing_mode=='CPC'){
      if(parseFloat(this.advertise.unit_price)<0.3){
        return myUtils.myLoadingToast("CPC单价最低为0.3元");
      }
      if(parseFloat(this.advertise.unit_delivery_number)<200){
        return myUtils.myLoadingToast("CPC次数最低为200");
      }
    }
      if(this.advertise.billing_mode=='CPM'){
      if(parseFloat(this.advertise.unit_price)<3){
        return myUtils.myLoadingToast("CPM单价最低为3元");
      }
      if(parseFloat(this.advertise.unit_delivery_number)<20000){
        return myUtils.myLoadingToast("CPM次数最低为20000");
      }
    }
      }
   $.post(myUtils.getDomain()+"/advertise/add",
   {
      name:this.advertise.name,
      type:this.advertise.type,
      subtype:this.advertise.subtype,
      billingMode:this.advertise.billing_mode,
      region:this.advertise.region,
      title:this.advertise.title,
      img:this.advertise.img,
      link:this.advertise.link,
      unitPrice:this.advertise.unit_price,
      unitDeliveryNumber:this.advertise.unit_delivery_number,
      nowUnitDeliveryNumber:'0',
      unitMoney:this.advertise.unit_money,
      nowUnitMoney:'0',
      status:"草稿",
      startDeliveryDate:this.advertise.start_delivery_date,
      endDeliveryDate:this.advertise.end_delivery_date,
      //updateDate:this.advertise.update_date,
      adminId:this.advertiseAdminId
     },
   (data)=>{
           if(data&&data.code==200){
             this.advertise=new Advertise('','','','','','','','','','','','','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }
 //投放
  addAdvertiseDelivery(advertise){
      if(new Date(advertise.start_delivery_date).getTime()<=new Date().getTime()+1000*60*20){
          return myUtils.myLoadingToast("开始时间需比当前时间迟20分钟");
      }
      if(new Date(advertise.end_delivery_date).getTime()<=new Date(advertise.start_delivery_date).getTime()+1000*60*60){
          return myUtils.myLoadingToast("结束时间必须大开始时间一小时");
      }
      
       myUtils.myConfirm("确认投放吗?",()=>{
    $.post(myUtils.getDomain()+"/advertise/update",
    {
      advertiseId:advertise.advertise_id,
      name:advertise.name,
      type:advertise.type,
      subtype:advertise.subtype,
      billingMode:advertise.billing_mode,
      region:advertise.region,
      title:advertise.title,
      img:advertise.img,
      link:advertise.link,
      unitPrice:advertise.unit_price,
      unitDeliveryNumber:advertise.unit_delivery_number,
      nowUnitDeliveryNumber:'0',
      unitMoney:advertise.unit_money,
      nowUnitMoney:'0',
      status:"投放中",
      startDeliveryDate:advertise.start_delivery_date,
      endDeliveryDate:advertise.end_delivery_date,
      updateDate:advertise.update_date,
      adminId:advertise.admin_id
    },
    (data)=>{
      if(data&&data.code==200){
        myUtils.myLoadingToast("更新成功");
        $("#myModalClose").click();
      }
        this.advertiseListInit(); 
    });
    });
  }
  /**
   * 修改
   */
  updateAdvertise(advertise){
  this.updateadvertiseComponent.advertise=advertise;
  this.updateadvertiseComponent.sessionAdmin=this.sessionAdmin;
  this.updateadvertiseComponent.sessionRole=this.sessionRole;
  this.updateadvertiseComponent.advertisesubtypes=this.advertisesubtypes;
  this.updateadvertiseComponent.advertisebilling_modes=this.advertisebilling_modes;
  this.updateadvertiseComponent.advertiseregions=this.advertiseregions;
    $("#modalClick").off().click();
  }
  /**
   * 获取数据
   */
  getAdvertiseData(advertise){
  this.dataadvertiseComponent.advertise=advertise;
  this.dataadvertiseComponent.sessionAdmin=this.sessionAdmin;
  this.dataadvertiseComponent.sessionRole=this.sessionRole;
    $("#modalClickData").off().click();
      $("#myModalData").css("zoom",10/(parseFloat($("#myZoom").val())*10));
    this.dataadvertiseComponent.todayData();
  }
/**
   * 删除
   */
  delAdvertise(advertise){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/advertise/"+advertise.advertise_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showAdvertiseListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.advertiseListInit();  
        }
     });
     });
  }
/**
   * 切换状态 （投放中 、暂停）
   */
  changeAdvertiseStatus(advertise){
      let myConfirmValue="暂停";
      if(advertise.status=="投放中"){
          myConfirmValue="暂停";
      }else if(advertise.status=="暂停"){
            myConfirmValue="启动";
      }
     myUtils.myConfirm("确认"+myConfirmValue+"吗?",()=>{
     if(advertise.status=="投放中"){
         advertise.status="暂停";
    }else if(advertise.status=="暂停"){
     advertise.status="投放中";
    }
    $.post(myUtils.getDomain()+"/advertise/update",
    {
      advertiseId:advertise.advertise_id,
      name:advertise.name,
      type:advertise.type,
      subtype:advertise.subtype,
      billingMode:advertise.billing_mode,
      region:advertise.region,
      title:advertise.title,
      img:advertise.img,
      link:advertise.link,
      unitPrice:advertise.unit_price,
      unitDeliveryNumber:advertise.unit_delivery_number,
      nowUnitDeliveryNumber:advertise.now_unit_delivery_number,
      unitMoney:advertise.unit_money,
      nowUnitMoney:advertise.now_unit_money,
      status:advertise.status,
      startDeliveryDate:advertise.start_delivery_date,
      endDeliveryDate:advertise.end_delivery_date,
      updateDate:advertise.update_date,
      adminId:advertise.admin_id
    },
    (data)=>{
      if(data&&data.code==200){
        myUtils.myLoadingToast(myConfirmValue+"成功");
        $("#myModalClose").click();
      }
        this.advertiseListInit(); 
    });
     });
  }


 }