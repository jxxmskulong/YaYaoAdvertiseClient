import { Component,OnInit,ViewChild} from '@angular/core';
declare let myUtils: any;
declare let $: any;
declare let echarts: any;
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthLoginService } from '../../../service/authlogin.service';
import {RoleService } from '../../../service/role.service';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Advertisespace } from '../../../bean/advertisespace';
import { Advertisespacedata } from '../../../bean/advertisespacedata';
import { PaginationService } from '../../../service/pagination.service';//分页服务

@Component({
  selector: 'main-rightbar-advertisespace-data',
  templateUrl:'dataadvertisespace.component.html'
})
//更新页面组件
export class DataadvertisespaceComponent implements OnInit {
   advertisespace:Advertisespace=new Advertisespace('','','','','','','','','','','','','','');//修改
   roleList:Role[]=[];
  advertisespacedataList:Advertisespacedata[]=[];//每日数据
  advertisespacedataListInit:Advertisespacedata[]=[];//初始化每日数据
  
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
      this.advertisespacedataListInit=[];
      this.advertisespacedataListInit=[
    new Advertisespacedata('0','0','0','0','0',myUtils.timeStampToDayDate(myUtils.beforeDayToTodayTime(0)),'0')
    ];

    this.todayDataBtn=true;
   this.sevendayDataBtn=false;
   this.thirtydayDataBtn=false;
   $.ajax({
     url:myUtils.getDomain()+"/advertiseSpaceData/list/advertiseSpace?advertiseSpaceId="+
     this.advertisespace.advertise_space_id+"&startDailyDay="+myUtils.timeStampToDate(myUtils.todayStartTime())+"&endDailyDay="+myUtils.timeStampToDate(myUtils.todayEndTime())+
     "&pageSize=1",
     async:true
  }).success((data)=>{
         this.advertisespacedataList=data;
       this.getAdvertisespaceDataList();
    });
    }
    //七日数据
    sevendayData(){
       this.advertisespacedataListInit=[];
     for(let i=6;i>=0;i--){
this.advertisespacedataListInit.push(new Advertisespacedata('0','0','0','0','0',myUtils.timeStampToDayDate(myUtils.beforeDayToTodayTime(i)),'0'));
      }

 this.todayDataBtn=false;
   this.sevendayDataBtn=true;
   this.thirtydayDataBtn=false;
   $.ajax({
     url:myUtils.getDomain()+"/advertiseSpaceData/list/advertiseSpace?advertiseSpaceId="+
     this.advertisespace.advertise_space_id+"&startDailyDay="+myUtils.timeStampToDate(myUtils.beforeDayToTodayTime(6))+"&endDailyDay="+myUtils.timeStampToDate(myUtils.todayEndTime(0))+
     "&pageSize=7",
     async:true
  }).success((data)=>{
         this.advertisespacedataList=data;
       this.getAdvertisespaceDataList();
    });
    }
    //30日数据
    thirtydayData(){
      this.advertisespacedataListInit=[];
     for(let i=29;i>=0;i--){
this.advertisespacedataListInit.push(new Advertisespacedata('0','0','0','0','0',myUtils.timeStampToDayDate(myUtils.beforeDayToTodayTime(i)),'0'));
      }
 this.todayDataBtn=false;
   this.sevendayDataBtn=false;
   this.thirtydayDataBtn=true;
   $.ajax({
     url:myUtils.getDomain()+"/advertiseSpaceData/list/advertiseSpace?advertiseSpaceId="+
     this.advertisespace.advertise_space_id+"&startDailyDay="+myUtils.timeStampToDate(myUtils.beforeDayToTodayTime(29))+"&endDailyDay="+myUtils.timeStampToDate(myUtils.todayEndTime(0))+
     "&pageSize=30",
     async:true
  }).success((data)=>{
         this.advertisespacedataList=data;
       this.getAdvertisespaceDataList();
    });
    }
    //获取AdvertisespaceDataList数据
    getAdvertisespaceDataList(){
      this.daily_dayData=[];
       this.pvData=[];
       this.uvData=[];
       this.ipData=[];
       this.forwardData=[];
// if(this.advertisespacedataList.length<=0){
//     this.echartsInit(this.daily_dayData ,this.pvData,this.uvData,this.ipData,this.forwardData);
//     return;
// }
  this.advertisespacedataListInit.forEach(init => {//先循环所有天数
  if(this.advertisespacedataList.length>0){
this.advertisespacedataList.forEach((element)=>{//循环已有的天数
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
  selector: 'main-rightbar-advertisespace-update',
  templateUrl:'updateadvertisespace.component.html'
})
//更新页面组件
export class UpdateadvertisespaceComponent implements OnInit {
   advertisespace:Advertisespace=new Advertisespace('','','','','','','','','','','','','','');//修改
   roleList:Role[]=[];
   advertisespacebusiness_types=[];
  advertisespacebilling_modes=[];
  advertisespaceregions=[];
   sessionAdmin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//当前登录的admin;
   sessionRole:Role=new Role('','','','');//当前登录的role;
    ngOnInit(){
    }


//动态金钱
//获取每日广告位金额
getUnitMoney(){
    this.advertisespace.now_unit_money=String((parseFloat(this.advertisespace.unit_price)*parseFloat(this.advertisespace.now_unit_delivery_number)).toFixed(2));
}

//提交
  updateAdvertisespaceSubmit(){
     $.post(myUtils.getDomain()+"/advertiseSpace/update",
    {
      advertiseSpaceId:this.advertisespace.advertise_space_id,
      name:this.advertisespace.name,
      platform:this.advertisespace.platform,
      type:this.advertisespace.type,
      businessType:this.advertisespace.business_type,
      billingMode:this.advertisespace.billing_mode,
      region:this.advertisespace.region,
      location:this.advertisespace.location,
      unitPrice:this.advertisespace.unit_price,
      nowUnitDeliveryNumber:this.advertisespace.now_unit_delivery_number,
      nowUnitMoney:this.advertisespace.now_unit_money,
      status:this.advertisespace.status,
      updateDate:this.advertisespace.update_date,
      adminId:this.advertisespace.admin_id
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
  selector: 'main-rightbar-advertisespace',
  templateUrl:'advertisespace.component.html'
})
export class AdvertisespaceComponent implements OnInit{
  advertisespaceList:Advertisespace[]=[];//后台右侧首页广告位信息
  roleList:Role[]=[];
  sessionAdmin:Admin;//当前管理员
  sessionRole:Role;

  advertisespacebusiness_types=['文学资讯','影视音乐','娱乐图片','网络游戏','动漫在线','软件下载','交友婚介','聊天论坛','运动体育','男性网站','女性网站','地域门户','网站导航','电子商务','电脑网络','教育培训','休闲旅游','综合站点','游戏外挂','军事站点','其他'];
  advertisespacebilling_modes=['CPM','CPC'];
  advertisespaceregions=['全国','北京市','天津市','上海市','重庆市','河北省','河南省','云南省','辽宁省','黑龙江省',
 '湖南省','安徽省','山东省','新疆维吾尔','江苏省','浙江省','江西省','湖北省','广西壮族','甘肃省',
 '山西省','内蒙古','陕西省','吉林省','福建省','贵州省','广东省','青海省','西藏','四川省',
 '宁夏回族','海南省','台湾省','香港特别行政区','澳门特别行政区'];
  
  totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showAdvertisespaceListIcon=true;//显示数据前的icon

  advertisespaceAdminId;//展示广告位数据渠道主id

@ViewChild(UpdateadvertisespaceComponent)
private updateadvertisespaceComponent :UpdateadvertisespaceComponent;
@ViewChild(DataadvertisespaceComponent)
private dataadvertisespaceComponent :DataadvertisespaceComponent;
  constructor( public activatedRoute:ActivatedRoute,public router:Router,private paginationService:PaginationService,private authLoginService:AuthLoginService,private roleService:RoleService){}
  ngOnInit() {
     //初始化advertiseAdminId
  this.activatedRoute.params.subscribe((params: Params) => {
       this.advertisespaceAdminId=params['advertisespaceAdminId'];
         });
 //初始化
  if( this.authLoginService.checkLogin()){
      this.sessionAdmin=this.authLoginService.getAdmin();
      this.sessionRole=this.roleService.getRole();
    }
this.advertisespaceListInit();
  }


advertisespaceListInit(){

       //$.get(myUtils.getDomain()+"/advertiseSpace/count/"+this.sessionAdmin.admin_id,(cd)=>{
       $.get(myUtils.getDomain()+"/advertiseSpace/count?adminId="+this.advertisespaceAdminId,(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 
        //初始化
  //$.get(myUtils.getDomain()+"/advertiseSpace/list/admin?adminId="+this.sessionAdmin.admin_id+"&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
  $.get(myUtils.getDomain()+"/advertiseSpace/list/admin?adminId="+this.advertisespaceAdminId+"&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.advertisespaceList=pld;
           this.showAdvertisespaceListIcon=false;
               });
       });
  }
//点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showAdvertisespaceListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.advertisespaceListInit();
  }
}
toggleListAdvertisespaceValue="添加广告位";
advertisespace:Advertisespace=new Advertisespace('','','','','','','','','','','','','','');//添加

isDisabledAdvertisespaceInfo=false;//可以修改
 // 切换广告位管理
  toggleListAdvertisespace(){
   if(this.toggleListAdvertisespaceValue=="添加广告位"){
     this.toggleListAdvertisespaceValue="广告位列表";
   } else{
      this.advertisespaceListInit();
     this.toggleListAdvertisespaceValue="添加广告位";
   }
  }
  

 //新增
  saveAdvertisespace(){
      this.advertisespace.status="正常";
      this.advertisespace.now_unit_delivery_number='0';
      this.advertisespace.now_unit_money='0';
      this.advertisespace.admin_id=this.advertisespaceAdminId;
      if(this.sessionRole.name!="超级管理员" && this.sessionRole.name!="渠道管理员"){
         if(this.advertisespace.billing_mode=='CPC'){
      if(parseFloat(this.advertisespace.unit_price)>0.2){
      myUtils.myLoadingToast("高于0.2元需审核");
        this.advertisespace.status="审核中";
      }}
      if(this.advertisespace.billing_mode=='CPM'){
      if(parseFloat(this.advertisespace.unit_price)>2){
        myUtils.myLoadingToast("高于2元需审核");
        this.advertisespace.status="审核中";
      }}
     }
   $.post(myUtils.getDomain()+"/advertiseSpace/add",
   {
      name:this.advertisespace.name,
      platform:this.advertisespace.platform,
      type:this.advertisespace.type,
      businessType:this.advertisespace.business_type,
      billingMode:this.advertisespace.billing_mode,
      region:this.advertisespace.region,
      location:this.advertisespace.location,
      unitPrice:this.advertisespace.unit_price,
      nowUnitDeliveryNumber:this.advertisespace.now_unit_delivery_number,
      nowUnitMoney:this.advertisespace.now_unit_money,
      status:this.advertisespace.status,
      //updateDate:this.advertisespace.update_date,
      adminId:this.advertisespace.admin_id
     },
   (data)=>{
           if(data&&data.code==200){
             this.advertisespace=new Advertisespace('','','','','','','','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }

  /**
   * 修改
   */
  updateAdvertisespace(advertisespace){
  this.updateadvertisespaceComponent.advertisespace=advertisespace;
  this.updateadvertisespaceComponent.sessionAdmin=this.sessionAdmin;
  this.updateadvertisespaceComponent.sessionRole=this.sessionRole;
  this.updateadvertisespaceComponent.advertisespacebusiness_types=this.advertisespacebusiness_types;
  this.updateadvertisespaceComponent.advertisespacebilling_modes=this.advertisespacebilling_modes;
  this.updateadvertisespaceComponent.advertisespaceregions=this.advertisespaceregions;
    $("#modalClick").off().click();
  }
  /**
   * 获取数据
   */
  getAdvertisespaceData(advertisespace){
  this.dataadvertisespaceComponent.advertisespace=advertisespace;
  this.dataadvertisespaceComponent.sessionAdmin=this.sessionAdmin;
  this.dataadvertisespaceComponent.sessionRole=this.sessionRole;
    $("#modalClickData").off().click();
  $("#myModalData").css("zoom",10/(parseFloat($("#myZoom").val())*10));
     this.dataadvertisespaceComponent.todayData();
  }
/**
   * 删除
   */
  delAdvertisespace(advertisespace){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/advertiseSpace/"+advertisespace.advertise_space_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showAdvertisespaceListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.advertisespaceListInit();  
        }
     });
     });
  }
/**
 * 获取代码
 */
getAdvertisespaceCode(advertisespace){
  let code="请将下面代码放在网站中！<hr/>"
  +"&lt;script&gt;var advertise_space_id="+advertisespace.advertise_space_id+"&lt;/script&gt;<br/>&lt;script src='"+myUtils.getDomain()+"/resources/js/advertisespace.js'&gt;&lt;/script&gt;";
   myUtils.myTemplate(code);
}
 }