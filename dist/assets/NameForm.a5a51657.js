import{d as k,a as _,s as w,n as d,o as h,r as a,b as C,c as M,f as o,u as s,e as u,y as N,w as n,z as S,_ as f,B as v,C as I,D as R}from"./index.b9160266.js";import{u as $}from"./useFormApi.4f9fd1b3.js";import{a as O,u as P}from"./useHooks.2cd27d9b.js";import"./_commonjsHelpers.dffb1198.js";const U={class:"my-section"},L={class:"my-contents"},j=v("\u30B2\u30B9\u30C8\u3055\u3093\u306F\u30CD\u30FC\u30E0\u30D5\u30A9\u30FC\u30E0\u306ECRUD\u304C\u3067\u304D\u307E\u305B\u3093"),z={class:"flex flex-row justify-content-between"},H={class:"flex flex-row"},q={class:"p-input-icon-left"},G=u("i",{class:"pi pi-search"},null,-1),J={class:"flex flex-row"},ee=k({name:"NameForm",setup(K){const b=_(()=>f(()=>import("./AppBreadcrumb.29322dc6.js"),["assets/AppBreadcrumb.29322dc6.js","assets/index.b9160266.js","assets/index.a8fa6635.css"])),F=_(()=>f(()=>import("./AppTitle.c1e24e6a.js"),["assets/AppTitle.c1e24e6a.js","assets/index.b9160266.js","assets/index.a8fa6635.css"])),x=O(),{admin:E}=w(x),{getFormItems:A}=$(),{messageToast:D,permissionDialog:r}=P(),m=d(),y=async()=>{await m.value.exportCSV(),D()},l=d({global:{value:void 0,matchMode:R.CONTAINS}});let p=d();return h(async()=>{p.value=await A("name")}),(Q,e)=>{const B=a("Message"),i=a("Button"),g=a("InputText"),c=a("Column"),T=a("Tag"),V=a("DataTable");return C(),M("section",U,[o(s(b),{label:[{label:"\u30D5\u30A9\u30FC\u30E0\u7BA1\u7406"},{label:"\u30CD\u30FC\u30E0"}]}),u("div",L,[s(E).permission===2?(C(),N(B,{key:0,severity:"error"},{default:n(()=>[j]),_:1})):S("",!0),o(s(F),{icon:"pi-list",label:"\u30CD\u30FC\u30E0\u30D5\u30A9\u30FC\u30E0\u7BA1\u7406"}),o(V,{ref_key:"csv",ref:m,filters:l.value,"onUpdate:filters":e[5]||(e[5]=t=>l.value=t),class:"p-datatable-sm",value:s(p),"data-key":"value","filter-display":"menu","global-filter-fields":["text","value"],"responsive-layout":"scroll","show-gridlines":""},{header:n(()=>[u("div",z,[u("div",H,[o(i,{label:"\u65B0\u898F",icon:"pi pi-plus",class:"p-button-sm mr-1",onClick:e[0]||(e[0]=t=>s(r)())}),o(i,{label:"CSV",icon:"pi pi-upload",class:"p-button-secondary p-button-sm",onClick:e[1]||(e[1]=t=>y())})]),u("div",null,[u("span",q,[G,o(g,{modelValue:l.value.global.value,"onUpdate:modelValue":e[2]||(e[2]=t=>l.value.global.value=t),class:"p-inputtext-sm max-w-10rem md:max-w-full",placeholder:"\u691C\u7D22"},null,8,["modelValue"])])])])]),footer:n(()=>{var t;return[v(" \u30C8\u30FC\u30BF\u30EB\u30A2\u30A4\u30C6\u30E0\uFF1A"+I((t=s(p))==null?void 0:t.length),1)]}),default:n(()=>[o(c,{header:"\u7DE8\u96C6\u30FB\u524A\u9664"},{body:n(()=>[u("div",J,[o(i,{icon:"pi pi-pencil",class:"p-button-outlined p-button-sm p-button-info mr-2",onClick:e[3]||(e[3]=t=>s(r)())}),o(i,{icon:"pi pi-trash",class:"p-button-outlined p-button-sm p-button-danger",onClick:e[4]||(e[4]=t=>s(r)())})])]),_:1}),o(c,{field:"text",header:"\u30CD\u30FC\u30E0",sortable:!0},{body:n(t=>[o(T,{value:t.data.text},null,8,["value"])]),_:1}),o(c,{field:"value",header:"\u30F4\u30A1\u30EA\u30E5\u30FC",sortable:!0})]),_:1},8,["filters","value"])])])}}});export{ee as default};