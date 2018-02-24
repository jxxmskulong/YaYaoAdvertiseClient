import {
  OnInit,
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
declare let myUtils: any;
declare let $: any;
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl:'app.component.html'
})
export class AppComponent implements  OnInit {
  constructor(private router:Router){}
ngOnInit(){
    let _this=this;
　　$.ajaxSetup({
 　　　　timeout: 3000,
// 　　　　dataType: 'html',
// 　　　　//请求成功后触发
 　//　　　success: function (data) { 

 // },
// 　　　　//请求失败遇到异常触发
 　　　　error: function (xhr, status, e) { myUtils.myLoadingToast("请求错误！"); },
// 　　　　//完成请求后触发。即在success或error触发后触发
 　　　　complete: function (xhr) { 
   myUtils.myPrevToast("加载中",null,'remove');
   if(xhr.responseJSON&&xhr.responseJSON.code==40002){//手机或email已经存在
                 myUtils.myLoadingToast(xhr.responseJSON.msg);
                 return ;
           }
   if(xhr.responseJSON&&xhr.responseJSON.code==40001){
                 myUtils.myLoadingToast("会话过期！重新登录");
                 sessionStorage.clear();
                 _this.router.navigate(['/index']);
                 return ;
           }
   if(xhr.responseJSON&&xhr.responseJSON.code==40000){
                 myUtils.myLoadingToast("请求失败！请检查！");
                 return ;
           }
   },
　　　　//发送请求前触发
 　　　　beforeSend: function (xhr) {
// 　　　　//可以设置自定义标头
// 　　　　xhr.setRequestHeader('Content-Type', 'application/xml;charset=utf-8');
//myUtils.myLoadingToast("加载中...");
myUtils.myPrevToast("加载中",null,'add');
 　　　　},
      //  beforeSend: function(xhr) {
      //           xhr.withCredentials = true;
      //       }
      xhrFields: {
                withCredentials: true
            }
　　});
  }

 }
