import{$ as y,A as V,B as F,C as r,Ca as U,D as h,Da as q,H as f,I as m,K as C,L as z,M as j,N as p,O as a,P as d,Q as x,R as b,S as l,X as c,Y as v,Z as k,a as P,c as O,ca as M,ea as A,ga as $,ja as L,k as E,la as N,n as D,na as R,p as w,pa as B,ra as H,t as u,u as _,va as Y,x as S,y as g,za as Z}from"./chunk-FOPQGPOM.js";var I=class i{constructor(e){this.http=e}postSuccessSubject=new O;baseUrl=U.baseUrl;getAllPosts(e,t){return this.http.post(this.baseUrl+"/api/post/"+t,{id:e})}getAllUserPosts(e,t){return this.http.post(`${this.baseUrl}/api/${e}/post`,{id:t})}getUserPostById(e,t,o){return this.http.post(`${this.baseUrl}/api/${e}/post/${t}`,{id:o})}addNewPost(e){let t=new FormData;return t.append("content",e.content),t.append("parentpostid",e.parentpostid?.toString()??""),e.file&&t.append("file",e.file),this.http.post(this.baseUrl+"/api/post",t)}likePost(e,t,o){return this.http.post(this.baseUrl+"/api/post/like",{userid:e,postid:t,receiverid:o})}Repost(e,t,o){return this.http.post(this.baseUrl+"/api/post/repost",{userid:e,postid:t,receiverid:o})}Bookmark(e,t,o){return this.http.post(this.baseUrl+"/api/post/bookmark",{userid:e,postid:t,receiverid:o})}static \u0275fac=function(t){return new(t||i)(D(H))};static \u0275prov=E({token:i,factory:i.\u0275fac,providedIn:"root"})};var W=(i,e)=>({"bi-heart-fill red":i,"bi-heart":e}),X=(i,e)=>({green:i,"":e}),tt=(i,e)=>({"bi-bookmark-fill blue":i,"bi-bookmark":e});function et(i,e){if(i&1){let t=x();p(0,"button",7),b("click",function(n){u(t);let s=l(3);return s.showIframe=!0,_(n.stopPropagation())}),c(1,"Embed Video"),a()}}function it(i,e){if(i&1&&d(0,"iframe",11),i&2){let t=l(3);m("src",t.youtubeUrl(),F)}}function ot(i,e){if(i&1&&f(0,et,2,0,"button")(1,it,1,1,"iframe",11),i&2){let t=l(2);C(t.showIframe?1:0)}}function nt(i,e){if(i&1&&d(0,"video",12),i&2){let t=l(3);m("src",t.baseUrl+"/"+t.post().media,V)}}function rt(i,e){if(i&1&&d(0,"img",13),i&2){let t=l(3);m("src",t.baseUrl+"/"+t.post().media,V)}}function st(i,e){if(i&1&&f(0,nt,1,1,"video",12)(1,rt,1,1,"img",13),i&2){let t=l(2);C(t.post().mediatype=="video/mp4"||t.post().mediatype=="video/webm"?0:1)}}function at(i,e){if(i&1){let t=x();p(0,"article")(1,"aside"),d(2,"img",0),a(),p(3,"div",1)(4,"header")(5,"span"),c(6),a(),c(7," \xA0 "),p(8,"span",2),c(9),a(),c(10," \xA0 "),p(11,"span",3),c(12),A(13,"date"),a()(),p(14,"section",4)(15,"p"),c(16),a(),f(17,ot,2,1)(18,st,2,1),a(),p(19,"footer",5)(20,"div",4),d(21,"i",6),c(22),a(),p(23,"div",7),b("click",function(n){u(t);let s=l();return n.stopPropagation(),_(s.likeClicked.emit(s.post().id))}),d(24,"i",8),c(25),a(),p(26,"div",7),b("click",function(n){u(t);let s=l();return n.stopPropagation(),_(s.repostClicked.emit(s.post().id))}),d(27,"i",9),c(28),a(),p(29,"div"),d(30,"i",10),c(31),a(),p(32,"div",7),b("click",function(n){u(t);let s=l();return n.stopPropagation(),_(s.bookmarkClicked.emit(s.post().id))}),d(33,"i",8),c(34),a()()()()}if(i&2){let t=l();r(6),v(t.post().User.displayname),r(3),v("@"+t.post().User.username),r(3),v($(13,16,t.post().createdAt,"d/M/YY, h:mm a")),r(2),m("routerLink","/"+t.post().User.username+"/post/"+t.post().id),r(2),v(t.post().content),r(),C(t.youtubeUrl()?17:-1),r(),C(t.post().media?18:-1),r(2),m("routerLink","/"+t.post().User.username+"/post/"+t.post().id),r(2),k(" ",t.post().commentcount," "),r(2),m("ngClass",M(19,W,t.post().liked,!t.post().liked)),r(),k(" ",t.post().likecount," "),r(2),m("ngClass",M(22,X,t.post().reposted,!t.post().reposted)),r(),k(" ",t.post().repostcount," "),r(3),k(" ",t.post().views," "),r(2),m("ngClass",M(25,tt,t.post().bookmarked,!t.post().bookmarked)),r(),k(" ",t.post().bookmarkcount," ")}}var T=class i{constructor(e){this.sanitizer=e}post=g.required();youtubeUrl=L(()=>{if(this.post()){let e=/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[-a-zA-Z0-9_]{11,}(?!\S))\/)|(?:\S*v=|v\/)))([-a-zA-Z0-9_]{11,})/,t=this.post().content.match(e);return t&&t[1]?this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${t[1]}`):""}return""});baseUrl=U.baseUrl;showIframe=!1;likeClicked=S();repostClicked=S();bookmarkClicked=S();static \u0275fac=function(t){return new(t||i)(h(Y))};static \u0275cmp=w({type:i,selectors:[["app-post"]],inputs:{post:[1,"post"]},outputs:{likeClicked:"likeClicked",repostClicked:"repostClicked",bookmarkClicked:"bookmarkClicked"},standalone:!0,features:[y],decls:1,vars:1,consts:[["src","test.png","alt","profile pic thumbnail",1,"profile-thumbnail"],[1,"post"],[1,"username"],[1,"date"],[3,"routerLink"],[1,"action"],[1,"bi","bi-chat","pointer"],[3,"click"],[1,"bi","pointer",3,"ngClass"],[1,"bi","bi-repeat","pointer",3,"ngClass"],[1,"bi","bi-bar-chart"],["frameborder","0","allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture","loading","lazy","allowfullscreen","",2,"width","98%","height","280px",3,"src"],["preload","none","controls","",3,"src"],["loading","lazy",3,"src"]],template:function(t,o){t&1&&f(0,at,35,28,"article"),t&2&&C(o.post()?0:-1)},dependencies:[Z,B,R],styles:["article[_ngcontent-%COMP%]{border:1px solid rgb(46,64,82);border-radius:2px;padding:8px;margin:8px 0;display:flex;gap:8px;cursor:pointer}.post[_ngcontent-%COMP%]{flex:1;min-width:0}span[_ngcontent-%COMP%]{font-weight:800}span.date[_ngcontent-%COMP%]{font-weight:100;font-size:12px}span.username[_ngcontent-%COMP%]{font-weight:100}p[_ngcontent-%COMP%]{color:#fff;word-wrap:break-word;white-space:pre-wrap}.action[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin:24px 0 0;font-style:normal}.action[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-style:normal;font-weight:100!important;margin-right:4px}section[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], section[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{display:block;max-width:100%;margin:auto}.greenn[_ngcontent-%COMP%]{fill:green}.profile-thumbnail[_ngcontent-%COMP%]{height:40px;width:40px;border-radius:50%;object-fit:cover}"],changeDetection:0})};var lt=(i,e)=>e.id;function pt(i,e){i&1&&(p(0,"div",1)(1,"div"),c(2,"|"),a()())}function ct(i,e){if(i&1){let t=x();p(0,"app-post",0),b("likeClicked",function(n){u(t);let s=l();return _(s.likeClicked(n))})("repostClicked",function(n){u(t);let s=l();return _(s.repostClicked(n))})("bookmarkClicked",function(n){u(t);let s=l();return _(s.bookmarkClicked(n))}),a(),f(1,pt,3,0,"div",1)}if(i&2){let t=e.$implicit,o=l();m("post",t),r(),C(o.showSeperator()?1:-1)}}var J=class i{constructor(e,t){this._authService=e;this._postService=t;N(()=>{this.listMutable=this.list()})}list=g([]);listMutable;showSeperator=g();likeClicked(e){if(!this._authService.userdata()){alert("Login to continue");return}let t=this.listMutable.filter(o=>o.id==e)[0];this._postService.likePost(this._authService.userdata()?.id,t.id,t.UserId).subscribe({next:o=>{t.liked=!t.liked,t.liked?t.likecount++:t.likecount--,this.listMutable=this.listMutable.map(n=>n.id==t.id?P({},t):n)}})}repostClicked(e){debugger;if(!this._authService.userdata()){alert("Login to continue");return}let t=this.listMutable.filter(o=>o.id==e)[0];this._postService.Repost(this._authService.userdata()?.id,t.id,t.UserId).subscribe({next:o=>{t.reposted=!t.reposted,t.reposted?t.repostcount++:t.repostcount--,this.listMutable=this.listMutable.map(n=>n.id==t.id?P({},t):n)}})}bookmarkClicked(e){if(!this._authService.userdata()){alert("Login to continue");return}let t=this.listMutable.filter(o=>o.id==e)[0];this._postService.Bookmark(this._authService.userdata()?.id,t.id,t.UserId).subscribe({next:o=>{t.bookmarked=!t.bookmarked,t.bookmarked?t.bookmarkcount++:t.bookmarkcount--,this.listMutable=this.listMutable.map(n=>n.id==t.id?P({},t):n)}})}static \u0275fac=function(t){return new(t||i)(h(q),h(I))};static \u0275cmp=w({type:i,selectors:[["app-postlist"]],inputs:{list:[1,"list"],showSeperator:[1,"showSeperator"]},standalone:!0,features:[y],decls:2,vars:0,consts:[[3,"likeClicked","repostClicked","bookmarkClicked","post"],[1,"seperator"]],template:function(t,o){t&1&&z(0,ct,2,2,null,null,lt),t&2&&j(o.listMutable)},dependencies:[T],styles:[".seperator[_ngcontent-%COMP%]{display:flex;justify-content:center}"]})};export{I as a,J as b};
