import{a as T}from"./chunk-CHEV3JS6.js";import{a as g,b as w}from"./chunk-MZ7H3CGF.js";import{B as l,Ba as S,C as m,G as v,H as c,J as f,M as n,N as s,O as b,P as h,Q as u,R as r,W as _,_ as P,p as x,pa as C,t as p,u as d}from"./chunk-MLTJO6UL.js";function N(t,i){if(t&1){let e=h();n(0,"app-textarea",4),u("sendText",function(a){p(e);let M=r();return d(M.add(a))}),s()}if(t&2){let e=r();c("disablePostButton",e.disablePostButton)}}function O(t,i){t&1&&(n(0,"p",2),_(1,"Login to post"),s())}function V(t,i){t&1&&b(0,"div",3)}function A(t,i){if(t&1){let e=h();b(0,"app-postlist",5),n(1,"div",6)(2,"button",7),u("click",function(){p(e);let a=r();return d(a.loadNew())}),_(3,"Load New"),s(),n(4,"button",7),u("click",function(){p(e);let a=r();return d(a.loadOld())}),_(5,"Load Older"),s()()}if(t&2){let e=r();c("list",e.allPosts)("showSeperator",!1),l(2),c("disabled",e.pageNumber==0),l(2),c("disabled",e.allPosts[e.allPosts.length-1]&&e.allPosts[e.allPosts.length-1].id==1)}}var y=class t{constructor(i,e,o){this._postService=i;this._authService=e;this.viewportScroller=o}allPosts=[];pageNumber=0;disablePostButton=!1;loading=!1;ngOnInit(){this.getAllPosts()}getAllPosts(){this.loading=!0,this._postService.getAllPosts(this._authService.userdata()?.id??null,this.pageNumber).subscribe({next:i=>{this.allPosts=i,this.viewportScroller.scrollToPosition([0,0]),this.loading=!1}})}add(i){this.disablePostButton=!0,this._postService.addNewPost({content:i.content,parentpostid:null,file:i.file}).pipe().subscribe({next:e=>{this.pageNumber=0,this.getAllPosts(),this.disablePostButton=!1,this._postService.postSuccessSubject.next("success")},error:e=>{alert(e.error),this.disablePostButton=!1,this._postService.postSuccessSubject.next("fail")}})}loadNew(){this.pageNumber--,this.getAllPosts()}loadOld(){this.pageNumber++,this.getAllPosts()}ngOnDestroy(){}static \u0275fac=function(e){return new(e||t)(m(g),m(S),m(C))};static \u0275cmp=x({type:t,selectors:[["app-main"]],standalone:!0,features:[P],decls:5,vars:2,consts:[[1,"container"],["placeholderText","What is happening?",3,"disablePostButton"],[1,"text-area-p"],[1,"spinner","center-block"],["placeholderText","What is happening?",3,"sendText","disablePostButton"],[3,"list","showSeperator"],[2,"display","flex","justify-content","space-between"],[3,"click","disabled"]],template:function(e,o){e&1&&(n(0,"div",0),v(1,N,1,1,"app-textarea",1)(2,O,2,0,"p",2)(3,V,1,0,"div",3)(4,A,6,4),s()),e&2&&(l(),f(o._authService.userdata()?1:2),l(2),f(o.loading?3:4))},dependencies:[w,T],styles:["button[_ngcontent-%COMP%]:disabled{opacity:.5;cursor:auto}"]})};export{y as MainComponent};
