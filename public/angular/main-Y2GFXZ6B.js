import{a as g}from"./chunk-G5KA7DMQ.js";import{Aa as l,B as r,C as d,G as _,H as m,J as f,M as a,N as o,O as A,P as k,Q as y,R as h,W as e,X as S,_ as I,ha as M,o as u,p as C,qa as w,ra as O,sa as P,t as v,u as x,ua as E,va as L,wa as R,xa as b,ya as D}from"./chunk-XZJSOPHC.js";var j=[{path:"login",loadComponent:()=>import("./chunk-PFAAPAEP.js").then(t=>t.LoginComponent),canActivate:[()=>!u(l).userdata()]},{path:"register",loadComponent:()=>import("./chunk-V7RID6LQ.js").then(t=>t.RegisterComponent),canActivate:[()=>!u(l).userdata()]},{path:"notification",loadComponent:()=>import("./chunk-DNQ2A3XH.js").then(t=>t.NotificationComponent)},{path:"main",loadComponent:()=>import("./chunk-LEHKRR5A.js").then(t=>t.MainComponent)},{path:":username",loadComponent:()=>import("./chunk-3QTQUTIO.js").then(t=>t.ProfileComponent)},{path:":username/post/:id",loadComponent:()=>import("./chunk-FKIJ3YRW.js").then(t=>t.PostexpandedComponent)},{path:"",redirectTo:"main",pathMatch:"full"}];var F=(t,i)=>{let n=localStorage.getItem("token"),p=t.clone({headers:t.headers.set("Authorization","Bearer "+(n??""))});return i(p)};var T={providers:[M({eventCoalescing:!0}),b(j,D({scrollPositionRestoration:"enabled"})),w(O([F]))]};function H(t,i){t&1&&(a(0,"a",2),e(1,"login"),o(),e(2," \xA0 "),a(3,"a",2),e(4,"register"),o(),e(5," \xA0 ")),t&2&&(m("routerLink","/login"),r(3),m("routerLink","/register"))}function N(t,i){if(t&1){let n=k();a(0,"a",2),e(1),o(),e(2," \xA0 "),a(3,"a",2),e(4,"notification"),o(),e(5," \xA0 "),a(6,"a",3),y("click",function(){v(n);let c=h();return x(c.logout())}),e(7,"logout"),o()}if(t&2){let n,p,c=h();m("routerLink","/"+((n=c._authservice.userdata())==null?null:n.username)),r(),S("@"+((p=c._authservice.userdata())==null?null:p.username)),r(2),m("routerLink","/notification")}}var s=class t{constructor(i,n){this._authservice=i;this.route=n}title="Khichdi";ngOnInit(){let i=localStorage.getItem("token");i&&Date.now()<g(i).exp*1e3&&this._authservice.userdata.set(g(i))}logout(){localStorage.removeItem("token"),this._authservice.userdata.set(null),this.route.navigateByUrl("/main")}static \u0275fac=function(n){return new(n||t)(d(l),d(L))};static \u0275cmp=C({type:t,selectors:[["app-root"]],standalone:!0,features:[I],decls:14,vars:5,consts:[[1,"container"],["id","sliding-text"],[3,"routerLink"],[3,"click"]],template:function(n,p){n&1&&(a(0,"div",0)(1,"header")(2,"div",1)(3,"h1",2),e(4,"\u0916\u093F\u091A\u095C\u0940"),o(),a(5,"h1",2),e(6,"Khichdi"),o()()(),A(7,"router-outlet"),o(),a(8,"nav")(9,"a",2),e(10,"main"),o(),e(11," \xA0 "),_(12,H,6,2)(13,N,8,3),o()),n&2&&(r(3),m("routerLink","/main"),r(2),m("routerLink","/main"),r(4),m("routerLink","/main"),r(3),f(p._authservice.userdata()?-1:12),r(),f(p._authservice.userdata()?13:-1))},dependencies:[E,R],styles:[".container[_ngcontent-%COMP%]{width:96%;margin:auto;padding:0}nav[_ngcontent-%COMP%]{width:100%;padding:8px;position:fixed;bottom:0;display:flex;justify-content:center;background-color:#000}nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;text-decoration:none;padding:0 8px}header[_ngcontent-%COMP%]{overflow:hidden;height:72px;display:flex}#sliding-text[_ngcontent-%COMP%]{position:relative}@keyframes _ngcontent-%COMP%_slideUp{0%{transform:translateY(90px)}50%{transform:translateY(0)}to{transform:translateY(-64px)}}#sliding-text[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideUp 4s ease-in-out forwards}@media (min-width:630px){.container[_ngcontent-%COMP%]{width:600px}}"]})};P(s,T).catch(t=>console.error(t));
