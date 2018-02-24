import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  AfterViewInit, ViewChild,
  OnInit
} from '@angular/core';
import { Router, Params ,ActivatedRoute} from '@angular/router';
import {RoleService } from '../service/role.service';
import { Admin } from '../bean/admin';//账户
import { Role } from '../bean/role';//角色
declare let myUtils:any;
declare let $:any;
@Component({
  selector: 'home-register',
  templateUrl:'register.component.html'
  
})
export class RegisterComponent implements OnInit{
    alreadyLogin=false;//没有登录
   adminRegister={
     adminName:'',
     password:'',
     validCode:'',
     roleId:''
   };
  roleList:Role[]=[];
ngOnInit(){
      this.roleList=this.roleService.getRoleList();//获取角色列表
}

   
    constructor(private activatedRoute: ActivatedRoute,public router:Router,public roleService:RoleService){
    }

   
    registerValue="注册";
    registerDisabled:boolean=false;
    validCodeValue="验证码";
    isSendValidCode=false;//验证码可点击
   //注册成功
   registerSubmit(){
    this.registerDisabled=true;
  this.registerValue="注册中...";
$.ajax({
     url:myUtils.getDomain()+"/admin/register",
     async:false,
     data:{
       adminName:this.adminRegister.adminName,
      password:this.adminRegister.password,
      validCode:this.adminRegister.validCode,
      roleId:this.adminRegister.roleId}
  }).success((data)=>{
    this.registerDisabled=false;
  this.registerValue="注册";
       console.log(data)
       if(data&&data.code!=200){
       return myUtils.myLoadingToast(data.msg,null);
       }
       if(data&&data.code==200){
       myUtils.myLoadingToast("注册成功",null);
        this.router.navigate(['/']);
       return ;
       }

   });
   }
   //获取验证码
getValidCode(){
  if( !myUtils.userVerification.phone.test(this.adminRegister.adminName) && !myUtils.userVerification.email.test(this.adminRegister.adminName) ){
return myUtils.myLoadingToast("请填写正确手机/邮箱",null);
  }
       
$.ajax({
     url:myUtils.getDomain()+"/admin/validCode",
     async:false,
     data:{adminName:this.adminRegister.adminName}
  }).success((data)=>{
  if(data&&data.code==200){
  //验证码
  let codetime=60;
  this.isSendValidCode=true;
 let validCodeTimer=setInterval(()=>{
    if(codetime==0){
      clearInterval(validCodeTimer);
       this.validCodeValue="验证码";
       this.isSendValidCode=false;
       return;
    }
    this.validCodeValue=codetime.toString()+'s后可点击';
    codetime--;
  },1000);
      myUtils.myLoadingToast("发送成功",null);
       }
  });
}
 }