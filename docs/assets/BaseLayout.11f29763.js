import{v as g,u as z,l as T,y as k,d as b,r as a,o as w,c as y,w as s,a5 as o,_ as d,a0 as C,bi as B,bj as E,a9 as i}from"./vendor.7405601a.js";import{_ as I,u as S}from"./index.ec0709f3.js";const $=e=>{var n;const t=g((n=z(e))!=null?n:"light");if(T){const c=window.matchMedia("(prefers-color-scheme: dark)");t.value=c.matches?"dark":"light"}return k(t,()=>{t.value&&document.documentElement.setAttribute("data-mode",t.value)}),{theme:t,setTheme:c=>{t.value=c}}};const j=b({name:"baseLayout",setup(){const e=document.documentElement.getAttribute("data-mode"),{theme:t,setTheme:r}=$(e),{size:n}=S();return{theme:t,size:n,handleToggleTheme:()=>{r(t.value==="dark"?"light":"dark")}}}}),D=e=>(B("data-v-66026d9c"),e=e(),E(),e),F=D(()=>d("div",{class:"logo"},"FzUI",-1)),L={class:"nav"},N=i("\u6307\u5357"),V=i("\u7EC4\u4EF6"),x=i("\u65E5\u5FD7");function A(e,t,r,n,c,M){const _=a("router-link"),u=a("fz-header"),l=a("router-view"),m=a("fz-main"),h=a("fz-container"),p=a("fz-backtop"),f=a("fz-config-provider");return w(),y(f,{theme:e.theme,size:e.size},{default:s(()=>[o(h,{class:"base-layout"},{default:s(()=>[o(u,{class:"base-header"},{default:s(()=>[F,d("nav",L,[o(_,{to:"/guide"},{default:s(()=>[N]),_:1}),o(_,{to:"/components"},{default:s(()=>[V]),_:1}),o(_,{to:"/changelog"},{default:s(()=>[x]),_:1})]),d("div",null,[d("span",{class:"theme-btn",onClick:t[0]||(t[0]=(...v)=>e.handleToggleTheme&&e.handleToggleTheme(...v))},C(e.theme),1)])]),_:1}),o(m,null,{default:s(()=>[o(l)]),_:1})]),_:1}),o(p)]),_:1},8,["theme","size"])}var G=I(j,[["render",A],["__scopeId","data-v-66026d9c"]]);export{G as default};