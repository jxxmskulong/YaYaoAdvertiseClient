import { NgModule }      from '@angular/core';
import { MainRoutingModule} from '../main/main-routing.module';
import { MycommonModule }    from '../common/mycommon.module';


import { MainComponent } from '../main/main.component';
import { LeftbarComponent }   from '../main/leftbar/leftbar.component';//主页左边组件
import { RightbarComponent }   from '../main/rightbar/rightbar.component';//主页右边组件
import { NoticeComponent,UpdatenoticeComponent,DetailnoticeComponent }   from '../main/rightbar/notice/notice.component';//主页右边公告组件
import { AdvertiseComponent ,UpdateadvertiseComponent,DataadvertiseComponent }   from '../main/rightbar/advertise/advertise.component';//主页右边广告组件
import { AdvertisemanagerComponent,UpdateadvertisemanagerComponent }   from '../main/rightbar/advertisemanager/advertisemanager.component';//主页右边广告管理员组件
import { WebsiteComponent,UpdatewebsiteComponent }   from '../main/rightbar/website/website.component';//主页右边渠道主网站组件
import { AdvertisespaceComponent,UpdateadvertisespaceComponent ,DataadvertisespaceComponent}   from '../main/rightbar/advertisespace/advertisespace.component';//主页右边渠道主广告位组件
import { AdvertisespacemanagerComponent,UpdateadvertisespacemanagerComponent }   from '../main/rightbar/advertisespacemanager/advertisespacemanager.component';//主页右边渠道管理员组件
import { ChildComponent,UpdatechildComponent }   from '../main/rightbar/child/child.component';//主页右边下级账户组件
import { FinancialComponent,UpdatefinancialComponent ,DetailfinancialComponent}   from '../main/rightbar/financial/financial.component';//主页右边财务组件

import {AdminComponent }   from '../main/rightbar/admin/admin.component';//主页右边个人信息组件

//import { AdvertisementListService } from '../service/advertisement.service';//广告位服务

import { RatioPipe } from '../pipe/ratio.pipe';//数值管道

@NgModule({
  imports: [
      MycommonModule,
      MainRoutingModule
   ],
  declarations: [
    RatioPipe,
    MainComponent,
    LeftbarComponent,
    RightbarComponent,
    NoticeComponent,
    UpdatenoticeComponent,
    DetailnoticeComponent,
    AdvertisespacemanagerComponent,
    AdvertiseComponent,
    UpdateadvertiseComponent,
    DataadvertiseComponent,
    AdvertisemanagerComponent,
    UpdateadvertisemanagerComponent,
    WebsiteComponent,
    UpdatewebsiteComponent,
    AdvertisespaceComponent,
    UpdateadvertisespaceComponent,
    DataadvertisespaceComponent,
    AdvertisespacemanagerComponent,
    UpdateadvertisespacemanagerComponent,
    ChildComponent,
    UpdatechildComponent,
    FinancialComponent,
    UpdatefinancialComponent,
    DetailfinancialComponent,
    AdminComponent
    ]
   
})
export class MainModule { 
  
}
