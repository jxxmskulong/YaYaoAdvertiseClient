import { Injectable} from '@angular/core';
import {Website } from '../bean/website';
import { DataDay } from '../bean/dataday';
declare let myUtils: any;
declare let $: any;
@Injectable()
export class WebsiteService {
   /**
    * 获取当前用户的website
    */
    getCount(sessionAdmin){
        let count=0;
   $.ajax({
     url:myUtils.getDomain()+"/website/count/"+sessionAdmin.admin_id,
     async:false
  }).success((data)=>{
        count=data;
    });
     return count;
    }

} 