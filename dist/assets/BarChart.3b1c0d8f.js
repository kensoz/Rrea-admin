import{s as c}from"./chart.esm.e40705ea.js";import{d as n,p as t,b as s,y as d,u as b}from"./index.b9160266.js";const f=n({name:"BarChart",setup(p){const e=t({plugins:{legend:{labels:{color:"#797775"}}},scales:{x:{ticks:{color:"#797775"},grid:{color:"#797775"}},y:{ticks:{color:"#797775"},grid:{color:"#797775"}}}}),a=()=>{const o=[];for(let u=0;u<7;u++){const r=Math.floor(Math.random()*250);o.push(r<50?50:r)}return o},l=t({labels:["\u65E5\u66DC\u65E5","\u6708\u66DC\u65E5","\u706B\u66DC\u65E5","\u6C34\u66DC\u65E5","\u6728\u66DC\u65E5","\u91D1\u66DC\u65E5","\u571F\u66DC\u65E5"],datasets:[{label:"\u672C\u793E",backgroundColor:"#bbdefb",data:a()},{label:"\u652F\u793E",backgroundColor:"#c8e6c9",data:a()},{label:"\u98DF\u5802",backgroundColor:"#fff9c4",data:a()},{label:"\u5916\u52E4",backgroundColor:"#f8bbd0",data:a()},{label:"\u672A\u77E5",backgroundColor:"#e0e0e0",data:a()}]});return(o,u)=>(s(),d(b(c),{type:"bar",data:l,options:e},null,8,["data","options"]))}});export{f as default};
