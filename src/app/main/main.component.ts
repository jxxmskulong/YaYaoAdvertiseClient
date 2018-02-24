import { Component ,OnInit,ViewChild} from '@angular/core';
import { Role } from '../bean/role';
import {LeftbarComponent } from './leftbar/leftbar.component';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';
declare let myUtils: any;
declare let $: any;
@Component({
  selector: 'main',
  templateUrl:'main.component.html'
})
export class MainComponent implements OnInit{
roleList:Role[]=[];

@ViewChild(LeftbarComponent)
private leftbarComponent :LeftbarComponent;
      constructor( private router: Router) {}
      ngOnInit(){
            //let _this=this;
    //  $.get(myUtils.getDomain()+"/role/list",(rld)=>{
    //        if(rld&&rld.code==40001){
    //              myUtils.myLoadingToast("会话过期！重新登录");
    //              sessionStorage.clear();
    //              this.router.navigate(['/index']);
    //              return ;
    //        }
    //      sessionStorage.setItem("roleList",JSON.stringify(rld));
    //        this.roleList=rld;

    //  });
        //初始化allAdminList
  // $.get(myUtils.getDomain()+"/admin/list/all",(pld)=>{
  //        sessionStorage.setItem("allAdminList",JSON.stringify(pld));
  //              });

     }
     //切换
     width='15px';
     fontSize="15px";
    transition="width 1s,font-size 2s,margin-left 2s,left 1s";
     menuIsShow=true;//菜单是否伸展，默认是
     leftWidth="200px";//左边宽度
     leftIcon="200px";//icon离左边的距离
     rightLeft="250px";//右边body离左边的距离
     mouseoverIcon(){
       this.width="30px";
       this.fontSize="25px";
     }
      mouseoutIcon(){
       this.width="15px";
       this.fontSize="15px";
     }
     toggleMenu(menuIsShow){
    this.menuIsShow=!menuIsShow;
    if(this.menuIsShow){
      this.leftWidth="200px";
      this.leftIcon="200px";
      this.rightLeft="250px";
      this.leftbarComponent.menuIsShow=true;
    }else{
       this.leftWidth="50px";
       this.leftIcon="50px";
       this.rightLeft="100px";
       this.leftbarComponent.menuIsShow=false;
    }
     }
 }
