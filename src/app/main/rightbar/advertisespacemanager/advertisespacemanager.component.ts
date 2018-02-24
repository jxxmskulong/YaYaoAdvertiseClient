import { Component,OnInit,ViewChild} from '@angular/core';
declare let myUtils: any;
declare let $: any;
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthLoginService } from '../../../service/authlogin.service';
import {RoleService } from '../../../service/role.service';
import {Website } from '../../../bean/website';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { PaginationService } from '../../../service/pagination.service';//分页服务

@Component({
  selector: 'main-rightbar-advertisespacemanager-update',
  templateUrl:'updateadvertisespacemanager.component.html'
})
//更新页面组件
export class UpdateadvertisespacemanagerComponent {
   admin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//修改
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//当前登录的admin;
   sessionRole:Role=new Role('','','','');//当前登录的role;
   admincan_open_accounts=[];
    
  updateAdvertisespacemanagerSubmit(){
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
      if(data&&data.code==200){
        myUtils.myLoadingToast("更新成功");
        $("#myModalClose").click();
      return;
      }
    });
  }
  
}

@Component({
  selector: 'main-rightbar-advertisespacemanager',
  templateUrl:'advertisespacemanager.component.html'
})
export class AdvertisespacemanagerComponent implements OnInit{
  advertisespacemanagerList:Admin[]=[];//后台右侧首页渠道主信息
  roleList:Role[]=[];
  sessionAdmin:Admin;//当前管理员
  sessionRole:Role;
  advertisespacerole:Role;//渠道主角色

  admincan_open_accounts=['否','是'];//开户权限

  totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showAdvertisespacemanagerListIcon=true;//显示数据前的icon

@ViewChild(UpdateadvertisespacemanagerComponent)
private updateadvertisespacemanagerComponent :UpdateadvertisespacemanagerComponent;
  constructor( public router:Router,private paginationService:PaginationService,private authLoginService:AuthLoginService,private roleService:RoleService){}
  ngOnInit() {
      this.roleList=this.roleService.getRoleList();
     this.roleList.forEach(element => {
        if(element.name=="渠道主") {
        this.advertisespacerole=element;
        } 
      });
   this.advertisespacemanagerListInit();
 //初始化
  if( this.authLoginService.checkLogin()){
      this.sessionAdmin=this.authLoginService.getAdmin();
      this.sessionRole=this.roleService.getRole();
    }
  }

advertisespacemanagerListInit(){
       $.get(myUtils.getDomain()+"/admin/count?roleId="+this.advertisespacerole.role_id+"&parentId=0",(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 
        //初始化
  $.get(myUtils.getDomain()+"/admin/list?roleId="+this.advertisespacerole.role_id+"&parentId=0&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
        // sessionStorage.setItem("AdminList",JSON.stringify(pld));
           this.advertisespacemanagerList=pld;
           this.showAdvertisespacemanagerListIcon=false;
               });
       });
  }
//点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showAdvertisespacemanagerListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.advertisespacemanagerListInit();
  }
}
toggleListAdvertisespacemanagerValue="添加渠道主";
admin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//添加
isDisabledAdvertisespacemanagerInfo=false;//可以修改
 // 切换渠道主管理
  toggleListAdvertisespacemanager(){
   if(this.toggleListAdvertisespacemanagerValue=="添加渠道主"){
     this.toggleListAdvertisespacemanagerValue="渠道主列表";
   } else{
      this.advertisespacemanagerListInit();
     this.toggleListAdvertisespacemanagerValue="添加渠道主";
   }
  }

 //新增
  saveAdvertisespacemanager(){
   $.post(myUtils.getDomain()+"/admin/add",
   {
      name:this.admin.name,
      cellPhone:this.admin.cell_phone,
      email:this.admin.email,
      password:this.admin.password,
     //money:this.admin.money,
     //withdrawals:this.admin.withdrawals,
     //recharge:this.admin.recharge,
      identityCards:this.admin.identity_cards,
      qq:this.admin.qq,
      wechat:this.admin.wechat,
      bankUserName:this.admin.bank_user_name,
      bankName:this.admin.bank_name,
      bankAccount:this.admin.bank_account,
      bankAddress:this.admin.bank_address,
      status:this.admin.status,
      canOpenAccount:this.admin.can_open_account,
      //createDate:this.admin.create_date,
     // lastLoginDate:this.admin.last_login_date,
      roleId:this.advertisespacerole.role_id,
      parentId:0
     },
   (data)=>{
           if(data&&data.code==200){
             this.admin=new Admin('','','','','','','','','','','','','','','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }
  /**
   * 修改
   */
  updateAdvertisespacemanager(admin){
  this.updateadvertisespacemanagerComponent.admin=admin;
   //console.log(this.updateAdminComponent)
  this.updateadvertisespacemanagerComponent.sessionAdmin=this.sessionAdmin;
  this.updateadvertisespacemanagerComponent.sessionRole=this.sessionRole;
  this.updateadvertisespacemanagerComponent.admincan_open_accounts=this.admincan_open_accounts;
  //this.updateAdminComponent.roleList=this.roleList;
    $("#modalClick").off().click();
  }
/**
   * 删除
   */
  delAdvertisespacemanager(admin){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/admin/"+admin.admin_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showAdvertisespacemanagerListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.advertisespacemanagerListInit();  
        }
     });
     });
  }

 }