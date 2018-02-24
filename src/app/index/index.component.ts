import {
  Component,
  Input,
  Output,
  trigger,
  state,
  style,
  transition,
  animate,
  AfterViewInit, ViewChild,
  OnInit
} from '@angular/core';
import { Router, Params } from '@angular/router';
import {AuthLoginService } from '../service/authlogin.service';
import { Admin } from '../bean/admin';//账户
import { TopbarComponent } from '../topbar/topbar.component';//导航头
declare let myUtils:any;
declare let $:any;
@Component({
  selector: 'home-index',
  templateUrl:'index.component.html',
   animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    state('out', style({transform: 'translateX(-100%)'})),
    transition('in <=> out', [
      
      animate(100)
    ])
  ])
]
//   template:'index.component.html'
  
})
export class IndexComponent implements OnInit{
    // alreadyLogin=false;//没有登录
    alreadyLogin=this.authLoginService.checkLogin();
    adminLogin={adminName:'',password:''};
    admin:Admin;
    

  
    constructor(public authLoginService:AuthLoginService,public router:Router){}
ngOnInit(){
}

   
    loginValue="登录";
    backGray:string;
    loginDisabled:boolean=false;
   //登录成功
   login(){
  this.loginDisabled=true;
  this.loginValue="登录中...";
   let rld=this.authLoginService.login(this.adminLogin.adminName,this.adminLogin.password);
  this.loginDisabled=false;
  this.loginValue="登录";
   if(rld&&rld.code){
  this.alreadyLogin = false;
   }else if(rld&& rld.admin_id){
  this.alreadyLogin = true;
   }
   }
   //直接进入后台
   goMain(){
     this.router.navigate(['/main/notice']);
   }
   //退出
   loginOut(){
     myUtils.myConfirm("确认退出吗?",()=>{
    this.authLoginService.logout();
     this.alreadyLogin=this.authLoginService.isLoggedIn;
      //sessionStorage.clear();
      this.router.navigate(['/index']);
    });
   }

 }