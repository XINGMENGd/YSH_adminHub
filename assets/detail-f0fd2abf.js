import{h as Te,aX as Y,k as fe,d as j,av as Ae,aw as Oe,aq as O,aG as he,as as we,t as w,r as y,x as ve,an as me,X as Ne,H as pe,ai as ae,o as f,Z as W,e as c,w as I,au as _e,a3 as l,ax as ke,aM as Ie,F as u,c as C,D as V,a1 as D,a2 as g,az as Ce,aA as Le,aB as ze,a5 as ge,m as de,aI as Ee,aY as be,bo as ye,bp as Be,bq as De,bi as Ve,br as Fe,aQ as Pe,y as ue,T as Se,N as $e,G as a,a0 as ce,R as se,bs as Me,bt as He,bu as Xe,aO as Ye,$ as qe,bv as We,bw as je,aj as Re,aW as q,b7 as X,bx as Ue,by as Ze,bz as Ge,a_ as Ke,q as Qe,bA as Je,bB as xe,bC as et,bD as tt,_ as at}from"./index-c83e4276.js";import{d as st}from"./debounce-cdf69191.js";import{b as lt,c as ot,u as nt}from"./use-dialog-1ad06177.js";var rt="Expected a function";function ie(e,d,n){var s=!0,b=!0;if(typeof e!="function")throw new TypeError(rt);return Te(n)&&(s="leading"in n?!!n.leading:s,b="trailing"in n?!!n.trailing:b),st(e,d,{leading:s,maxWait:d,trailing:b})}const it=(e,d)=>{if(!Y||!e||!d)return!1;const n=e.getBoundingClientRect();let s;return d instanceof Element?s=d.getBoundingClientRect():s={top:0,right:window.innerWidth,bottom:window.innerHeight,left:0},n.top<s.bottom&&n.bottom>s.top&&n.right>s.left&&n.left<s.right},dt=fe({...lt,direction:{type:String,default:"rtl",values:["ltr","rtl","ttb","btt"]},size:{type:[String,Number],default:"30%"},withHeader:{type:Boolean,default:!0},modalFade:{type:Boolean,default:!0}}),ut=ot,ct=j({name:"ElDrawer",components:{ElOverlay:Ae,ElFocusTrap:Oe,ElIcon:O,Close:he},inheritAttrs:!1,props:dt,emits:ut,setup(e,{slots:d}){we({scope:"el-drawer",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/drawer.html#slots"},w(()=>!!d.title)),we({scope:"el-drawer",from:"custom-class",replacement:"class",version:"2.3.0",ref:"https://element-plus.org/en-US/component/drawer.html#attributes",type:"Attribute"},w(()=>!!e.customClass));const n=y(),s=y(),b=ve("drawer"),{t:h}=me(),r=w(()=>e.direction==="rtl"||e.direction==="ltr"),$=w(()=>Ne(e.size));return{...nt(e,n),drawerRef:n,focusStartRef:s,isHorizontal:r,drawerSize:$,ns:b,t:h}}}),ft=["aria-label","aria-labelledby","aria-describedby"],vt=["id"],mt=["aria-label"],pt=["id"];function gt(e,d,n,s,b,h){const r=ae("close"),$=ae("el-icon"),E=ae("el-focus-trap"),m=ae("el-overlay");return f(),W(ze,{to:"body",disabled:!e.appendToBody},[c(Le,{name:e.ns.b("fade"),onAfterEnter:e.afterEnter,onAfterLeave:e.afterLeave,onBeforeLeave:e.beforeLeave,persisted:""},{default:I(()=>[_e(c(m,{mask:e.modal,"overlay-class":e.modalClass,"z-index":e.zIndex,onClick:e.onModalClick},{default:I(()=>[c(E,{loop:"",trapped:e.visible,"focus-trap-el":e.drawerRef,"focus-start-el":e.focusStartRef,onReleaseRequested:e.onCloseRequested},{default:I(()=>[l("div",ke({ref:"drawerRef","aria-modal":"true","aria-label":e.title||void 0,"aria-labelledby":e.title?void 0:e.titleId,"aria-describedby":e.bodyId},e.$attrs,{class:[e.ns.b(),e.direction,e.visible&&"open",e.customClass],style:e.isHorizontal?"width: "+e.drawerSize:"height: "+e.drawerSize,role:"dialog",onClick:d[1]||(d[1]=Ie(()=>{},["stop"]))}),[l("span",{ref:"focusStartRef",class:u(e.ns.e("sr-focus")),tabindex:"-1"},null,2),e.withHeader?(f(),C("header",{key:0,class:u(e.ns.e("header"))},[e.$slots.title?V(e.$slots,"title",{key:1},()=>[g(" DEPRECATED SLOT ")]):V(e.$slots,"header",{key:0,close:e.handleClose,titleId:e.titleId,titleClass:e.ns.e("title")},()=>[e.$slots.title?g("v-if",!0):(f(),C("span",{key:0,id:e.titleId,role:"heading",class:u(e.ns.e("title"))},D(e.title),11,vt))]),e.showClose?(f(),C("button",{key:2,"aria-label":e.t("el.drawer.close"),class:u(e.ns.e("close-btn")),type:"button",onClick:d[0]||(d[0]=(..._)=>e.handleClose&&e.handleClose(..._))},[c($,{class:u(e.ns.e("close"))},{default:I(()=>[c(r)]),_:1},8,["class"])],10,mt)):g("v-if",!0)],2)):g("v-if",!0),e.rendered?(f(),C("div",{key:1,id:e.bodyId,class:u(e.ns.e("body"))},[V(e.$slots,"default")],10,pt)):g("v-if",!0),e.$slots.footer?(f(),C("div",{key:2,class:u(e.ns.e("footer"))},[V(e.$slots,"footer")],2)):g("v-if",!0)],16,ft)]),_:3},8,["trapped","focus-trap-el","focus-start-el","onReleaseRequested"])]),_:3},8,["mask","overlay-class","z-index","onClick"]),[[Ce,e.visible]])]),_:3},8,["name","onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"])}var bt=pe(ct,[["render",gt],["__file","/home/runner/work/element-plus/element-plus/packages/components/drawer/src/drawer.vue"]]);const wt=ge(bt),yt=fe({urlList:{type:de(Array),default:()=>Ee([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:{type:Boolean,default:!1},teleported:{type:Boolean,default:!1},closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2}}),ht={close:()=>!0,switch:e=>be(e)},_t=["src"],kt=j({name:"ElImageViewer"}),It=j({...kt,props:yt,emits:ht,setup(e,{expose:d,emit:n}){const s=e,b={CONTAIN:{name:"contain",icon:ye(Be)},ORIGINAL:{name:"original",icon:ye(De)}},{t:h}=me(),r=ve("image-viewer"),{nextZIndex:$}=Ve(),E=y(),m=y([]),_=Fe(),L=y(!0),k=y(s.initialIndex),p=Pe(b.CONTAIN),v=y({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),N=w(()=>{const{urlList:t}=s;return t.length<=1}),B=w(()=>k.value===0),P=w(()=>k.value===s.urlList.length-1),le=w(()=>s.urlList[k.value]),U=w(()=>{const{scale:t,deg:o,offsetX:i,offsetY:z,enableTransition:T}=v.value;let S=i/t,A=z/t;switch(o%360){case 90:case-270:[S,A]=[A,-S];break;case 180:case-180:[S,A]=[-S,-A];break;case 270:case-90:[S,A]=[-A,S];break}const H={transform:`scale(${t}) rotate(${o}deg) translate(${S}px, ${A}px)`,transition:T?"transform .3s":""};return p.value.name===b.CONTAIN.name&&(H.maxWidth=H.maxHeight="100%"),H}),oe=w(()=>be(s.zIndex)?s.zIndex:$());function M(){ne(),n("close")}function Z(){const t=ie(i=>{switch(i.code){case X.esc:s.closeOnPressEscape&&M();break;case X.space:K();break;case X.left:ee();break;case X.up:R("zoomIn");break;case X.right:te();break;case X.down:R("zoomOut");break}}),o=ie(i=>{const z=i.deltaY||i.deltaX;R(z<0?"zoomIn":"zoomOut",{zoomRate:s.zoomRate,enableTransition:!1})});_.run(()=>{q(document,"keydown",t),q(document,"wheel",o)})}function ne(){_.stop()}function re(){L.value=!1}function J(t){L.value=!1,t.target.alt=h("el.image.error")}function x(t){if(L.value||t.button!==0||!E.value)return;v.value.enableTransition=!1;const{offsetX:o,offsetY:i}=v.value,z=t.pageX,T=t.pageY,S=ie(H=>{v.value={...v.value,offsetX:o+H.pageX-z,offsetY:i+H.pageY-T}}),A=q(document,"mousemove",S);q(document,"mouseup",()=>{A()}),t.preventDefault()}function G(){v.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function K(){if(L.value)return;const t=Ue(b),o=Object.values(b),i=p.value.name,T=(o.findIndex(S=>S.name===i)+1)%t.length;p.value=b[t[T]],G()}function Q(t){const o=s.urlList.length;k.value=(t+o)%o}function ee(){B.value&&!s.infinite||Q(k.value-1)}function te(){P.value&&!s.infinite||Q(k.value+1)}function R(t,o={}){if(L.value)return;const{zoomRate:i,rotateDeg:z,enableTransition:T}={zoomRate:s.zoomRate,rotateDeg:90,enableTransition:!0,...o};switch(t){case"zoomOut":v.value.scale>.2&&(v.value.scale=Number.parseFloat((v.value.scale/i).toFixed(3)));break;case"zoomIn":v.value.scale<7&&(v.value.scale=Number.parseFloat((v.value.scale*i).toFixed(3)));break;case"clockwise":v.value.deg+=z;break;case"anticlockwise":v.value.deg-=z;break}v.value.enableTransition=T}return ue(le,()=>{Se(()=>{const t=m.value[0];t!=null&&t.complete||(L.value=!0)})}),ue(k,t=>{G(),n("switch",t)}),$e(()=>{var t,o;Z(),(o=(t=E.value)==null?void 0:t.focus)==null||o.call(t)}),d({setActiveItem:Q}),(t,o)=>(f(),W(ze,{to:"body",disabled:!t.teleported},[c(Le,{name:"viewer-fade",appear:""},{default:I(()=>[l("div",{ref_key:"wrapper",ref:E,tabindex:-1,class:u(a(r).e("wrapper")),style:ce({zIndex:a(oe)})},[l("div",{class:u(a(r).e("mask")),onClick:o[0]||(o[0]=Ie(i=>t.hideOnClickModal&&M(),["self"]))},null,2),g(" CLOSE "),l("span",{class:u([a(r).e("btn"),a(r).e("close")]),onClick:M},[c(a(O),null,{default:I(()=>[c(a(he))]),_:1})],2),g(" ARROW "),a(N)?g("v-if",!0):(f(),C(se,{key:0},[l("span",{class:u([a(r).e("btn"),a(r).e("prev"),a(r).is("disabled",!t.infinite&&a(B))]),onClick:ee},[c(a(O),null,{default:I(()=>[c(a(Me))]),_:1})],2),l("span",{class:u([a(r).e("btn"),a(r).e("next"),a(r).is("disabled",!t.infinite&&a(P))]),onClick:te},[c(a(O),null,{default:I(()=>[c(a(He))]),_:1})],2)],64)),g(" ACTIONS "),l("div",{class:u([a(r).e("btn"),a(r).e("actions")])},[l("div",{class:u(a(r).e("actions__inner"))},[c(a(O),{onClick:o[1]||(o[1]=i=>R("zoomOut"))},{default:I(()=>[c(a(Xe))]),_:1}),c(a(O),{onClick:o[2]||(o[2]=i=>R("zoomIn"))},{default:I(()=>[c(a(Ye))]),_:1}),l("i",{class:u(a(r).e("actions__divider"))},null,2),c(a(O),{onClick:K},{default:I(()=>[(f(),W(qe(a(p).icon)))]),_:1}),l("i",{class:u(a(r).e("actions__divider"))},null,2),c(a(O),{onClick:o[3]||(o[3]=i=>R("anticlockwise"))},{default:I(()=>[c(a(We))]),_:1}),c(a(O),{onClick:o[4]||(o[4]=i=>R("clockwise"))},{default:I(()=>[c(a(je))]),_:1})],2)],2),g(" CANVAS "),l("div",{class:u(a(r).e("canvas"))},[(f(!0),C(se,null,Re(t.urlList,(i,z)=>_e((f(),C("img",{ref_for:!0,ref:T=>m.value[z]=T,key:i,src:i,style:ce(a(U)),class:u(a(r).e("img")),onLoad:re,onError:J,onMousedown:x},null,46,_t)),[[Ce,z===k.value]])),128))],2),V(t.$slots,"default")],6)]),_:3})],8,["disabled"]))}});var Ct=pe(It,[["__file","/home/runner/work/element-plus/element-plus/packages/components/image-viewer/src/image-viewer.vue"]]);const Lt=ge(Ct),zt=fe({hideOnClickModal:{type:Boolean,default:!1},src:{type:String,default:""},fit:{type:String,values:["","contain","cover","fill","none","scale-down"],default:""},loading:{type:String,values:["eager","lazy"]},lazy:{type:Boolean,default:!1},scrollContainer:{type:de([String,Object])},previewSrcList:{type:de(Array),default:()=>Ee([])},previewTeleported:{type:Boolean,default:!1},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2}}),Et={load:e=>e instanceof Event,error:e=>e instanceof Event,switch:e=>be(e),close:()=>!0,show:()=>!0},St=["src","loading"],$t={key:0},Rt=j({name:"ElImage",inheritAttrs:!1}),Tt=j({...Rt,props:zt,emits:Et,setup(e,{emit:d}){const n=e;let s="";const{t:b}=me(),h=ve("image"),r=Ze(),$=Ge(),E=y(),m=y(!1),_=y(!0),L=y(!1),k=y(),p=y(),v=Y&&"loading"in HTMLImageElement.prototype;let N,B;const P=w(()=>r.style),le=w(()=>{const{fit:t}=n;return Y&&t?{objectFit:t}:{}}),U=w(()=>{const{previewSrcList:t}=n;return Array.isArray(t)&&t.length>0}),oe=w(()=>{const{previewSrcList:t,initialIndex:o}=n;let i=o;return o>t.length-1&&(i=0),i}),M=w(()=>n.loading==="eager"?!1:!v&&n.loading==="lazy"||n.lazy),Z=()=>{Y&&(_.value=!0,m.value=!1,E.value=n.src)};function ne(t){_.value=!1,m.value=!1,d("load",t)}function re(t){_.value=!1,m.value=!0,d("error",t)}function J(){it(k.value,p.value)&&(Z(),K())}const x=xe(J,200);async function G(){var t;if(!Y)return;await Se();const{scrollContainer:o}=n;Ke(o)?p.value=o:Qe(o)&&o!==""?p.value=(t=document.querySelector(o))!=null?t:void 0:k.value&&(p.value=Je(k.value)),p.value&&(N=q(p,"scroll",x),setTimeout(()=>J(),100))}function K(){!Y||!p.value||!x||(N==null||N(),p.value=void 0)}function Q(t){if(t.ctrlKey){if(t.deltaY<0)return t.preventDefault(),!1;if(t.deltaY>0)return t.preventDefault(),!1}}function ee(){U.value&&(B=q("wheel",Q,{passive:!1}),s=document.body.style.overflow,document.body.style.overflow="hidden",L.value=!0,d("show"))}function te(){B==null||B(),document.body.style.overflow=s,L.value=!1,d("close")}function R(t){d("switch",t)}return ue(()=>n.src,()=>{M.value?(_.value=!0,m.value=!1,K(),G()):Z()}),$e(()=>{M.value?G():Z()}),(t,o)=>(f(),C("div",{ref_key:"container",ref:k,class:u([a(h).b(),t.$attrs.class]),style:ce(a(P))},[E.value!==void 0&&!m.value?(f(),C("img",ke({key:0},a($),{src:E.value,loading:t.loading,style:a(le),class:[a(h).e("inner"),a(U)&&a(h).e("preview"),_.value&&a(h).is("loading")],onClick:ee,onLoad:ne,onError:re}),null,16,St)):g("v-if",!0),_.value||m.value?(f(),C("div",{key:1,class:u(a(h).e("wrapper"))},[_.value?V(t.$slots,"placeholder",{key:0},()=>[l("div",{class:u(a(h).e("placeholder"))},null,2)]):m.value?V(t.$slots,"error",{key:1},()=>[l("div",{class:u(a(h).e("error"))},D(a(b)("el.image.error")),3)]):g("v-if",!0)],2)):g("v-if",!0),a(U)?(f(),C(se,{key:2},[L.value?(f(),W(a(Lt),{key:0,"z-index":t.zIndex,"initial-index":a(oe),infinite:t.infinite,"zoom-rate":t.zoomRate,"url-list":t.previewSrcList,"hide-on-click-modal":t.hideOnClickModal,teleported:t.previewTeleported,"close-on-press-escape":t.closeOnPressEscape,onClose:te,onSwitch:R},{default:I(()=>[t.$slots.viewer?(f(),C("div",$t,[V(t.$slots,"viewer")])):g("v-if",!0)]),_:3},8,["z-index","initial-index","infinite","zoom-rate","url-list","hide-on-click-modal","teleported","close-on-press-escape"])):g("v-if",!0)],64)):g("v-if",!0)],6))}});var At=pe(Tt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/image/src/image.vue"]]);const Ot=ge(At);const F=e=>(et("data-v-513de69b"),e=e(),tt(),e),Nt={class:"detailItem"},Bt=F(()=>l("label",{for:"Name",class:"itemLabel"},"商品名称:",-1)),Dt={class:"detailItem"},Vt=F(()=>l("label",{for:"Description",class:"itemLabel"},"商品描述:",-1)),Ft={class:"detailItem"},Pt=F(()=>l("label",{for:"Price",class:"itemLabel"},"商品价格:",-1)),Mt={class:"detailItem"},Ht=F(()=>l("label",{for:"Stock",class:"itemLabel"},"商品库存:",-1)),Xt={class:"detailItem"},Yt=F(()=>l("label",{for:"Category",class:"itemLabel"},"商品分类:",-1)),qt={class:"detailItem"},Wt=F(()=>l("label",{for:"Status",class:"itemLabel"},"商品状态:",-1)),jt={class:"detailItem"},Ut=F(()=>l("label",{for:"ImageArray",class:"itemLabel"},"商品图:",-1)),Zt={class:"ItemImagesBox"},Gt={key:0,class:"detailItem"},Kt=F(()=>l("label",{for:"ImageArray",class:"itemLabel"},"商品视频:",-1)),Qt={class:"productVideoBox"},Jt=["src"],xt=j({__name:"detail",props:{productCategoryList:null,productStatusList:null},setup(e,{expose:d}){const n=y(!1),s=y({name:"",description:"",price:1,stock:1,category:0,imageFiles:[],videoFiles:[],status:0,seller_id:0,created_at:""}),b=w(()=>s.value.imageFiles.map(m=>m.name)),h=y();function r(m){s.value=m,n.value=!0}function $(){try{h.value.pause()}catch(m){console.log(m)}}function E(){console.log("videoPause")}return d({showDrawer:r}),(m,_)=>{const L=Ot,k=wt;return f(),W(k,{modelValue:n.value,"onUpdate:modelValue":_[0]||(_[0]=p=>n.value=p),title:"商品详情",class:"common-drawer",onClosed:$},{default:I(()=>{var p,v,N;return[l("div",Nt,[Bt,l("span",null,D(s.value.name),1)]),l("div",Dt,[Vt,l("span",null,D(s.value.description),1)]),l("div",Ft,[Pt,l("span",null,D(s.value.price),1)]),l("div",Mt,[Ht,l("span",null,D(s.value.stock),1)]),l("div",Xt,[Yt,l("span",null,D(((p=e.productCategoryList[s.value.category])==null?void 0:p.label)||"暂无数据"),1)]),l("div",qt,[Wt,l("span",null,D(((v=e.productStatusList[s.value.status])==null?void 0:v.label)||"暂无数据"),1)]),l("div",jt,[Ut,l("div",Zt,[(f(!0),C(se,null,Re(s.value.imageFiles,(B,P)=>(f(),W(L,{class:"ItemImages",src:B.name,"preview-src-list":a(b),"initial-index":P,fit:"scale-down","hide-on-click-modal":""},null,8,["src","preview-src-list","initial-index"]))),256))])]),s.value.videoFiles.length>0?(f(),C("div",Gt,[Kt,l("div",Qt,[l("video",{class:"productVideo",ref_key:"videoRef",ref:h,src:(N=s.value.videoFiles[0])==null?void 0:N.name,controls:"",onPause:E},null,40,Jt)])])):g("",!0)]}),_:1},8,["modelValue"])}}});const sa=at(xt,[["__scopeId","data-v-513de69b"]]);export{sa as default};
