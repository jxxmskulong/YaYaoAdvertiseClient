import { Component ,Input,OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthLoginService } from '../service/authlogin.service';
import { Admin } from '../bean/admin';//账户
declare let myUtils:any;
declare let $:any;
@Component({
  selector: 'topbar',
  templateUrl:'topbar.component.html'
})
export class TopbarComponent implements OnInit{
   constructor(public router:Router,private authLoginService:AuthLoginService){}
     alreadyLogin=this.authLoginService.isLoggedIn;//没有登录
  admin:Admin;
showZoom=false;
defaultzoom:number=Number(localStorage.getItem("advertiseZoom"))||1.0;
zooms:number[]=[0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5];
  
     ngOnInit(){
    this.alreadyLogin=this.authLoginService.checkLogin();
    // if(sessionStorage.getItem("admin")){
    // this.admin=JSON.parse(sessionStorage.getItem("admin"));
    // }
    if( this.alreadyLogin){
      this.admin=this.authLoginService.getAdmin();
    }
 
    this.changeZoom(this.defaultzoom);
    if(this.router.url.indexOf("main")>-1 && navigator.userAgent.indexOf("Chrome")>-1){
  this.showZoom=true;
    }
     }

  //退出成功
  loginOut(){
    myUtils.myLoginOut("确认退出吗?",()=>{
    this.authLoginService.logout();
     //sessionStorage.clear();
    this.alreadyLogin=this.authLoginService.isLoggedIn;
    this.router.navigate(['/index']);
    });
  }
  //缩放调整
  changeZoom(defaultZoom){
    localStorage.setItem("advertiseZoom",defaultZoom);
    
  $("html").css({"zoom":defaultZoom});

  }
}