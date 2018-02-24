import { Injectable }     from '@angular/core';
declare let myUtils:any;
//分页组件服务
@Injectable()
export class PaginationService  {
    
currentPage=1;//当前页
totalPage=0;//总页数
showPageNumberArray=[];//显示页码数组
constructor() {
}

     //获取总页码
    getTotalPage(totalNumber:number,pageNumber:number){
     return totalNumber%pageNumber==0?totalNumber/pageNumber:Math.ceil(totalNumber/pageNumber);
    }
    //获取当前页
    getCurrentPage(currentPage:number){
      return currentPage;
    }
     //获取显示数目
    getShowPageNumber(totalPage:number,pageNumber:number,mostShowPageNumber:number,currentPage:number):number[]{
      this.showPageNumberArray=[];//清空
      //小于设定的最大值的情况返回实际值
      if(totalPage<=mostShowPageNumber){
         for(let i=0;i< totalPage;i++){
            this.showPageNumberArray.push(i+1);
          }
          return this.showPageNumberArray;
      }
      //大于设定的最大值
      if(totalPage>mostShowPageNumber){
           //小于最大值一半的情况
           if(currentPage<=Math.ceil(mostShowPageNumber/2)){
                for(let i=0;i< mostShowPageNumber;i++){
                this.showPageNumberArray.push(i+1);
              }
              return this.showPageNumberArray;    
           }
           //大于设定的最大值一半
           if(currentPage>Math.ceil(mostShowPageNumber/2)){
                   //如果最大值-当前值小于mostShowPageNumber，则显示(最大值-当前值)+1个
               if(totalPage<mostShowPageNumber+currentPage){
                   let lastPages=totalPage-currentPage;
               for(let i=0;i<lastPages+1;i++){
                this.showPageNumberArray.push(currentPage+i);
              }
              console.log( this.showPageNumberArray)
              return this.showPageNumberArray;
               }
               //如果当前值+最大的显示小于等于最大值，则显示mostShowPageNumber个
               if(currentPage+mostShowPageNumber<=totalPage){
               for(let i=0;i<mostShowPageNumber;i++){
                this.showPageNumberArray.push(currentPage+i-Math.floor(mostShowPageNumber/2));
              }
              return this.showPageNumberArray;
               }  
           }

      }
    return this.showPageNumberArray;
    }
     //到达的页面
     /**
      * content :点击的当前页目
      *currentPage:当前页
      *totalNumber:总页数
      */
     toPage(content,currentPage,totalPage):boolean{
    if(content=="首页"){
       if(currentPage==1){
          return false;
      }
      this.currentPage=1;
      return true;
    }
    if(content=="尾页"){
        if(currentPage==totalPage){
      return false;
      }
        this.currentPage=totalPage;
        return true;
    }
    if(content=="previous"){
      if(currentPage==1){
      return false;
      }
      currentPage--;
      this.currentPage=currentPage;
        return true;
    }
    if(content=="next"){
       if(currentPage==totalPage){
      return false;
      }
      currentPage++;
      this.currentPage=currentPage;
        return true;
    }
    if(content){
      currentPage=content;//当前页
      this.currentPage=currentPage;
        return true;
    }
    }
}