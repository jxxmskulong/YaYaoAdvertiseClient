import { Component,OnInit,ViewChild} from '@angular/core';
declare let myUtils: any;
declare let $: any;
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthLoginService } from '../../../service/authlogin.service';
import {RoleService } from '../../../service/role.service';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Waterinformation } from '../../../bean/waterinformation';
import { PaginationService } from '../../../service/pagination.service';//分页服务

@Component({
  selector: 'main-rightbar-financial-detail',
  templateUrl:'detailfinancial.component.html'
})
//显示详情页面组件
export class DetailfinancialComponent {

   admin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');  
   waterinformationList:Waterinformation=new Waterinformation('','','','','','');  

totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showWaterinformationListIcon=true;//显示数据前的icon

    constructor( public router:Router,private paginationService:PaginationService,private authLoginService:AuthLoginService,private roleService:RoleService){}
//换用户
getWaterinformation(){
  this.currentPage=1;
  this.financialListInit();
}
financialListInit(){
       $.get(myUtils.getDomain()+"/waterInformation/count/"+this.admin.admin_id,(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 
        //初始化
  $.get(myUtils.getDomain()+"/waterInformation/list/admin?adminId="+this.admin.admin_id+"&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.waterinformationList=pld;
           this.showWaterinformationListIcon=false;
               });
       });
  }
  //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showWaterinformationListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.financialListInit();
  }
}
  
}



@Component({
  selector: 'main-rightbar-financial-update',
  templateUrl:'updatefinancial.component.html'
})
//更新页面组件
export class UpdatefinancialComponent {
   admin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//修改
   waterinformation:Waterinformation=new Waterinformation('','','','0','','');//默认为0
   toggleRoleName="渠道主";//修改
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//当前登录的admin;
   sessionRole:Role=new Role('','','','');//当前登录的role;
   urlName="advertise";//广告主充值
  

  updateFinancialSubmit(){
    this.waterinformation.name=this.admin.name;
    this.waterinformation.admin_id=this.admin.admin_id;//为修改的adminId
 if(this.toggleRoleName=="广告主"){
      this.urlName="advertise";//广告主充值
      this.waterinformation.type="充值";
      this.admin.recharge=String(parseFloat(this.admin.recharge)+parseFloat(this.waterinformation.money));
      this.admin.money=String(parseFloat(this.admin.money)+parseFloat(this.waterinformation.money));
    }
    if(this.toggleRoleName=="渠道主"){
      this.urlName="advertiseSpace";//渠道主提现
      this.waterinformation.type="提现";
      this.admin.withdrawals=String(parseFloat(this.admin.withdrawals)+parseFloat(this.waterinformation.money));
      this.admin.money=String(parseFloat(this.admin.money)-parseFloat(this.waterinformation.money));
    }
     $.post(myUtils.getDomain()+"/admin/money/"+this.urlName,
    {
      name:this.waterinformation.name,
      type:this.waterinformation.type,
      money:this.waterinformation.money,
      //createDate:this.waterinformation.create_date,
      adminId:this.waterinformation.admin_id//为修改的adminId
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
  selector: 'main-rightbar-financial',
  templateUrl:'financial.component.html'
})
export class FinancialComponent implements OnInit{
  financialList:Admin[]=[];//后台右侧首页财务信息
  roleList:Role[]=[];
  sessionAdmin:Admin;//当前管理员
  sessionRole:Role;
  financialrole:Role;//财务角色

  totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showFinancialListIcon=true;//显示数据前的icon

  toggleRoleName="渠道主";//切换角色名，默认渠道主
   admincan_open_accounts=['否','是'];//开户权限

@ViewChild(UpdatefinancialComponent)
private updatefinancialComponent :UpdatefinancialComponent;
@ViewChild(DetailfinancialComponent)
private detailfinancialComponent :DetailfinancialComponent;
  constructor( public router:Router,private paginationService:PaginationService,private authLoginService:AuthLoginService,private roleService:RoleService){}
  ngOnInit() {
      this.roleList=this.roleService.getRoleList();
     this.getFinancialRole();
   this.financialListInit();
 //初始化
  if( this.authLoginService.checkLogin()){
      this.sessionAdmin=this.authLoginService.getAdmin();
      this.sessionRole=this.roleService.getRole();
    }
  }
//获取financialrole
getFinancialRole(){
this.roleList.forEach(element => {
        if(element.name==this.toggleRoleName) {
        this.financialrole=element;
        } 
      });
}

financialListInit(){
       $.get(myUtils.getDomain()+"/admin/count?roleId="+this.financialrole.role_id,(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 
        //初始化
  $.get(myUtils.getDomain()+"/admin/list?roleId="+this.financialrole.role_id+"&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.financialList=pld;
           this.showFinancialListIcon=false;
               });
       });
  }
//点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showFinancialListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.financialListInit();
  }
}

admin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//添加
isDisabledFinancialInfo=false;//可以修改
isDisabledFinancialBtn=true;//按钮切换
 // 渠道财务管理
  channelFinancial(){
    this.isDisabledFinancialBtn=true;
    this.toggleRoleName="渠道主";
     this.getFinancialRole();
    this.financialListInit();
    this.currentPage=1;//返回到第一页
  }
  //广告主
  advertiseFinancial(){
    this.isDisabledFinancialBtn=false;
    this.toggleRoleName="广告主";
     this.getFinancialRole();
    this.financialListInit();
    this.currentPage=1;//返回到第一页

  }

 
  /**
   * 修改
   */
  updateFinancial(admin){
  this.updatefinancialComponent.admin=admin;
   //console.log(this.updateAdminComponent)
  this.updatefinancialComponent.sessionAdmin=this.sessionAdmin;
  this.updatefinancialComponent.sessionRole=this.sessionRole;
  //this.updateAdminComponent.roleList=this.roleList;
  this.updatefinancialComponent.toggleRoleName=this.toggleRoleName;//角色名
  
    $("#modalClick").off().click();
  }
  /**
   * 财务记录
   */
  getWaterinformation(admin){
  this.detailfinancialComponent.admin=admin;
    $("#modalClickDetail").off().click();
    this.detailfinancialComponent.getWaterinformation();
  }


 }