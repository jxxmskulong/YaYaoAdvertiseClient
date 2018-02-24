import { Injectable }     from '@angular/core';
import { BrowserXhr} from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';


declare let myUtils:any;
//ajax服务
@Injectable()  
export class CorsBrowserXhrService extends BrowserXhr {  
    constructor(private router:Router) {  
        super();  
    }  
  
    build(): any {  
        let xhr:XMLHttpRequest = super.build();  
        xhr.withCredentials = true;  
        xhr.onreadystatechange=()=>
{
    if (xhr.readyState==4 && xhr.status==200)
    {
       if(JSON.parse(xhr.response)&&JSON.parse(xhr.response).code==40002){//手机或email已经存在
                 myUtils.myLoadingToast(JSON.parse(xhr.response).msg);
                 return ;
           }
   if(JSON.parse(xhr.response)&&JSON.parse(xhr.response).code==40001){
                 myUtils.myLoadingToast("会话过期！重新登录");
                 //sessionStorage.clear();
                 this.router.navigate(['/']);
                 return ;
           }
   if(JSON.parse(xhr.response)&&JSON.parse(xhr.response).code==40000){
                 myUtils.myLoadingToast("请求失败！请检查！");
                 return ;
           }
    }
}
        return <any>(xhr);  
    }  
} 
