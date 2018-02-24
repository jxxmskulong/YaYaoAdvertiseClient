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
import { Router, ActivatedRoute, Params } from '@angular/router';
declare let myUtils:any;
declare let $:any;
@Component({
  selector: 'footer',
  templateUrl:'footer.component.html'
})
export class FooterComponent{
//主页流程显示
channelShow=true;//默认渠道流程
merchantShow=false;
channelShowBtn(){
this.channelShow=true;
this.merchantShow=false;
}

merchantShowBtn(){
this.merchantShow=true;
this.channelShow=false;
}
 }