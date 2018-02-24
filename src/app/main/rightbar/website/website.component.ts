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
  selector: 'main-rightbar-website-update',
  templateUrl:'updatewebsite.component.html'
})
//更新页面组件
export class UpdatewebsiteComponent {
   website:Website=new Website('','','','','','','','');//修改
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//当前登录的website;
   sessionRole:Role=new Role('','','','');//当前登录的role;
    
  updateWebsiteSubmit(){
     $.post(myUtils.getDomain()+"/website/update",
    {
      websiteId:this.website.website_id,
      name:this.website.name,
      type:this.website.type,
      url:this.website.url,
      status:this.website.status,
      remark:this.website.remark,
      updateDate:this.website.update_date,
      adminId:this.website.admin_id
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
  selector: 'main-rightbar-website',
  templateUrl:'website.component.html'
})
export class WebsiteComponent implements OnInit{
  websiteList:Website[]=[];//后台右侧首页网站信息
  roleList:Role[]=[];
  sessionAdmin:Admin;//当前管理员
  sessionRole:Role;

  totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showWebsiteListIcon=true;//显示数据前的icon
  websiteAdminId;//展示网站数据渠道主id


@ViewChild(UpdatewebsiteComponent)
private updatewebsiteComponent :UpdatewebsiteComponent;
  constructor(public activatedRoute:ActivatedRoute, public router:Router,private paginationService:PaginationService,private authLoginService:AuthLoginService,private roleService:RoleService){}
  ngOnInit() {
     //初始化advertiseAdminId
  this.activatedRoute.params.subscribe((params: Params) => {
       this.websiteAdminId=params['websiteAdminId'];
         });
      this.roleList=this.roleService.getRoleList();
 //初始化
  if( this.authLoginService.checkLogin()){
      this.sessionAdmin=this.authLoginService.getAdmin();
      this.sessionRole=this.roleService.getRole();
    }
   this.websiteListInit();
  }

websiteListInit(){
       $.get(myUtils.getDomain()+"/website/count/"+this.websiteAdminId,(cd)=>{
      // $.get(myUtils.getDomain()+"/website/count/"+this.sessionAdmin.admin_id,(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 
        //初始化
  $.get(myUtils.getDomain()+"/website/list/admin?adminId="+this.websiteAdminId+"&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
  //$.get(myUtils.getDomain()+"/website/list/admin?adminId="+this.sessionAdmin.admin_id+"&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
        // sessionStorage.setItem("AdminList",JSON.stringify(pld));
           this.websiteList=pld;
           this.showWebsiteListIcon=false;
               });
       });
  }
//点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showWebsiteListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.websiteListInit();
  }
}
toggleListWebsiteValue="添加网站";
website:Website=new Website('','','','','','','','');//添加
isDisabledWebsiteInfo=false;//可以修改
 // 切换网站管理
  toggleListWebsite(){
   if(this.toggleListWebsiteValue=="添加网站"){
     this.toggleListWebsiteValue="网站列表";
   } else{
      this.websiteListInit();
     this.toggleListWebsiteValue="添加网站";
   }
  }

 //新增
  saveWebsite(){
   $.post(myUtils.getDomain()+"/website/add",
   {
      websiteId:this.website.website_id,
      name:this.website.name,
      type:this.website.type,
      url:this.website.url,
      status:'正常',
      remark:'一星',
      updateDate:this.website.update_date,
      adminId:this.websiteAdminId
     },
   (data)=>{
           if(data&&data.code==200){
             this.website=new Website('','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }
  /**
   * 修改
   */
  updateWebsite(website){
  this.updatewebsiteComponent.website=website;
  this.updatewebsiteComponent.sessionAdmin=this.sessionAdmin;
  this.updatewebsiteComponent.sessionRole=this.sessionRole;
    $("#modalClick").off().click();
  }
/**
   * 删除
   */
  delWebsite(website){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/website/"+website.website_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showWebsiteListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.websiteListInit();  
        }
     });
     });
  }

 }