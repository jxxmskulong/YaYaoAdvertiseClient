import { Component,OnInit} from '@angular/core';
import { Router,Routes, RouterModule,PreloadAllModules } from '@angular/router';
import {AuthLoginService } from '../../service/authlogin.service';
import {RoleService } from '../../service/role.service';
import { Admin } from '../../bean/admin';
import { Role } from '../../bean/role';
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-leftbar',
  templateUrl:'leftbar.component.html'
})
export class LeftbarComponent implements OnInit{
 leftbars=[];//后台左侧菜单数据/路由
 isClick:Object;//菜单点击按钮
 admin:Admin;
 role:Role;
 menuIsShow=true;//切换导航，默认显示
 
  constructor(public router:Router,private authLoginService:AuthLoginService,private roleService:RoleService){}
  ngOnInit() {
 
    // if(sessionStorage.getItem("admin") && sessionStorage.getItem("role")){
    // this.admin=JSON.parse(sessionStorage.getItem("admin"));
    // this.role=JSON.parse(sessionStorage.getItem("role"));
    // }
    if( this.authLoginService.checkLogin()){
      this.admin=this.authLoginService.getAdmin();
      this.role=this.roleService.getRole();
    }

    if(this.role.name=="广告主"){
        this.leftbars=[
   {menu:'公告信息',icon:'glyphicon glyphicon-volume-up',leftRouter:'/main/notice'},
   {menu:'广告管理',icon:'glyphicon glyphicon-pawn',leftRouter:'/main/advertise/'+this.admin.admin_id},
   {menu:'用户中心',icon:'glyphicon glyphicon-user',leftRouter:'/main/admin'}
   ];
    }else if(this.role.name=="渠道主"){
        this.leftbars=[
   {menu:'公告信息',icon:'glyphicon glyphicon-volume-up',leftRouter:'/main/notice'},
   {menu:'网站管理',icon:'glyphicon glyphicon-bishop',leftRouter:'/main/website/'+this.admin.admin_id},
   {menu:'广告位管理',icon:'glyphicon glyphicon-knight',leftRouter:'/main/advertisespace/'+this.admin.admin_id},
   {menu:'用户中心',icon:'glyphicon glyphicon-user',leftRouter:'/main/admin'}
   ];
    }else if(this.role.name=="广告管理员"){
        this.leftbars=[
   {menu:'公告信息',icon:'glyphicon glyphicon-volume-up',leftRouter:'/main/notice'},
   {menu:'广告主管理',icon:'glyphicon glyphicon-king',leftRouter:'/main/advertisemanager'},
   {menu:'用户中心',icon:'glyphicon glyphicon-user',leftRouter:'/main/admin'}
   ];
    }else if(this.role.name=="渠道管理员"){
        this.leftbars=[
   {menu:'公告信息',icon:'glyphicon glyphicon-volume-up',leftRouter:'/main/notice'},
   {menu:'渠道主管理',icon:'glyphicon glyphicon-queen',leftRouter:'/main/advertisespacemanager'},
   {menu:'用户中心',icon:'glyphicon glyphicon-user',leftRouter:'/main/admin'}
   ];
    }else if(this.role.name=="财务"){
        this.leftbars=[
   {menu:'公告信息',icon:'glyphicon glyphicon-volume-up',leftRouter:'/main/notice'},
   {menu:'财务管理',icon:'glyphicon glyphicon-yen',leftRouter:'/main/financial'},
   {menu:'用户中心',icon:'glyphicon glyphicon-user',leftRouter:'/main/admin'}
   ];
    }else if(this.role.name=="超级管理员"){
        this.leftbars=[
   {menu:'公告信息',icon:'glyphicon glyphicon-volume-up',leftRouter:'/main/notice'},
   {menu:'广告主管理',icon:'glyphicon glyphicon-king',leftRouter:'/main/advertisemanager'},
   {menu:'渠道主管理',icon:'glyphicon glyphicon-queen',leftRouter:'/main/advertisespacemanager'},
   {menu:'财务管理',icon:'glyphicon glyphicon-yen',leftRouter:'/main/financial'},
   {menu:'用户中心',icon:'glyphicon glyphicon-user',leftRouter:'/main/admin'}
   ]
    }
    //如果有开账户权限
    if(this.admin.can_open_account=='1'){
      this.leftbars.push({menu:'下级账户',icon:'glyphicon glyphicon-grain',leftRouter:'/main/child/'+this.admin.admin_id});
    }
       this.isClick=this.leftbars[0];//初始化点击
    //如果非主页刷新则直接跳到该页面
    this.leftbars.forEach(element => {
      if(this.router.url==element.leftRouter){
        this.isClick=element;
      }
    });
  }
  checkLeftBar(leftbar){//点击菜单
    if(this.router.navigate([leftbar.leftRouter])){
    this.isClick=leftbar;//如果成功则变色
    };  
  }
 }