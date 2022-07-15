import{u as N}from"./useHooks.bcd370d1.js";import{d as $,n as m,o as S,r as _,b as l,c as a,e,f as n,u as s,F as b,E as x,y as T,I as F,C as r,B as v,z as I,v as V}from"./index.f881c86f.js";import"./_commonjsHelpers.dffb1198.js";const j={class:"flex flex-column"},z=e("div",{class:"my-3"},[e("span",{class:"pr-2"},[e("i",{class:"pi pi-desktop",style:{color:"var(--primary-color)"}})]),e("span",{class:"font-semibold"},"\u30E1\u30F3\u30D0\u30FC\u30A8\u30EA\u30A2\uFF08\u30D7\u30EC\u30D3\u30E5\u30FC\uFF09")],-1),H={class:"flex flex-column lg:flex-row justify-content-between"},L={class:"mb-2 lg:mb-0"},M={key:0,class:"grid mt-2"},q={key:1,class:"grid mt-2"},G={class:"mr-2 md:mr-3 border-1 border-100"},J={class:"text-500"},K={class:"font-medium mb-1"},O={class:"text-xs truncate"},P={class:"truncate"},Q={class:"mr-2 font-medium"},R={class:"text-xs"},U={class:"text-xs hidden lg:block truncate"},W=e("span",{class:""},"\u7A2E\u65CF\uFF1A",-1),X={class:"text-xs hidden lg:block truncate"},Y=e("span",{class:""},"\u8077\u52D9\uFF1A",-1),Z={class:"text-xs hidden xl:block truncate"},ee=e("span",{class:""},"\u30B9\u30AD\u30EB\uFF1A",-1),te={key:2,class:"m-3"},se=e("span",{class:"pr-2 text-200"},[e("i",{class:"pi pi-exclamation-circle",style:{color:"var(--orange-300)"}})],-1),oe=v(" \u30C7\u30FC\u30BF\u53D6\u5F97\u5931\u6557 "),le=[se,oe],ce=$({name:"HomeClient",setup(ae){const{link:f,route:y,errorToast:A,bgColorCreator:k}=N(),w=new Array(8).fill(0);let c=m(!0),g=m([]),d=m([]);const h=async()=>{await V.post("/api/v1/data",{areaCode:"",jobCode:[],nameCode:[],raceCode:[]}).then(p=>{g.value=p.data.result.count,d.value=i.value?p.data.result.user:p.data.result.user.sort((o,u)=>Number(u.areaCode)-Number(o.areaCode))}).catch(()=>{A()}).finally(()=>{setTimeout(()=>{c.value=!1},300)})};let i=m(!0);const B=()=>{i.value=!i.value,h()};return S(async()=>{await h()}),(p,o)=>{const u=_("Button"),D=_("Tag"),E=_("Skeleton"),C=_("Image");return l(),a("div",j,[z,e("div",H,[e("div",L,[n(u,{label:"\u30E1\u30F3\u30D0\u30FC\u7BA1\u7406",icon:"pi pi-id-card",class:"p-button-sm mr-1",onClick:o[0]||(o[0]=t=>s(y)("/data"))}),n(u,{label:"Client\u30B5\u30A4\u30C8",icon:"pi pi-external-link",class:"p-button-outlined p-button-sm mr-1",onClick:o[1]||(o[1]=t=>s(f)("http://rrea-client.live"))}),n(u,{icon:"pi pi-refresh",class:"p-button-outlined p-button-sm mr-1",disabled:s(d).length===0||s(c),onClick:o[2]||(o[2]=t=>h())},null,8,["disabled"]),n(u,{icon:s(i)?"pi pi-sort-amount-down":"pi pi-sort-amount-up-alt",class:"p-button-outlined p-button-sm mr-1",disabled:s(d).length===0||s(c),onClick:o[3]||(o[3]=t=>B())},null,8,["icon","disabled"])]),e("div",null,[(l(!0),a(b,null,x(s(g),t=>(l(),T(D,{key:t.value,class:"mr-1 mb-1 md:mb-0 text-500 font-normal",value:`${t.area}\uFF1A${t.count}`,style:F(`background-color:${s(k)(Number(t.value))};`)},null,8,["value","style"]))),128))])]),s(c)?(l(),a("div",M,[(l(!0),a(b,null,x(s(w),t=>(l(),a("div",{key:t,class:"col-6 md:col-4 lg:col-4 xl:col-3 h-5rem md:h-8rem"},[n(E,{width:"100%",height:"100%"})]))),128))])):(l(),a("div",q,[(l(!0),a(b,null,x(s(d),t=>(l(),a("div",{key:t.id,class:"col-6 md:col-4 lg:col-4 xl:col-3"},[e("div",{class:"flex flex-row py-2 px-2 md:px-3 border-1 border-50 border-round-xs",style:F(`background-color:${s(k)(Number(t.areaCode))};`)},[e("div",G,[n(C,{class:"hidden lg:block",src:t.photo,alt:"avatars",width:"90",height:"120",preview:""},null,8,["src"]),n(C,{class:"block lg:hidden",src:t.photo,alt:"avatars",width:"51",height:"68",preview:""},null,8,["src"])]),e("div",J,[e("div",K,"\u30A8\u30EA\u30A2\uFF1A"+r(t.area),1),e("div",O,"ID\uFF1A"+r(t.id),1),e("div",P,[e("span",Q,r(t.name),1),e("span",R,r(t.nameSpell),1)]),e("div",U,[W,v(" "+r(t.race),1)]),e("div",X,[Y,v(" "+r(t.job),1)]),e("div",Z,[ee,v(" "+r(t.skill),1)])])],4)]))),128))])),s(d).length===0&&!s(c)?(l(),a("div",te,le)):I("",!0)])}}});export{ce as default};
