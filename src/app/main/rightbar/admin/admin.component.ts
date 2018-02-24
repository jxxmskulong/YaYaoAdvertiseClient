import { Component,OnInit} from '@angular/core';
import { Validators,Validator,ValidatorFn} from '@angular/forms';
import {AuthLoginService } from '../../../service/authlogin.service';
import {RoleService } from '../../../service/role.service';
import { Admin} from '../../../bean/admin';
import { Role} from '../../../bean/role';
import { Waterinformation} from '../../../bean/waterinformation';
import { PaginationService } from '../../../service/pagination.service';//分页服务

declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-admin',
  templateUrl:'admin.component.html'
})
export class AdminComponent implements OnInit{
  //账户信息
 admin =new Admin('','','','','','','','','','','','','','','','','','','','','');
//修改密码
 adminPassword={
    oldPassword:'',
    newPassword:'',
    renewPassword:''
  };
 role:Role;

  waterinformationList:Waterinformation[]=[];//后台财务记录信息
  roleList:Role[]=[];
  totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showWaterinformationListIcon=true;//显示数据前的icon

  //更改个人信息显示 默认不显示
showAdminInfoWrap:boolean=false;
    //提交按钮显示
adminInfoSubmitDisabled:boolean=false;
    //提交btn内容
adminInfoSubmitValue:string='保存更改';
//是否禁用Admininfo
isDisabledAdminInfo:boolean=false;

 

  //更改密码显示 默认不显示
showPasswordWrap:boolean=false;
    //提交按钮显示
passwordSubmitDisabled:boolean=false;
    //提交btn内容
passwordSubmitValue:string='保存更改';

  //更改财务记录显示 默认不显示
showFinancialWrap:boolean=false;
    //提交按钮显示
financialSubmitDisabled:boolean=false;
    //提交btn内容
financialSubmitValue:string='保存更改';

   constructor(private paginationService:PaginationService,private authLoginService:AuthLoginService,private roleService:RoleService){}
  ngOnInit() {
   $("[data-toggle='tooltip']").tooltip();

    if( this.authLoginService.checkLogin()){
      this.admin=this.authLoginService.getAdmin();
      this.role=this.roleService.getRole();
    }
   this.waterinformationListInit();
  
if((this.role.name=="广告主" || this.role.name=="渠道主")&&this.admin.status=="正常"){
  this.isDisabledAdminInfo=true;
}
  }
  //切换
changeToggle(name){
this[name]=!this[name];
}
//初始化
waterinformationListInit(){
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
  this.waterinformationListInit();
  }
}

//修改个人信息提交
  saveAdminInfo(){
    this.adminInfoSubmitDisabled=true;
    this.adminInfoSubmitValue='保存中...';
   myUtils.myPrevToast("保存中...",()=>{
    $.post(myUtils.getDomain()+"/admin/update",
    {
      adminId:this.admin.admin_id,
      name:this.admin.name,
      cellPhone:this.admin.cell_phone,
      email:this.admin.email,
      password:this.admin.password,
      money:this.admin.money,
      withdrawals:this.admin.withdrawals,
      recharge:this.admin.recharge,
      identityCards:this.admin.identity_cards,
      qq:this.admin.qq,
      wechat:this.admin.wechat,
      bankUserName:this.admin.bank_user_name,
      bankName:this.admin.bank_name,
      bankAccount:this.admin.bank_account,
      bankAddress:this.admin.bank_address,
      status:this.admin.status,
      canOpenAccount:this.admin.can_open_account,
      createDate:this.admin.create_date,
      lastLoginDate:this.admin.last_login_date,
      roleId:this.admin.role_id,
      parentId:this.admin.parent_id
    },
    (data)=>{
      this.adminInfoSubmitDisabled=false;
       this.adminInfoSubmitValue='保存更改';
      if(data&&data.code==200){
       // sessionStorage.setItem("admin",JSON.stringify(this.admin));
      myUtils.myPrevToast("保存成功",null,"remove");
      return;
      }
       myUtils.myPrevToast("保存失败",null,"remove");
    });

   },"add");
    
  }
       //修改密码提交
    passwordSubmit(){
    this.passwordSubmitDisabled=true;
    this.passwordSubmitValue='保存中...';
   myUtils.myPrevToast("保存中...",()=>{
    $.post(myUtils.getDomain()+"/admin/update/password",
    {
      password:this.adminPassword.oldPassword,
      newpassword:this.adminPassword.newPassword
    },
    (data)=>{
       this.passwordSubmitDisabled=false;
       this.passwordSubmitValue='保存更改';
      if(data&&data.code==200){
        $.get(myUtils.getDomain()+"/admin/"+this.admin.admin_id,(d)=>{
          this.admin.password=d.password;
        //sessionStorage.setItem("admin",JSON.stringify(this.admin));
        myUtils.myPrevToast("保存成功",null,"remove");
        this.adminPassword.oldPassword="";
        this.adminPassword.newPassword="";
        this.adminPassword.renewPassword="";
        });
      return;
      }
      if(data&&data.code==40000){
        myUtils.myPrevToast("保存失败",null,"remove");
        return;
      }
    });

   },"add");
    }  

 }