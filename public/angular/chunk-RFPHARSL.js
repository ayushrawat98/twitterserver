import{b as d,c as P}from"./chunk-5XYHWVA4.js";import{e as u,k as v}from"./chunk-4AVR65JZ.js";import{Ma as p,Ta as m,X as n,ab as a,cb as c,db as f,ya as i,yb as l}from"./chunk-QATPKBQI.js";var b=class r{constructor(e,t,s){this._postservice=e;this._authservice=t;this.route=s}postList$;ngOnInit(){this.route.paramMap.subscribe({next:e=>{this.postList$=this._postservice.getAllUserPosts(e.get("username"))},error:e=>{}})}static \u0275fac=function(t){return new(t||r)(i(P),i(v),i(u))};static \u0275cmp=n({type:r,selectors:[["app-profile"]],standalone:!0,features:[a],decls:2,vars:3,consts:[[3,"list"]],template:function(t,s){if(t&1&&(m(0,"app-postlist",0),c(1,"async")),t&2){let o;p("list",(o=f(1,1,s.postList$))!==null&&o!==void 0?o:void 0)}},dependencies:[l,d]})};export{b as ProfileComponent};
