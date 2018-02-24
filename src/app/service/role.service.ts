import { Injectable }     from '@angular/core';
import { Http, Response,RequestOptions ,ConnectionBackend,Headers} from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';
import { Admin } from '../bean/admin';
import { Role } from '../bean/role';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthLoginService } from '../service/authlogin.service';
import {WebsiteService } from '../service/website.service';
declare let myUtils:any;
declare let $:any;
//角色服务
@Injectable()
export class RoleService implements CanActivate {
    isHaveJurisdiction: boolean = false;

    admin:Admin;
    role:Role=new Role('','','','');
    routerRole;
    roleList:Role[]=[];
  

constructor( private router: Router,private http: Http,private authLoginService:AuthLoginService,private websiteService:WebsiteService) {}
   
    getRole(){
      if(!myUtils.getCookie("yayaoadvertise_role_id")){
   $.ajax({
     url:myUtils.getDomain()+"/admin/loginout",
     async:false
  }).success((rld)=>{
        this.router.navigate(['/index']);//退出登录
    });
        return;
      }

$.ajax({
     url:myUtils.getDomain()+"/role/"+myUtils.getCookie("yayaoadvertise_role_id"),
     async:false
  }).success((data)=>{
         this.role=data;
    });
     return this.role;
    }

     getRouterRole(roleId){
     $.ajax({
     url:myUtils.getDomain()+"/role/"+roleId,
     async:false
  }).success((data)=>{
         this.routerRole=data;
    });
     return this.routerRole;
      }
    /**
     * 获取角色列表
     */
      getRoleList(){
  
$.ajax({
     url:myUtils.getDomain()+"/role/list",
     async:false
  }).success((data)=>{
         this.roleList=data;
    });
     return this.roleList;
    }

   checkRole(url:String): boolean {
    this.admin=this.authLoginService.getAdmin();//当前登录用户
    this.role=this.getRole();//当前登录角色
    //所有用户都可用
    if(url=="/main/notice"||url=="/main/admin" || url.indexOf("/main/child")>-1){
        return true;
    }
    //广告主和渠道主子系统
    if(this.admin.can_open_account=='1'){
        if(this.role.name=="广告主" && url.indexOf("/main/advertise")>-1){
         if(this.admin.status!="正常"){
            myUtils.myLoadingToast("请先完善用户信息");
          return false;
        }
        return true;
      }
      if(this.role.name=="渠道主" && (url.indexOf("/main/website")>-1||url.indexOf("/main/advertisespace")>-1)){
        if(this.admin.status!="正常"){
           myUtils.myLoadingToast("请先完善用户信息");
          return false;
        }
        return true;
      }
    }
    if(this.role.name=="广告主"){
      if(url=="/main/advertise/"+this.admin.admin_id){
      if(this.admin.status!="正常"){
        myUtils.myLoadingToast("请先完善用户信息");
          return false;
        }
        return true;
      }
      
    }else if(this.role.name=="渠道主"){
       if(url=="/main/website/"+this.admin.admin_id||url=="/main/advertisespace/"+this.admin.admin_id){
         if(url=="/main/advertisespace/"+this.admin.admin_id && this.websiteService.getCount(this.admin)<=0){
          myUtils.myLoadingToast("请先创建网站");
          return false;
         }
         
         if(this.admin.status!="正常"){
            myUtils.myLoadingToast("请先完善用户信息");
          return false;
        }
        return true;
      }
    }else if(this.role.name=="广告管理员"){
       if(url=="/main/advertisemanager"||url.indexOf("/main/advertise")>-1){
         if(this.admin.status!="正常"){
            myUtils.myLoadingToast("请先完善用户信息");
          return false;
        }
        return true;
      }
    }else if(this.role.name=="渠道管理员"){
      if(url=="/main/advertisespacemanager"||url.indexOf("/main/website")>-1||url.indexOf("/main/advertisespace")>-1){
        if(this.admin.status!="正常"){
           myUtils.myLoadingToast("请先完善用户信息");
          return false;
        }
        return true;
      }
    }else if(this.role.name=="财务"){
       if(url=="/main/financial"){
         if(this.admin.status!="正常"){
            myUtils.myLoadingToast("请先完善用户信息");
          return false;
        }
        return true;
      }
    }else if(this.role.name=="超级管理员"){
       if(url=="/main/advertisemanager"||url=="/main/advertisespacemanager"||url=="/main/financial"||url.indexOf("/main/advertise")>-1||url.indexOf("/main/website")>-1||url.indexOf("/main/advertisespace")>-1){
         if(this.admin.status!="正常"){
            myUtils.myLoadingToast("请先完善用户信息");
          return false;
        }
        return true;
      }
    }
    
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkRole(url);
  }
   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}