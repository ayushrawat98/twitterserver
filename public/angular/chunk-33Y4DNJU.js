import{$ as O,A as v,B as o,G as m,H as p,J as d,K as U,L as M,M as r,N as i,O as a,P as E,Q as I,R as l,W as s,X as u,Y as P,_ as g,ba as T,c as h,da as F,ja as D,k as y,la as j,ma as N,n as S,p as C,sa as $,t as k,u as w,va as _,y as f}from"./chunk-KVUTPX5S.js";var V=(e,n)=>({"bi-heart-fill red":e,"bi-heart":n});function B(e,n){if(e&1&&a(0,"video",9),e&2){let t=l(3);p("src",t.baseUrl+"/"+t.post().media,v)}}function R(e,n){if(e&1&&a(0,"img",10),e&2){let t=l(3);p("src",t.baseUrl+"/"+t.post().media,v)}}function Y(e,n){if(e&1&&m(0,B,1,1,"video",9)(1,R,1,1,"img",10),e&2){let t=l(2);d(t.post().mediatype=="video/mp4"||t.post().mediatype=="video/webm"?0:1)}}function q(e,n){if(e&1){let t=E();r(0,"article")(1,"span"),s(2),i(),s(3," \xA0 "),r(4,"span",0),s(5),i(),s(6," \xA0 "),r(7,"span",1),s(8),T(9,"date"),i(),r(10,"div",2)(11,"p"),s(12),i(),m(13,Y,2,1),i(),r(14,"div",3)(15,"div",2),a(16,"i",4),s(17),i(),r(18,"div")(19,"i",5),I("click",function(){k(t);let b=l();return w(b.clicked=!b.clicked)}),i(),s(20),i(),r(21,"div"),a(22,"i",6),i(),r(23,"div"),a(24,"i",7),i(),r(25,"div"),a(26,"i",8),i()()()}if(e&2){let t=l();o(2),u(t.post().User.displayname),o(3),u("@"+t.post().User.username),o(3),u(F(9,10,t.post().createdAt,"d/M/YY, h:mm a")),o(2),p("routerLink","/"+t.post().User.username+"/post/"+t.post().id),o(2),u(t.post().content),o(),d(t.post().media?13:-1),o(2),p("routerLink","/"+t.post().User.username+"/post/"+t.post().id),o(2),P(" ",t.post().commentcount," "),o(2),p("ngClass",O(13,V,t.clicked,!t.clicked)),o(),P(" ",t.post().likecount," ")}}var x=class e{post=f.required();baseUrl=_.baseUrl;clicked=!1;static \u0275fac=function(t){return new(t||e)};static \u0275cmp=C({type:e,selectors:[["app-post"]],inputs:{post:[1,"post"]},standalone:!0,features:[g],decls:1,vars:1,consts:[[1,"username"],[1,"date"],[3,"routerLink"],[1,"action"],[1,"bi","bi-chat","pointer"],[1,"bi","pointer",3,"click","ngClass"],[1,"bi","bi-repeat"],[1,"bi","bi-bar-chart"],[1,"bi","bi-bookmark"],["preload","none","controls","",3,"src"],["loading","lazy",3,"src"]],template:function(t,c){t&1&&m(0,q,27,16,"article"),t&2&&d(c.post()?0:-1)},dependencies:[$,j,D],styles:["article[_ngcontent-%COMP%]{border:1px solid rgb(46,64,82);border-radius:2px;padding:8px;margin:8px 0}span[_ngcontent-%COMP%]{font-weight:800}span.date[_ngcontent-%COMP%]{font-weight:100;font-size:12px}span.username[_ngcontent-%COMP%]{font-weight:100}p[_ngcontent-%COMP%]{color:#fff;word-wrap:break-word}.action[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin:24px 0 0;font-style:normal}.action[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-style:normal;font-weight:100!important;margin-right:4px}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{display:block;max-width:80%;margin:auto}"]})};var G=(e,n)=>n.id;function J(e,n){e&1&&(r(0,"div",1)(1,"div"),s(2,"|"),i()())}function K(e,n){if(e&1&&(a(0,"app-post",0),m(1,J,3,0,"div",1)),e&2){let t=n.$implicit,c=l();p("post",t),o(),d(c.showSeperator()?1:-1)}}var L=class e{list=f();username;showSeperator=f();constructor(){}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=C({type:e,selectors:[["app-postlist"]],inputs:{list:[1,"list"],showSeperator:[1,"showSeperator"]},standalone:!0,features:[g],decls:2,vars:0,consts:[[3,"post"],[1,"seperator"]],template:function(t,c){t&1&&U(0,K,2,2,null,null,G),t&2&&M(c.list())},dependencies:[x],styles:[".seperator[_ngcontent-%COMP%]{display:flex;justify-content:center}"]})};var z=class e{constructor(n){this.http=n}mainCache={post:[],pageno:0};postSuccessSubject=new h;baseUrl=_.baseUrl;getAllPosts(){return this.http.get(this.baseUrl+"/server/posts/"+this.mainCache.pageno)}getAllUserPosts(n){return this.http.get(`${this.baseUrl}/server/${n}/posts`)}getUserPostById(n,t){return this.http.get(`${this.baseUrl}/server/${n}/post/${t}`)}addNewPost(n){let t=new FormData;return t.append("content",n.content),t.append("id",n.id.toString()),t.append("parentpostid",n.parentpostid?.toString()??""),n.file&&t.append("file",n.file),this.http.post(this.baseUrl+"/server/post",t)}static \u0275fac=function(t){return new(t||e)(S(N))};static \u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"})};export{x as a,L as b,z as c};
