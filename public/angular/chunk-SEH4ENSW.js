import{a as w}from"./chunk-X6AC3SVN.js";import{a as M,b as T}from"./chunk-WNFGF7OE.js";import{C as a,Ca as b,D as c,H as m,I as x,K as d,O as o,P as s,Q as P,R as h,S as u,T as _,Y as f,aa as g,g as v,h as S,q as C,u as l,v as p}from"./chunk-7YCM2XEO.js";function O(i,e){if(i&1){let t=h();o(0,"app-textarea",5),u("sendText",function(r){l(t);let A=_();return p(A.add(r))}),s()}}function D(i,e){i&1&&(o(0,"p",2),f(1,"Login to post"),s())}function I(i,e){if(i&1){let t=h();o(0,"button",6),u("click",function(){l(t);let r=_();return p(r.loadOlder())}),f(1,"Load Older"),s()}}var y=class i{constructor(e,t){this._postService=e;this._authService=t}allPosts=[];hideLoadMore=!1;ngOnInit(){this._postService.mainCache.post.length!=0?this.allPosts=[...this._postService.mainCache.post]:this.getAllPosts()}getAllPosts(){this._postService.getAllPosts(this._authService.userdata()?.id??null).pipe(S(1e3)).subscribe({next:e=>{Array.isArray(e)&&e.length==0&&(this.hideLoadMore=!0,this._postService.mainCache.pageno--),this.allPosts=[...this.allPosts,...e]}})}add(e){this._postService.addNewPost({content:e.content,parentpostid:null,file:e.file}).pipe(v(1e3)).subscribe({next:t=>{this.getAllPosts(),this._postService.postSuccessSubject.next(1)},error:t=>{alert(t.error),this._postService.postSuccessSubject.next(-1)}})}loadOlder(){this._postService.mainCache.pageno++,this.getAllPosts()}ngOnDestroy(){this._postService.mainCache.post=[...this.allPosts]}static \u0275fac=function(t){return new(t||i)(c(M),c(b))};static \u0275cmp=C({type:i,selectors:[["app-main"]],standalone:!0,features:[g],decls:5,vars:4,consts:[[1,"container"],["placeholderText","What is happening?"],[1,"text-area-p"],[3,"list","showSeperator"],[1,"center-block"],["placeholderText","What is happening?",3,"sendText"],[1,"center-block",3,"click"]],template:function(t,n){t&1&&(o(0,"div",0),m(1,O,1,0,"app-textarea",1)(2,D,2,0,"p",2),P(3,"app-postlist",3),m(4,I,2,0,"button",4),s()),t&2&&(a(),d(n._authService.userdata()?1:2),a(2),x("list",n.allPosts)("showSeperator",!1),a(),d(n.hideLoadMore?-1:4))},dependencies:[T,w]})};export{y as MainComponent};
