import{u as r}from"./use-namespace.697bb1de.js";import{f as c}from"./dom.1ddecdbe.js";import{d as i,g as l,o as n,c as m,b as p,I as f,r as u,n as d,l as y,N as g}from"./framework.f91504f0.js";import{b as z}from"./index.b1089a6f.js";const k={icon:{type:Object},color:{type:String,default:""},size:{type:[String,Number]}},v=i({name:"FzSvgIcon",__name:"svg-icon",props:k,setup(t){const s=r("svg-icon"),o=t,a=l(()=>{const e={};return o.color&&(e[s.cssVarBlockName("color")]=o.color),o.size&&(e[s.cssVarBlockName("size")]=c(o.size)),e});return(e,S)=>(n(),m("i",{role:"img",class:d(y(s).b()),style:g(a.value),"text-indent":"middle"},[e.icon?(n(),p(f(e.icon),{key:0})):u(e.$slots,"default",{key:1})],6))}}),C=z(v);export{C as F,v as _};