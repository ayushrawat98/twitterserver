import{a as Q}from"./chunk-SKE27VCB.js";import{$ as M,B as d,C as f,G as S,H as F,J as I,N as a,O as s,P as D,Q as O,R as l,T as C,U as v,V as _,W as x,X as c,Y as V,Z as k,c as b,da as R,h as y,na as j,p as T,r as w,t as u,u as p,x as m,y as E,z as P}from"./chunk-P2ZFRGZW.js";var h=class o{constructor(e){this.el=e}countChange=m();onInput(){let e=this.el.nativeElement.value.length;this.countChange.emit(e)}static \u0275fac=function(n){return new(n||o)(f(P))};static \u0275dir=w({type:o,selectors:[["","appCharactercounter",""]],hostBindings:function(n,t){n&1&&l("input",function(){return t.onInput()})},outputs:{countChange:"countChange"},standalone:!0})};var z=["comment"],A=["fileinput"],B=(o,e,n)=>({green:o,orange:e,red:n});function N(o,e){o&1&&D(0,"br")(1,"progress",6)}var H=class o{constructor(e){this._postService=e}charCount=255;placeholderText=E();sendText=m();choosenFile;textbox;fileinput;showProgress=!1;destroy$=new b;ngOnInit(){this._postService.postSuccessSubject.pipe(y(this.destroy$)).subscribe({next:e=>{e==1?(this.textbox.nativeElement.value="",this.fileinput.nativeElement.value="",this.choosenFile=null,this.showProgress=!1,this.charCount=255):e==-1&&(this.showProgress=!1)}})}updateCount(e){this.charCount=255-e}add(e){this.sendText.emit({content:e,file:this.choosenFile,parentpostid:null}),this.showProgress=!0}setFile(e){let n=e.target;n?.files?.length?this.choosenFile=n.files[0]:this.choosenFile=null}ngOnDestroy(){this.destroy$.next("End"),this.destroy$.complete()}static \u0275fac=function(n){return new(n||o)(f(Q))};static \u0275cmp=T({type:o,selectors:[["app-textarea"]],viewQuery:function(n,t){if(n&1&&(C(z,5),C(A,5)),n&2){let i;v(i=_())&&(t.textbox=i.first),v(i=_())&&(t.fileinput=i.first)}},inputs:{placeholderText:[1,"placeholderText"]},outputs:{sendText:"sendText"},standalone:!0,features:[M],decls:15,vars:9,consts:[["comment",""],["fileinput",""],["rows","5","appCharactercounter","",3,"countChange","placeholder","ngClass"],["type","file","accept","image/jpeg,image/png,image/jpg,image/gif,video/mp4,video/webm","hidden","",2,"margin-left","auto",3,"change"],[3,"click"],[1,"filename"],["aria-busy","true"]],template:function(n,t){if(n&1){let i=O();a(0,"textarea",2,0),l("countChange",function(r){return u(i),p(t.updateCount(r))}),s(),a(2,"div"),c(3),a(4,"input",3,1),l("change",function(r){return u(i),p(t.setFile(r))}),s(),a(6,"button",4),l("click",function(){u(i);let r=x(5);return p(r.click())}),c(7,"Upload"),s(),c(8," \xA0 "),a(9,"span",5),c(10),s(),c(11," \xA0 "),a(12,"button",4),l("click",function(){u(i);let r=x(1);return p(t.add(r.value))}),c(13,"Post"),s(),S(14,N,2,0),s()}n&2&&(F("placeholder",t.placeholderText())("ngClass",R(5,B,t.charCount>=160,t.charCount<160&&t.charCount>=60,t.charCount<60)),d(3),k(" ",t.charCount," \xA0 "),d(7),V(t.choosenFile?t.choosenFile.name:""),d(4),I(t.showProgress?14:-1))},dependencies:[h,j],styles:["textarea[_ngcontent-%COMP%]{margin:8px 0;width:100%;font-size:16px;padding:8px;border-radius:2px;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;resize:none;background-color:transparent;color:#f5f5f5;border-color:#2e4052}textarea[_ngcontent-%COMP%]:focus-visible.green{outline:green;border-color:green}textarea[_ngcontent-%COMP%]:focus-visible.orange{border-color:orange;outline:orange}textarea[_ngcontent-%COMP%]:focus-visible.red{border-color:red;outline:red}.filename[_ngcontent-%COMP%]{font-size:12px}"]})};export{H as a};
