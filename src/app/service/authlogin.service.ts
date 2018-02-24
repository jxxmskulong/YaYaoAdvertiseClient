import { Injectable }     from '@angular/core';
import { Http, Response,RequestOptions ,ConnectionBackend,Headers} from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';
import { Admin } from '../bean/admin';//账户
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare let myUtils:any;
declare let $:any;
//登录登出服务
@Injectable()
export class AuthLoginService implements CanActivate {
    isLoggedIn: boolean = false;
    admin:Admin;
    routerAdmin:Admin;
constructor( private router: Router,private http:Http) {}
    // private loginAdmin=location.protocol+"//"+location.hostname+"/admin/login";

     private loginAdmin=myUtils.getDomain()+"/admin/login";
     private loginoutAdmin=myUtils.getDomain()+"/admin/loginout";
     private isloginAdmin=myUtils.getDomain()+"/admin/islogin";
    // private sessionAdmin=myUtils.getDomain()+"/admin/"+myUtils.getCookie("yayaoadvertise_admin_id");


  // login(adminName:String,password:String): Observable< Object>{
  //   let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  // let options = new RequestOptions({ headers: headers });
  // return this.http.post(this.loginAdmin,"adminName="+adminName+"&password="+password ,options)
  //                   .map(response => response.json()||{});
  // }
  login(adminName:String,password:String):any{
 $.ajax({
     url:this.loginAdmin,
     data:{
       adminName:adminName,
       password:password
     },
     async:false
  }).success((rld)=>{
    if(rld&& rld.code){
     myUtils.myLoadingToast(rld.msg,null);
     return rld;
    }
        if(rld && rld.admin_id){
     this.router.navigate(['/main/notice']);//登陆成功
     myUtils.setCookie("yayaoadvertise_admin_id",JSON.stringify(rld.admin_id),604800);//7天 604800
     myUtils.setCookie("yayaoadvertise_role_id",JSON.stringify(rld.role_id),604800);//7天
     this.admin=rld;
     return rld;
        }
  });
  }
  logout() {
   $.ajax({
     url:this.loginoutAdmin,
     async:false
  }).success((rld)=>{
       myUtils.delCookie("yayaoadvertise_admin_id");
     myUtils.delCookie("yayaoadvertise_role_id");
         this.isLoggedIn = false;  
  });
  }

getAdmin(){
  
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
     url:myUtils.getDomain()+"/admin/"+myUtils.getCookie("yayaoadvertise_admin_id"),
     async:false
  }).success((data)=>{
         this.admin = data;    
  });
     return this.admin;
}
getRouterAdmin(adminId){
   $.ajax({
     url:myUtils.getDomain()+"/admin/"+adminId,
     async:false
  }).success((data)=>{
         this.routerAdmin = data;    
  });
     return this.routerAdmin;
}


   checkLogin(): boolean {
   $.ajax({
     url:this.isloginAdmin,
     async:false
  }).success((rld)=>{
          if(typeof rld=='boolean'){
              this.isLoggedIn=rld;
            }   
  });
    if (this.isLoggedIn) { return true; }
  
    // Navigate to the login page with extras
    //this.router.navigate([url]);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin();
  }
}