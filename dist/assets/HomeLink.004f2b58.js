import{u as b}from"./useHooks.2cd27d9b.js";import{d as k,r as x,b as e,c as n,e as t,F as s,E as l,f as r,u as c}from"./index.b9160266.js";import"./_commonjsHelpers.dffb1198.js";const _={class:"flex flex-row flex-wrap"},f={class:"border-none xl:border-right-1 border-100 pr-0 xl:pr-6"},h=t("div",{class:"my-3"},[t("span",{class:"pr-2"},[t("i",{class:"pi pi-bolt",style:{color:"var(--primary-color)"}})]),t("span",{class:"font-semibold"},"\u30D5\u30A9\u30FC\u30E0\u30EA\u30F3\u30AF")],-1),v={class:"flex flex-row justify-content-start"},C={class:"pl-0 xl:pl-6"},A=t("div",{class:"my-3"},[t("span",{class:"pr-2"},[t("i",{class:"pi pi-send",style:{color:"var(--primary-color)"}})]),t("span",{class:"font-semibold"},"GitHub\u30EA\u30F3\u30AF")],-1),y={class:"flex flex-row justify-content-start flex-wrap"},G=k({name:"HomeLink",setup(F){const{route:a,link:u}=b(),p=[{id:1,text:"\u30CD\u30FC\u30E0",icon:"pi pi-list",link:"/name"},{id:2,text:"\u30A8\u30EA\u30A2",icon:"pi pi-map-marker",link:"/area"},{id:3,text:"\u8077\u52D9",icon:"pi pi-briefcase",link:"/job"},{id:4,text:"\u7A2E\u65CF",icon:"pi pi-users",link:"/race"}],d=[{id:1,text:"Admin-GitHub",icon:"pi pi-github",link:"https://github.com/kensoz/Rrea-admin"},{id:2,text:"Server-GitHub",icon:"pi pi-github",link:"https://github.com/kensoz/Rrea-server"},{id:3,text:"Client-GitHub",icon:"pi pi-github",link:"https://github.com/kensoz/Rrea-client"},{id:4,text:"Clinet\u30B5\u30A4\u30C8",icon:"pi pi-external-link",link:"http://rrea-client.live"}];return(g,E)=>{const o=x("Button");return e(),n("div",_,[t("div",f,[h,t("div",v,[(e(),n(s,null,l(p,i=>r(o,{key:i.id,label:i.text,icon:i.icon,class:"p-button-sm mr-1",onClick:m=>c(a)(i.link)},null,8,["label","icon","onClick"])),64))])]),t("div",C,[A,t("div",y,[(e(),n(s,null,l(d,i=>r(o,{key:i.id,label:i.text,icon:i.icon,class:"p-button-outlined p-button-sm mr-1 mt-1 md:mt-0",onClick:m=>c(u)(i.link)},null,8,["label","icon","onClick"])),64))])])])}}});export{G as default};