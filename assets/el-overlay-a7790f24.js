import{k as I,aT as L,l as U,aU as P,q as _,aV as $,U as b,r as c,aW as Z,aX as q,s as g,W,aY as G,x as D,R as X,M as Y,aZ as j,a_ as x,a$ as H}from"./index-d867e0c4.js";const J=I({center:{type:Boolean,default:!1},alignCenter:{type:Boolean,default:!1},closeIcon:{type:L},customClass:{type:String,default:""},draggable:{type:Boolean,default:!1},fullscreen:{type:Boolean,default:!1},showClose:{type:Boolean,default:!0},title:{type:String,default:""}}),R={close:()=>!0},ee=I({...J,appendToBody:{type:Boolean,default:!1},beforeClose:{type:U(Function)},destroyOnClose:{type:Boolean,default:!1},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:{type:Boolean,default:!1},modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:{type:Boolean,default:!1}}),le={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[P]:e=>_(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},oe=(e,n)=>{const o=j().emit,{nextZIndex:m}=$();let C="";const T=b(),F=b(),t=c(!1),f=c(!1),i=c(!1),d=c(e.zIndex||m());let s,u;const O=Z("namespace",q),E=g(()=>{const l={},a=`--${O.value}-dialog`;return e.fullscreen||(e.top&&(l[`${a}-margin-top`]=e.top),e.width&&(l[`${a}-width`]=W(e.width))),l}),h=g(()=>e.alignCenter?{display:"flex"}:{});function k(){o("opened")}function S(){o("closed"),o(P,!1),e.destroyOnClose&&(i.value=!1)}function A(){o("close")}function p(){u==null||u(),s==null||s(),e.openDelay&&e.openDelay>0?{stop:s}=x(()=>B(),e.openDelay):B()}function r(){s==null||s(),u==null||u(),e.closeDelay&&e.closeDelay>0?{stop:u}=x(()=>v(),e.closeDelay):v()}function y(){function l(a){a||(f.value=!0,t.value=!1)}e.beforeClose?e.beforeClose(l):r()}function w(){e.closeOnClickModal&&y()}function B(){H&&(t.value=!0)}function v(){t.value=!1}function M(){o("openAutoFocus")}function N(){o("closeAutoFocus")}function V(l){var a;((a=l.detail)==null?void 0:a.focusReason)==="pointer"&&l.preventDefault()}e.lockScroll&&G(t);function z(){e.closeOnPressEscape&&y()}return D(()=>e.modelValue,l=>{l?(f.value=!1,p(),i.value=!0,d.value=e.zIndex?d.value++:m(),X(()=>{o("open"),n.value&&(n.value.scrollTop=0)})):t.value&&r()}),D(()=>e.fullscreen,l=>{n.value&&(l?(C=n.value.style.transform,n.value.style.transform=""):n.value.style.transform=C)}),Y(()=>{e.modelValue&&(t.value=!0,i.value=!0,p())}),{afterEnter:k,afterLeave:S,beforeLeave:A,handleClose:y,onModalClick:w,close:r,doClose:v,onOpenAutoFocus:M,onCloseAutoFocus:N,onCloseRequested:z,onFocusoutPrevented:V,titleId:T,bodyId:F,closed:f,style:E,overlayDialogStyle:h,rendered:i,visible:t,zIndex:d}};export{R as a,ee as b,le as c,J as d,oe as u};
