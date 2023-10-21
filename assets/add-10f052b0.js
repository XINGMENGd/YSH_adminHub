import{d as J,L as K,r as b,a as Q,ai as X,o as F,c as V,e as r,w as n,a3 as M,f as x,R as k,aj as N,Z as B,ak as D,al as y,E as U,b as ee}from"./index-c83e4276.js";import{E as le,a as te,u as ae,r as I,h as _,d as oe,c as ie}from"./uploadVideo-cef5b295.js";import{E as se,a as re}from"./el-form-item-43ee05c9.js";import{E as ne,a as ue}from"./el-select-56d3c614.js";import"./use-dialog-1ad06177.js";import"./_initCloneObject-b64fad8c.js";import"./debounce-cdf69191.js";const de={class:"dialog-footer"},me=["src"],be=J({__name:"add",props:{productCategoryList:null,productStatusList:null},emits:["getProductList"],setup(A,{expose:q,emit:R}){const{id:P}=K().GET_userInfo,g="90px",E=b(),h=b(!1),w=b(!1),z=b(""),l=b({description:"",price:1,stock:1,category:"",status:"",imageFileArray:[],imageFiles:[],videoFileArray:[],videoFiles:[],seller_id:P,created_at:""}),Y=Q({description:[{required:!0,message:"Please input Description",trigger:"blur"}],price:[{required:!0,message:"Please input price",trigger:"blur"}],stock:[{required:!0,message:"Stock minimum 1",trigger:"blur"}],category:[],status:[],imageFileArray:[],videoFileArray:[]}),f=5*1024*1024,j=500*1024*1024;function T(){h.value=!0}function C(){l.value={description:"",price:1,stock:1,category:"",status:"",imageFileArray:[],imageFiles:[],videoFileArray:[],videoFiles:[],seller_id:P,created_at:""}}async function S(t){const e=l.value.imageFiles.concat(l.value.videoFiles);e.length>0&&await I({deleteFiles:e}).then(i=>{console.log(i)}).catch(i=>{console.log(i)}),C();try{t()}catch(i){console.log(i),h.value=!1}}function H(t){if(!t.type.includes("image"))return D.error("请选择正确的图片格式"),!1}function $(t){return new Promise((e,i)=>{t.size>j?(D.error("最大上传文件大小为500MB"),i("最大上传文件大小为500MB")):e(!0)})}async function G(t){const e=t.file||t,i=e.size,o=e.name.split("."),s=o[o.length-1];if(i<=f){const u=await _(e);y.upload("/uploadFile",e,{name:u+"."+s,type:e.type});const c={originalName:e.name,name:u+"."+s,type:e.type};l.value.imageFiles.push(c)}else{const u=[],c=Math.ceil(i/f),v=File.prototype.slice,m=await _(e).catch(d=>{console.error(d)});for(let d=0;d<c;d++){const p=d*f,a=Math.min(e.size,p+f);u.push(y.upload("/uploadChunks",v.call(e,p,a),{hash:m,index:d,type:e.type}))}Promise.all(u).then(d=>{y.post("/mergeChunks",{name:m+"."+s,hash:m,total:c,type:e.type});const p={originalName:e.name,name:m+"."+s,type:e.type};l.value.imageFiles.push(p)})}}async function O(t){const e=t.size,i=t.name.split("."),o=i[i.length-1];if(e<=f){const s=await _(t);y.upload("/uploadFile",t,{name:s+"."+o,type:t.type});const u={originalName:t.name,name:s+"."+o,type:t.type};l.value.videoFiles.push(u)}else{const s=[],u=Math.ceil(e/f),c=File.prototype.slice,v=await _(t).catch(m=>{console.error(m)});for(let m=0;m<u;m++){const d=m*f,p=Math.min(t.size,d+f);s.push(y.upload("/uploadChunks",c.call(t,d,p),{hash:v,index:m,type:t.type}))}Promise.all(s).then(m=>{y.post("/mergeChunks",{name:v+"."+o,hash:v,total:u,type:t.type});const d={originalName:t.name,name:v+"."+o,type:t.type};l.value.videoFiles.push(d)})}}function W(t){z.value=t.url,w.value=!0}async function L(t){const e=t.raw||t,i=e.type;let o=[];i.includes("image")?(o=l.value.imageFiles.filter(s=>s.originalName==e.name),l.value.imageFiles=l.value.imageFiles.filter(s=>s.originalName!==e.name)):i.includes("video")&&(o=l.value.videoFiles.filter(s=>s.originalName==e.name),l.value.videoFiles=l.value.videoFiles.filter(s=>s.originalName!==e.name)),I({deleteFiles:o}).then(s=>{const u=l.value.videoFileArray.filter(c=>c.name!==e.name);l.value.videoFileArray=u})}async function Z(t){t&&await t.validate((e,i)=>{if(e)l.value.created_at=oe().format("YYYY-MM-DD HH:mm:ss"),ie(l.value).then(o=>{h.value=!1,C(),R("getProductList")}).catch(o=>{console.log(o)});else return console.log("error submit!",i),!1})}return q({showDialog:T}),(t,e)=>{const i=U,o=se,s=ne,u=ue,c=X("Plus"),v=le,m=re,d=ee,p=te;return F(),V(k,null,[r(p,{modelValue:h.value,"onUpdate:modelValue":e[9]||(e[9]=a=>h.value=a),title:"新增商品",top:"5vh","before-close":S},{footer:n(()=>[M("span",de,[r(d,{onClick:S},{default:n(()=>[x("取消")]),_:1}),r(d,{type:"primary",onClick:e[8]||(e[8]=a=>Z(E.value))},{default:n(()=>[x("提交")]),_:1})])]),default:n(()=>[r(m,{model:l.value,ref_key:"formRef",ref:E,rules:Y},{default:n(()=>[r(o,{label:"商品描述",prop:"description","label-width":g},{default:n(()=>[r(i,{modelValue:l.value.description,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value.description=a),autocomplete:"off"},null,8,["modelValue"])]),_:1}),r(o,{label:"商品价格",prop:"price","label-width":g},{default:n(()=>[r(i,{modelValue:l.value.price,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.price=a),onBlur:e[2]||(e[2]=a=>l.value.price=l.value.price*1),autocomplete:"off"},null,8,["modelValue"])]),_:1}),r(o,{label:"商品库存",prop:"stock","label-width":g},{default:n(()=>[r(i,{modelValue:l.value.stock,"onUpdate:modelValue":e[3]||(e[3]=a=>l.value.stock=a),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])]),_:1}),r(o,{label:"商品分类",prop:"category","label-width":g},{default:n(()=>[r(u,{modelValue:l.value.category,"onUpdate:modelValue":e[4]||(e[4]=a=>l.value.category=a),modelModifiers:{number:!0},class:"m-2",placeholder:"请选择商品类型",size:"default"},{default:n(()=>[(F(!0),V(k,null,N(A.productCategoryList,a=>(F(),B(s,{key:a.value,label:a.label,value:a.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),r(o,{label:"商品状态",prop:"status","label-width":g},{default:n(()=>[r(u,{modelValue:l.value.status,"onUpdate:modelValue":e[5]||(e[5]=a=>l.value.status=a),modelModifiers:{number:!0},class:"m-2",placeholder:"请选择商品状态",size:"default"},{default:n(()=>[(F(!0),V(k,null,N(A.productStatusList,a=>(F(),B(s,{key:a.value,label:a.label,value:a.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),r(o,{label:"商品图片",prop:"imageFileArray","label-width":g},{default:n(()=>[r(v,{"file-list":l.value.imageFileArray,"onUpdate:fileList":e[6]||(e[6]=a=>l.value.imageFileArray=a),"list-type":"picture-card",accept:"image/*",limit:9,"before-upload":H,"http-request":G,"on-preview":W,"on-remove":L},{default:n(()=>[r(c,{style:{width:"2em",height:"2em"}})]),_:1},8,["file-list"])]),_:1}),r(o,{label:"商品视频",prop:"videoFileArray","label-width":g},{default:n(()=>[r(ae,{"file-list":l.value.videoFileArray,"onUpdate:fileList":e[7]||(e[7]=a=>l.value.videoFileArray=a),limit:1,"http-request":O,"before-upload":$,"on-remove":L},null,8,["file-list"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"]),r(p,{modelValue:w.value,"onUpdate:modelValue":e[10]||(e[10]=a=>w.value=a),width:"60%",top:"5vh"},{default:n(()=>[M("img",{style:{"object-fit":"scale-down",width:"100%",height:"100%"},src:z.value,alt:"Preview Image"},null,8,me)]),_:1},8,["modelValue"])],64)}}});export{be as default};
