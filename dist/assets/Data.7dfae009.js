import{d as K,a as D,t as Q,s as W,n as f,p as X,o as Y,r as m,b as w,c as Z,f as t,u as l,e as r,y as ee,w as p,z as te,_ as g,l as se,B as N,C as ue,D as ae}from"./index.b9160266.js";import{a as oe,u as le}from"./useHooks.2cd27d9b.js";import{u as ne}from"./useNemberApi.d11dba3c.js";import"./_commonjsHelpers.dffb1198.js";const ie={class:"my-section"},re={class:"my-contents"},ce=N(" \u30B2\u30B9\u30C8\u3055\u3093\u306F\u30E1\u30F3\u30D0\u30FC\u306ECRUD\u304C\u3067\u304D\u307E\u3059\u304C\u3001\u30ED\u30FC\u30AB\u30EB\u306ECURD\u3067\u30C7\u30FC\u30BF\u3078\u306E\u53CD\u6620\u306F\u3057\u307E\u305B\u3093 "),de={class:"flex flex-row justify-content-between"},me={class:"flex flex-row"},pe={class:"p-input-icon-left"},ve=r("i",{class:"pi pi-search"},null,-1),fe={class:"flex flex-row"},Be=K({name:"Data",setup(be){const h=D(()=>g(()=>import("./AppBreadcrumb.29322dc6.js"),["assets/AppBreadcrumb.29322dc6.js","assets/index.b9160266.js","assets/index.a8fa6635.css"])),k=D(()=>g(()=>import("./AppNemberDialog.add15641.js"),["assets/AppNemberDialog.add15641.js","assets/useFormApi.4f9fd1b3.js","assets/useHooks.2cd27d9b.js","assets/index.b9160266.js","assets/index.a8fa6635.css","assets/_commonjsHelpers.dffb1198.js"])),V=D(()=>g(()=>import("./AppTitle.c1e24e6a.js"),["assets/AppTitle.c1e24e6a.js","assets/index.b9160266.js","assets/index.a8fa6635.css"])),T=Q(),S=oe(),{admin:_}=W(S),{nembersPrototype:B}=se(),{messageToast:A,missingValue:I}=le(),{getNemberItems:y,deleteNemberItems:O,createNemberItems:j,editNemberItems:M}=ne(),E=f(),$=async()=>{await E.value.exportCSV(),A()},b=f({global:{value:void 0,matchMode:ae.CONTAINS}}),R=async()=>{a.value=await y("user"),A()};let C=f(!1);const F=()=>{C.value=!1};let v=f("create"),a=f(),c=X(B);const P=JSON.parse(JSON.stringify(B)),U=s=>{T.require({message:`\u300C${s.name}\u3055\u3093\u300D\u3092\u524A\u9664\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B`,header:"\u524A\u9664\u78BA\u8A8D",icon:"pi pi-exclamation-triangle",rejectClass:"p-button-outlined p-button-warning",accept:async()=>{_.value.permission===2?x("deldete",s):a.value=await O("user",s.id)}})},L=()=>{var n;v.value="create";const s=[];(n=a.value)==null||n.map(o=>{s.push(Number(o.id))});const e=I(s);Object.assign(c,P,{id:("00000"+e.toString()).slice(-5)}),C.value=!0},J=s=>{v.value="edit",Object.assign(c,s),C.value=!0},q=async s=>{var e;Object.assign(c,s),F(),_.value.permission===2?v.value==="create"?(e=a.value)==null||e.push(s):x("edit",s):a.value=v.value==="create"?await j("user",c):await M("user",c)},x=(s,e)=>{var n,o;s==="edit"?(n=a.value)==null||n.map(d=>{d.id===e.id&&Object.assign(d,e)}):a.value=(o=a.value)==null?void 0:o.filter(d=>d.id!==e.id)};return Y(async()=>{a.value=await y("user")}),(s,e)=>{const n=m("Message"),o=m("Button"),d=m("InputText"),i=m("Column"),z=m("Tag"),H=m("DataTable");return w(),Z("section",ie,[t(l(h),{label:[{label:"\u30E1\u30F3\u30D0\u30FC\u7BA1\u7406"},{label:"\u30E1\u30F3\u30D0\u30FC"}]}),r("div",re,[l(_).permission===2?(w(),ee(n,{key:0,severity:"info"},{default:p(()=>[ce]),_:1})):te("",!0),t(l(V),{icon:"pi-id-card",label:"\u30E1\u30F3\u30D0\u30FC\u7BA1\u7406"}),t(H,{ref_key:"csv",ref:E,filters:b.value,"onUpdate:filters":e[4]||(e[4]=u=>b.value=u),class:"p-datatable-sm",value:l(a),"data-key":"id","filter-display":"menu","global-filter-fields":["id","name","nameSpell","job","race","skill"],"responsive-layout":"scroll","show-gridlines":""},{header:p(()=>[r("div",de,[r("div",me,[t(o,{label:"\u65B0\u898F",icon:"pi pi-plus",class:"p-button-sm mr-1",onClick:e[0]||(e[0]=u=>L())}),t(o,{label:"CSV",icon:"pi pi-upload",class:"p-button-secondary p-button-sm",onClick:e[1]||(e[1]=u=>$())}),t(o,{icon:"pi pi-replay",class:"p-button-success p-button-sm ml-1",onClick:e[2]||(e[2]=u=>R())})]),r("div",null,[r("span",pe,[ve,t(d,{modelValue:b.value.global.value,"onUpdate:modelValue":e[3]||(e[3]=u=>b.value.global.value=u),class:"p-inputtext-sm max-w-8rem sm:max-w-10rem md:max-w-full",placeholder:"\u691C\u7D22"},null,8,["modelValue"])])])])]),footer:p(()=>{var u;return[N(" \u30C8\u30FC\u30BF\u30EB\u30A2\u30A4\u30C6\u30E0\uFF1A"+ue((u=l(a))==null?void 0:u.length),1)]}),default:p(()=>[t(i,{header:"\u7DE8\u96C6\u30FB\u524A\u9664"},{body:p(u=>[r("div",fe,[t(o,{icon:"pi pi-pencil",class:"p-button-outlined p-button-sm p-button-info mr-2",onClick:G=>J(u.data)},null,8,["onClick"]),t(o,{icon:"pi pi-trash",class:"p-button-outlined p-button-sm p-button-danger",onClick:G=>U(u.data)},null,8,["onClick"])])]),_:1}),t(i,{field:"id",header:"ID",sortable:!0}),t(i,{field:"name",header:"\u6C0F\u540D",sortable:!0},{body:p(u=>[t(z,{value:u.data.name},null,8,["value"])]),_:1}),t(i,{field:"nameSpell",header:"\u30AB\u30BF\u30AB\u30CA"}),t(i,{field:"job",header:"\u8077\u52D9"}),t(i,{field:"race",header:"\u7A2E\u65CF"}),t(i,{field:"skill",header:"\u30B9\u30AD\u30EB"})]),_:1},8,["filters","value"])]),t(l(k),{visible:l(C),mode:l(v),form:l(c),onColse:e[5]||(e[5]=u=>F()),onConfirm:q},null,8,["visible","mode","form"])])}}});export{Be as default};