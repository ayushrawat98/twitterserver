import{a as A}from"./chunk-75L3BLPX.js";import{b as y,c as I}from"./chunk-INIIUKDS.js";import{k as M}from"./chunk-5A6FZFTQ.js";import{A as p,Cb as g,La as f,Na as u,Pa as _,Sa as r,Ta as a,Ua as v,Va as x,Wa as C,X as l,Xa as P,ab as h,da as m,ea as c,eb as T,gb as b,hb as S,ya as d,za as s}from"./chunk-3NGNS3BA.js";function $(i,t){if(i&1){let e=x();r(0,"app-textarea",3),C("sendText",function(o){m(e);let O=P();return c(O.add(o))}),a()}}function D(i,t){i&1&&(r(0,"p",1),h(1,"Login to post"),a())}var w=class i{constructor(t,e){this._postservice=t;this._authservice=e}allPosts$;textareaContent="";ngOnInit(){this.allPosts$=this._postservice.getAllPosts()}add(t){let e=this._authservice.userdata()?.id??0;e!=0&&this._postservice.addNewPost({content:t.content,id:e,parentpostid:null,file:t.file}).pipe(p(1e3)).subscribe({next:n=>{this.allPosts$=this._postservice.getAllPosts(),this.textareaContent=""},error:n=>{alert(n.error)}})}static \u0275fac=function(e){return new(e||i)(s(I),s(M))};static \u0275cmp=l({type:i,selectors:[["app-main"]],standalone:!0,features:[T],decls:4,vars:4,consts:[[3,"setText"],[1,"text-area-p"],[3,"list"],[3,"sendText","setText"]],template:function(e,n){if(e&1&&(f(0,$,1,0,"app-textarea",0)(1,D,2,0,"p",1),v(2,"app-postlist",2),b(3,"async")),e&2){let o;_(n._authservice.userdata()?0:1),d(2),u("list",(o=S(3,2,n.allPosts$))!==null&&o!==void 0?o:void 0)}},dependencies:[g,y,A]})};export{w as MainComponent};
