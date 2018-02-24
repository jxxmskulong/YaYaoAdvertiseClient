import { NgModule }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule,BrowserXhr } from '@angular/http';

import { TopbarComponent }   from '../topbar/topbar.component';//头部组件
import { FooterComponent }   from '../footer/footer.component';//footer页面
import { ErrorComponent }   from '../error/error.component';//error页面

import { RoleService } from '../service/role.service';//角色服务
import { PaginationService } from '../service/pagination.service';//分页服务
import { CorsBrowserXhrService } from '../service/corsbrowserxhr.service';//ajax服务
import { WebsiteService } from '../service/website.service';//网站服务
@NgModule({
  imports: [
 CommonModule,
     FormsModule,
     HttpModule,
     JsonpModule
    ],
  declarations: [
    TopbarComponent,
    FooterComponent,
    ErrorComponent
    ],
    exports:[ 
    CommonModule,
     FormsModule,
     HttpModule,
     JsonpModule,
    TopbarComponent,
    FooterComponent,
    ErrorComponent 
      ],
      providers:[
         {provide: BrowserXhr,useClass:CorsBrowserXhrService},
   CorsBrowserXhrService,
  PaginationService,
  WebsiteService,
  RoleService
      ]
  
})
export class MycommonModule { 
  
}
