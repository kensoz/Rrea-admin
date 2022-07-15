import{d as k,a as _,s as w,n as m,o as h,r as a,b as C,c as M,f as o,u as s,e as u,y as N,w as n,z as S,_ as f,B as v,C as I,D as R}from"./index.f881c86f.js";import{u as $}from"./useFormApi.6e3171ee.js";import{a as O,u as P}from"./useHooks.bcd370d1.js";import"./_commonjsHelpers.dffb1198.js";const U={class:"my-section"},L={class:"my-contents"},j=v("\u30B2\u30B9\u30C8\u3055\u3093\u306F\u30CD\u30FC\u30E0\u30D5\u30A9\u30FC\u30E0\u306ECRUD\u304C\u3067\u304D\u307E\u305B\u3093"),z={class:"flex flex-row justify-content-between"},H={class:"flex flex-row"},q={class:"p-input-icon-left"},G=u("i",{class:"pi pi-search"},null,-1),J={class:"flex flex-row"},ee=k({name:"NameForm",setup(K){const b=_(()=>f(()=>import("./AppBreadcrumb.edc08322.js"),["assets/AppBreadcrumb.edc08322.js","assets/index.f881c86f.js","assets/index.0e688f3c.css"])),x=_(()=>f(()=>import("./AppTitle.f8a25a2e.js"),["assets/AppTitle.f8a25a2e.js","assets/index.f881c86f.js","assets/index.0e688f3c.css"])),F=O(),{admin:E}=w(F),{getFormItems:A}=$(),{messageToast:D,permissionDialog:r}=P(),d=m(),y=async()=>{await d.value.exportCSV(),D()},l=m({global:{value:void 0,matchMode:R.CONTAINS}});let p=m();return h(async()=>{p.value=await A("name")}),(Q,e)=>{const B=a("Message"),i=a("Button"),g=a("InputText"),c=a("Column"),T=a("Tag"),V=a("DataTable");return C(),M("section",U,[o(s(b),{label:[{label:"\u30D5\u30A9\u30FC\u30E0\u7BA1\u7406"},{label:"\u30CD\u30FC\u30E0"}]}),u("div",L,[s(E).permission===2?(C(),N(B,{key:0,severity:"error"},{default:n(()=>[j]),_:1})):S("",!0),o(s(x),{icon:"pi-list",label:"\u30CD\u30FC\u30E0\u30D5\u30A9\u30FC\u30E0\u7BA1\u7406"}),o(V,{ref_key:"csv",ref:d,filters:l.value,"onUpdate:filters":e[5]||(e[5]=t=>l.value=t),class:"p-datatable-sm",value:s(p),"data-key":"value","filter-display":"menu","global-filter-fields":["text","value"],"responsive-layout":"scroll","show-gridlines":""},{header:n(()=>[u("div",z,[u("div",H,[o(i,{label:"\u65B0\u898F",icon:"pi pi-plus",class:"p-button-sm mr-1",onClick:e[0]||(e[0]=t=>s(r)())}),o(i,{label:"CSV",icon:"pi pi-upload",class:"p-button-secondary p-button-sm",onClick:e[1]||(e[1]=t=>y())})]),u("div",null,[u("span",q,[G,o(g,{modelValue:l.value.global.value,"onUpdate:modelValue":e[2]||(e[2]=t=>l.value.global.value=t),class:"p-inputtext-sm max-w-10rem md:max-w-max",placeholder:"\u691C\u7D22"},null,8,["modelValue"])])])])]),footer:n(()=>{var t;return[v(" \u30C8\u30FC\u30BF\u30EB\u30A2\u30A4\u30C6\u30E0\uFF1A"+I((t=s(p))==null?void 0:t.length),1)]}),default:n(()=>[o(c,{header:"\u7DE8\u96C6\u30FB\u524A\u9664"},{body:n(()=>[u("div",J,[o(i,{icon:"pi pi-pencil",class:"p-button-outlined p-button-sm p-button-info mr-2",onClick:e[3]||(e[3]=t=>s(r)())}),o(i,{icon:"pi pi-trash",class:"p-button-outlined p-button-sm p-button-danger",onClick:e[4]||(e[4]=t=>s(r)())})])]),_:1}),o(c,{field:"text",header:"\u30CD\u30FC\u30E0",sortable:!0},{body:n(t=>[o(T,{value:t.data.text},null,8,["value"])]),_:1}),o(c,{field:"value",header:"\u30F4\u30A1\u30EA\u30E5\u30FC",sortable:!0})]),_:1},8,["filters","value"])])])}}});export{ee as default};
