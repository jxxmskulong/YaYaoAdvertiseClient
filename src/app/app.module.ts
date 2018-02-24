import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }    from './app-routing.module';
import { MycommonModule }    from './common/mycommon.module';

import { AppComponent }   from './app.component';//主组件
import { IndexComponent }   from './index/index.component';//首页登录组件
import { RegisterComponent }   from './register/register.component';//首页注册组件

import { AuthLoginService }   from './service/authlogin.service';//是否登录服务

@NgModule({
  imports: [
    BrowserModule,
    MycommonModule,
    AppRoutingModule
    ],
  declarations: [
    AppComponent,
    IndexComponent,
    RegisterComponent
    ],
    providers:[
  AuthLoginService
    ],
  bootstrap: [
    AppComponent]
  
})
export class AppModule { 
  
}
