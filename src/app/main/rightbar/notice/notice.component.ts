import { Component,OnInit,ViewChild} from '@angular/core';
declare let myUtils: any;
declare let $: any;
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthLoginService } from '../../../service/authlogin.service';
import {RoleService } from '../../../service/role.service';
import {Notice } from '../../../bean/notice';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { PaginationService } from '../../../service/pagination.service';//分页服务

@Component({
  selector: 'main-rightbar-notice-detail',
  templateUrl:'detailnotice.component.html'
})
//显示详情页面组件
export class DetailnoticeComponent {

   notice:Notice=new Notice('','','','','');//修改    
  showNoticeDetail(){
  }
}

@Component({
  selector: 'main-rightbar-notice-update',
  templateUrl:'updatenotice.component.html'
})
//更新页面组件
export class UpdatenoticeComponent {

   notice:Notice=new Notice('','','','','');//修改
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','','','','','','','','','','','','','','');//当前登录的admin;
   sessionRole:Role=new Role('','','','');//当前登录的role;
    
  updateNoticeSubmit(){
     $.post(myUtils.getDomain()+"/notice/update",
    {
      noticeId:this.notice.notice_id,
      title:this.notice.title,
      type:this.notice.type,
      content:this.notice.content,
      updateDate:this.notice.update_date
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
  selector: 'main-rightbar-notice',
  templateUrl:'notice.component.html'
})
export class NoticeComponent implements OnInit{
  noticeList:Notice[]=[];//后台右侧首页公告信息
  roleList:Role[]=[];
  sessionAdmin:Admin;//当前管理员
  sessionRole:Role;

  totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showNoticeListIcon=true;//显示数据前的icon

@ViewChild(UpdatenoticeComponent)
private updatenoticeComponent :UpdatenoticeComponent;
@ViewChild(DetailnoticeComponent)
private detailnoticeComponent :DetailnoticeComponent;
  constructor( public router:Router,private paginationService:PaginationService,private authLoginService:AuthLoginService,private roleService:RoleService){}
  ngOnInit() {
   this.noticeListInit();
 //初始化
  if( this.authLoginService.checkLogin()){
      this.sessionAdmin=this.authLoginService.getAdmin();
      this.sessionRole=this.roleService.getRole();
    }
  }

 noticeListInit(){
       $.get(myUtils.getDomain()+"/notice/count",(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 

        //初始化
  $.get(myUtils.getDomain()+"/notice/list?pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
        // sessionStorage.setItem("noticeList",JSON.stringify(pld));
           this.noticeList=pld;
           this.showNoticeListIcon=false;
               });
       });
  }
//点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showNoticeListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.noticeListInit();
  }
}
toggleListNoticeValue="添加公告";
notice:Notice=new Notice('','','','','');//添加
 // 切换公告管理
  toggleListNotice(){
   if(this.toggleListNoticeValue=="添加公告"){
     this.toggleListNoticeValue="公告列表";
   } else{
      this.noticeListInit();
     this.toggleListNoticeValue="添加公告";
   }
  }

 //新增
  saveNotice(){
   $.post(myUtils.getDomain()+"/notice/add",
   {
      title:this.notice.title,
      type:this.notice.type,
      content:this.notice.content
     },
   (data)=>{
           if(data&&data.code==200){
             this.notice=new Notice('','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }
  /**
   * 修改
   */
  updateNotice(notice){
  this.updatenoticeComponent.notice=notice;
   console.log(this.updatenoticeComponent)
  this.updatenoticeComponent.sessionAdmin=this.sessionAdmin;
  this.updatenoticeComponent.sessionRole=this.sessionRole;
  //this.updatenoticeComponent.roleList=this.roleList;
    $("#modalClick").off().click();
  }
/**
   * 删除
   */
  delNotice(notice){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/notice/"+notice.notice_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showNoticeListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.noticeListInit();  
        }
     });
     });
  }
/**
*显示详情
 */
  showNotice(notice){
    this.detailnoticeComponent.notice=notice;
    $("#modalClickDetail").off().click();
  }
 }