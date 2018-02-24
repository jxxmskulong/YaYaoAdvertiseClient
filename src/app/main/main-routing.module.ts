import { NgModule }      from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { NoticeComponent }   from '../main/rightbar/notice/notice.component';//主页右边公告组件
import { AdvertiseComponent ,UpdateadvertiseComponent }   from '../main/rightbar/advertise/advertise.component';//主页右边广告组件
import { AdvertisemanagerComponent}   from '../main/rightbar/advertisemanager/advertisemanager.component';//主页右边广告管理员组件
import { WebsiteComponent}   from '../main/rightbar/website/website.component';//主页右边渠道主网站组件
import { AdvertisespaceComponent}   from '../main/rightbar/advertisespace/advertisespace.component';//主页右边渠道主广告位组件
import { AdvertisespacemanagerComponent }   from '../main/rightbar/advertisespacemanager/advertisespacemanager.component';//主页右边渠道管理员组件
import { ChildComponent }   from '../main/rightbar/child/child.component';//主页右边下级账户组件
import { FinancialComponent }   from '../main/rightbar/financial/financial.component';//主页右边财务组件
import {AdminComponent }   from '../main/rightbar/admin/admin.component';//主页右边个人信息组件

import { RoleService } from '../service/role.service';//角色服务

const mainRoutes: Routes = [ 
     { path: '' ,component: MainComponent,
  children:[
{path:'notice',component:NoticeComponent ,canActivate: [RoleService]},
{path:'advertise/:advertiseAdminId',component:AdvertiseComponent ,canActivate: [RoleService]},
{path:'advertisemanager',component:AdvertisemanagerComponent ,canActivate: [RoleService]},
{path:'website/:websiteAdminId',component:WebsiteComponent ,canActivate: [RoleService]},
{path:'advertisespace/:advertisespaceAdminId',component:AdvertisespaceComponent ,canActivate: [RoleService]},
{path:'advertisespacemanager',component:AdvertisespacemanagerComponent ,canActivate: [RoleService]},
{path:'child/:childParentId',component:ChildComponent ,canActivate: [RoleService]},
{path:'financial',component:FinancialComponent ,canActivate: [RoleService]},
// {path:'website',component:WebsiteComponent,
//     children:[
//       {path:'addwebsite',component:AddwebsiteComponent},
//       {path:'listwebsite',component:ListwebsiteComponent},
//       {path:'',component:ListwebsiteComponent}
//     ]
//   },

// {path:'advertisement',component:AdvertisementComponent},
 {path:'admin',component:AdminComponent,canActivate: [RoleService]},
{path:'',component:NoticeComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes
)],
    exports:[
        RouterModule
    ]
})
export class MainRoutingModule { 
  
}
