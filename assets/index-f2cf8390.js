import{d as n,L as u,r as i,a as s,E as _,o as c,c as d,b as m,w as l,e as g,u as p,_ as x}from"./index-010153ca.js";const b={class:"FormBox"},f=n({__name:"index",setup(v){u(),p();const t=i();s({username:"admin",password:"123456"}),s({username:[{required:!0,message:"Please input Username",trigger:"blur"},{min:3,max:15,message:"Length should be 6 to 15",trigger:"blur"}],password:[{required:!0,message:"Please input PassWord",trigger:"blur"},{min:6,max:15,message:"Length should be 6 to 15",trigger:"blur"}]});const a=async r=>{};return(r,e)=>{const o=_;return c(),d("div",b,[m(o,{type:"success",onClick:e[0]||(e[0]=h=>a(t.value))},{default:l(()=>[g("按钮")]),_:1})])}}});const w=x(f,[["__scopeId","data-v-4aa10b40"]]);export{w as default};
