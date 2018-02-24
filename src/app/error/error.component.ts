import { Component} from '@angular/core';
declare let myUtils: any;
declare let $: any;

@Component({
  selector:"error",
  styles:[`
      
    	.div404-warp{
    	border:1px solid #999;
    	background-color: #999;
    	width:100%; 
    	height:100%;
    	position:relative;
    	top:0;
    	left:0; 
    	}
		.div404-warp-center{
			position:absolute;
			top:50%;
			left:50%;
			margin:-70px 0 0 -70px;
			text-align: center;
			
		}
		.goIndex{
		margin-top:5px;
		}
    	@MEDIA screen and (min-width:640px) {
    	.div404-warp{
    	width:640px !important;
    	border:1px solid #999 !important;
    	background-color: #999 !important;
    	position:relative !important;
    	left:50% !important;
    	margin: 0 0 0 -320px;
    	}
	
	}`],
  templateUrl:'error.component.html'
})
export class ErrorComponent {

 }