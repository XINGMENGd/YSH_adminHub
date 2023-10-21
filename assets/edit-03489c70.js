import{d as X,L as Z,r as h,a as U,ah as ee,o as _,c as k,e as n,w as u,a2 as B,f as D,Q as A,ai as I,Y as q,aj as Y,ak as F,E as ae,b as le}from"./index-d867e0c4.js";import{E as te,a as oe,u as ie,h as w,r as se,d as ne,b as re}from"./uploadVideo-d1f473c8.js";import"./el-overlay-a7790f24.js";import{E as ue,a as me}from"./el-form-item-97d625d4.js";import"./el-input-0820bd96.js";import{E as de,a as pe}from"./el-select-e6daa1d0.js";import"./debounce-004b2222.js";const ce={class:"dialog-footer"},ve=["src"],we=X({__name:"edit",props:{productCategoryList:null,productStatusList:null},emits:["getProductList"],setup(P,{expose:j,emit:R}){const{id:E}=Z().GET_userInfo,g="90px",S=h(),b=h(!1),V=h(!1),z=h(""),c=/\/uploads\/(images|videos)\/(.+)/,C=h([]),N=h([]),l=h({description:"",price:1,stock:1,category:"",status:"",imageFileArray:[],imageFiles:[],videoFileArray:[],videoFiles:[],seller_id:E,updated_at:""}),T=U({description:[{required:!0,message:"Please input Description",trigger:"blur"}],price:[{required:!0,message:"Please input price",trigger:"blur"}],stock:[{required:!0,message:"Stock minimum 1",trigger:"blur"}],category:[],status:[],imageFileArray:[],videoFileArray:[]}),f=5*1024*1024,H=500*1024*1024;function $(t){b.value=!0;const{imageFiles:e,videoFiles:s,...o}=t;C.value=e.map(a=>({originalName:a.name.match(c)[2],name:a.name.match(c)[2],type:a.type})),N.value=s.map(a=>({originalName:a.name.match(c)[2],name:a.name.match(c)[2],type:a.type})),o.imageFileArray=e.map(a=>({name:a.name.match(c)[2],url:a.name,type:a.type})),o.videoFileArray=s.map(a=>({name:a.name.match(c)[2],url:a.name,type:a.type})),o.imageFiles=e.map(a=>({originalName:a.name.match(c)[2],name:a.name.match(c)[2],type:a.type})),o.videoFiles=s.map(a=>({originalName:a.name.match(c)[2],name:a.name.match(c)[2],type:a.type})),l.value=o}function L(){l.value={description:"",price:0,stock:0,category:"",status:"",imageFileArray:[],imageFiles:[],videoFileArray:[],videoFiles:[],seller_id:E,updated_at:""}}async function M(t){L();try{t()}catch{b.value=!1}}function G(t){if(!t.type.includes("image"))return Y.error("请选择正确的图片格式"),!1}function O(t){return new Promise((e,s)=>{t.size>H?(Y.error("最大上传文件大小为500MB"),s("最大上传文件大小为500MB")):e(!0)})}async function Q(t){const e=t.file,s=e.size,o=e.name.split("."),a=o[o.length-1];if(s<=f){const r=await w(e);F.upload("/uploadFile",e,{name:r+"."+a,type:e.type});const p={originalName:e.name,name:r+"."+a,type:e.type};l.value.imageFiles.push(p)}else{const r=[],p=Math.ceil(s/f),y=File.prototype.slice,d=await w(e).catch(m=>{console.error(m)});for(let m=0;m<p;m++){const v=m*f,i=Math.min(e.size,v+f);r.push(F.upload("/uploadChunks",y.call(e,v,i),{hash:d,index:m,type:e.type}))}Promise.all(r).then(m=>{F.post("/mergeChunks",{name:d+"."+a,hash:d,total:p,type:e.type});const v={originalName:e.name,name:d+"."+a,type:e.type};l.value.imageFiles.push(v)})}}async function W(t){const e=t.size,s=t.name.split("."),o=s[s.length-1];if(e<=f){const a=await w(t);F.upload("/uploadFile",t,{name:a+"."+o,type:t.type});const r={originalName:t.name,name:a+"."+o,type:t.type};l.value.videoFiles.push(r)}else{const a=[],r=Math.ceil(e/f),p=File.prototype.slice,y=await w(t).catch(d=>{console.error(d)});for(let d=0;d<r;d++){const m=d*f,v=Math.min(t.size,m+f);a.push(F.upload("/uploadChunks",p.call(t,m,v),{hash:y,index:d,type:t.type}))}Promise.all(a).then(d=>{F.post("/mergeChunks",{name:y+"."+o,hash:y,total:r,type:t.type});const m={originalName:t.name,name:y+"."+o,type:t.type};l.value.videoFiles.push(m)})}}function J(t){z.value=t.url,V.value=!0}async function x(t){const e=t.raw||t,s=e.type;s.includes("image")?l.value.imageFiles=l.value.imageFiles.filter(o=>o.originalName!==e.name):s.includes("video")&&(l.value.videoFiles=l.value.videoFiles.filter(o=>o.originalName!==e.name),l.value.videoFileArray=l.value.videoFileArray.filter(o=>o.name!==e.name))}async function K(t){if(!t)return;const e=C.value.concat(N.value),s=l.value.imageFiles.concat(l.value.videoFiles),o=e.filter(a=>a&&!s.some(r=>r.name===a.name));o.length>0&&await se({deleteFiles:o}).then(a=>{console.log(a)}).catch(a=>{console.log(a)}),await t.validate((a,r)=>{if(a)l.value.updated_at=ne().format("YYYY-MM-DD HH:mm:ss"),re(l.value).then(p=>{b.value=!1,L(),R("getProductList")}).catch(p=>{console.log(p)});else return console.log("error submit!",r),!1})}return j({showDialog:$}),(t,e)=>{const s=ae,o=ue,a=de,r=pe,p=ee("Plus"),y=te,d=me,m=le,v=oe;return _(),k(A,null,[n(v,{modelValue:b.value,"onUpdate:modelValue":e[9]||(e[9]=i=>b.value=i),title:"编辑商品",top:"5vh","before-close":M},{footer:u(()=>[B("span",ce,[n(m,{onClick:M},{default:u(()=>[D("取消")]),_:1}),n(m,{type:"primary",onClick:e[8]||(e[8]=i=>K(S.value))},{default:u(()=>[D("提交")]),_:1})])]),default:u(()=>[n(d,{model:l.value,ref_key:"formRef",ref:S,rules:T},{default:u(()=>[n(o,{label:"商品描述",prop:"description","label-width":g},{default:u(()=>[n(s,{modelValue:l.value.description,"onUpdate:modelValue":e[0]||(e[0]=i=>l.value.description=i),autocomplete:"off"},null,8,["modelValue"])]),_:1}),n(o,{label:"商品价格",prop:"price","label-width":g},{default:u(()=>[n(s,{modelValue:l.value.price,"onUpdate:modelValue":e[1]||(e[1]=i=>l.value.price=i),onBlur:e[2]||(e[2]=i=>l.value.price=l.value.price*1),autocomplete:"off"},null,8,["modelValue"])]),_:1}),n(o,{label:"商品库存",prop:"stock","label-width":g},{default:u(()=>[n(s,{modelValue:l.value.stock,"onUpdate:modelValue":e[3]||(e[3]=i=>l.value.stock=i),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])]),_:1}),n(o,{label:"商品分类",prop:"category","label-width":g},{default:u(()=>[n(r,{modelValue:l.value.category,"onUpdate:modelValue":e[4]||(e[4]=i=>l.value.category=i),modelModifiers:{number:!0},class:"m-2",placeholder:"Select",size:"default"},{default:u(()=>[(_(!0),k(A,null,I(P.productCategoryList,i=>(_(),q(a,{key:i.value,label:i.label,value:i.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),n(o,{label:"商品状态",prop:"status","label-width":g},{default:u(()=>[n(r,{modelValue:l.value.status,"onUpdate:modelValue":e[5]||(e[5]=i=>l.value.status=i),modelModifiers:{number:!0},class:"m-2",placeholder:"Select",size:"default"},{default:u(()=>[(_(!0),k(A,null,I(P.productStatusList,i=>(_(),q(a,{key:i.value,label:i.label,value:i.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),n(o,{label:"商品图片",prop:"imageFileArray","label-width":g},{default:u(()=>[n(y,{"file-list":l.value.imageFileArray,"onUpdate:fileList":e[6]||(e[6]=i=>l.value.imageFileArray=i),"list-type":"picture-card",accept:"image/*",limit:9,"before-upload":G,"http-request":Q,"on-preview":J,"on-remove":x},{default:u(()=>[n(p,{style:{width:"2em",height:"2em"}})]),_:1},8,["file-list"])]),_:1}),n(o,{label:"商品视频",prop:"videoFileArray","label-width":g},{default:u(()=>[n(ie,{"file-list":l.value.videoFileArray,"onUpdate:fileList":e[7]||(e[7]=i=>l.value.videoFileArray=i),limit:1,"http-request":W,"before-upload":O,"on-remove":x},null,8,["file-list"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"]),n(v,{modelValue:V.value,"onUpdate:modelValue":e[10]||(e[10]=i=>V.value=i),width:"60%",top:"5vh"},{default:u(()=>[B("img",{style:{"object-fit":"scale-down",width:"100%",height:"100%"},src:z.value,alt:"Preview Image"},null,8,ve)]),_:1},8,["modelValue"])],64)}}});export{we as default};