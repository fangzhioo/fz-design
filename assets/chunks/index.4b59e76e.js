import{d as W,M as Q,h as f,g as y,a3 as $,j as I,o as E,b as x,w as q,a4 as Z,k as R,n as O,N as A,a5 as ee,T as te,c as G,H as Y,F as ae,x as X,a6 as le,a7 as oe,O as j,Y as se,a8 as re,B as ne,r as ie,I as ce,e as ue}from"./framework.25a2e4da.js";import{t as fe,o as D,b as F,i as ve,c as z,d as K,e as me,w as U}from"./dom.2f137e0a.js";const de=c=>(c.install=n=>{const{name:o}=c;o&&n.component(o,c)},c),b=4,he={vertical:{offset:"offsetHeight",scroll:"scrollTop",scrollSize:"scrollHeight",size:"height",key:"vertical",axis:"Y",client:"clientY",direction:"top"},horizontal:{offset:"offsetWidth",scroll:"scrollLeft",scrollSize:"scrollWidth",size:"width",key:"horizontal",axis:"X",client:"clientX",direction:"left"}},pe=({move:c,size:n,bar:o})=>({[o.size]:n,transform:`translate${o.axis}(${c}%)`}),J=Symbol("scrollbarContextKey"),be={vertical:Boolean,size:String,move:Number,ratio:{type:Number,required:!0},always:Boolean},ye="Thumb",V=W({__name:"thumb",props:be,setup(c){const n=c,o=Q(J);o||fe(ye,"can not inject scrollbar context");const l=f(),u=f(),v=f({}),r=f(!1);let t=!1,m=!1,h=ve?document.onselectstart:null;const a=y(()=>he[n.vertical?"vertical":"horizontal"]),g=y(()=>pe({size:n.size,move:n.move,bar:a.value})),w=y(()=>l.value[a.value.offset]**2/o.wrapElement[a.value.scrollSize]/n.ratio/u.value[a.value.offset]),_=s=>{var i;if(s.stopPropagation(),s.ctrlKey||[1,2].includes(s.button))return;(i=window.getSelection())==null||i.removeAllRanges(),P(s);const e=s.currentTarget;e&&(v.value[a.value.axis]=e[a.value.offset]-(s[a.value.client]-e.getBoundingClientRect()[a.value.direction]))},L=s=>{if(!u.value||!l.value||!o.wrapElement)return;const e=Math.abs(s.target.getBoundingClientRect()[a.value.direction]-s[a.value.client]),i=u.value[a.value.offset]/2,d=(e-i)*100*w.value/l.value[a.value.offset];o.wrapElement[a.value.scroll]=d*o.wrapElement[a.value.scrollSize]/100},P=s=>{s.stopImmediatePropagation(),t=!0,document.addEventListener("mousemove",H),document.addEventListener("mouseup",p),h=document.onselectstart,document.onselectstart=()=>!1},H=s=>{if(!l.value||!u.value||t===!1)return;const e=v.value[a.value.axis];if(!e)return;const i=(l.value.getBoundingClientRect()[a.value.direction]-s[a.value.client])*-1,d=u.value[a.value.offset]-e,S=(i-d)*100*w.value/l.value[a.value.offset];o.wrapElement[a.value.scroll]=S*o.wrapElement[a.value.scrollSize]/100},p=()=>{t=!1,v.value[a.value.axis]=0,document.removeEventListener("mousemove",H),document.removeEventListener("mouseup",p),C(),m&&(r.value=!1)},k=()=>{m=!1,r.value=!!n.size},T=()=>{m=!0,r.value=t};$(()=>{C(),document.removeEventListener("mouseup",p)});const C=()=>{document.onselectstart!==h&&(document.onselectstart=h)};return I(()=>{D(o.scrollbarElement,"mousemove",k),D(o.scrollbarElement,"mouseleave",T)}),$(()=>{F(o.scrollbarElement,"mousemove",k),F(o.scrollbarElement,"mouseleave",T)}),(s,e)=>(E(),x(te,{name:"fz-scrollbar-fade"},{default:q(()=>[Z(R("div",{ref_key:"instance",ref:l,class:O(["fz-scrollbar__bar",{[`is-${a.value.key}`]:!!a.value.key}]),onMousedown:L},[R("div",{ref_key:"thumb",ref:u,class:"fz-scrollbar__thumb",style:A(g.value),onMousedown:_},null,36)],34),[[ee,s.always||r.value]])]),_:1}))}}),ge={always:{type:Boolean,default:!0},width:String,height:String,ratioX:{type:Number,default:1},ratioY:{type:Number,default:1}},we=W({__name:"bar",props:ge,setup(c,{expose:n}){const o=c,l=f(0),u=f(0);return n({handleScroll:r=>{if(r){const t=r.offsetHeight-b,m=r.offsetWidth-b;u.value=r.scrollTop*100/t*o.ratioY,l.value=r.scrollLeft*100/m*o.ratioX}}}),(r,t)=>(E(),G(ae,null,[Y(V,{move:l.value,ratio:r.ratioX,size:r.width,always:r.always},null,8,["move","ratio","size","always"]),Y(V,{move:u.value,ratio:r.ratioY,size:r.height,vertical:"",always:r.always},null,8,["move","ratio","size","always"])],64))}}),Se={height:{type:[String,Number],default:""},maxHeight:{type:[String,Number],default:""},native:{type:Boolean,default:!1},wrapStyle:{type:[String,Object,Array],default:""},wrapClass:{type:[String,Array],default:""},viewClass:{type:[String,Array],default:""},viewStyle:{type:[String,Array,Object],default:""},noresize:Boolean,tag:{type:String,default:"div"},always:Boolean,minSize:{type:Number,default:20},id:String,role:String,ariaLabel:String,ariaOrientation:{type:String}},ze={scroll:({scrollTop:c,scrollLeft:n})=>[c,n].every(z)},M="FzScrollbar",Ee=W({name:M,__name:"scrollbar",props:Se,emits:ze,setup(c,{expose:n,emit:o}){const l=c;let u,v;const r=f(),t=f(),m=f(),h=f("0"),a=f("0"),g=f(),w=f(1),_=f(1),L=y(()=>{const e={};return l.height&&(e.height=K(l.height)),l.maxHeight&&(e.maxHeight=K(l.maxHeight)),[l.wrapStyle,e]}),P=y(()=>[l.wrapClass,"fz-scrollbar__wrap",{"fz-scrollbar__wrap--hidden-default":!l.native}]),H=y(()=>["fz-scrollbar__view",l.viewClass]),p=()=>{var e;t.value&&((e=g.value)==null||e.handleScroll(t.value),o("scroll",{scrollTop:t.value.scrollTop,scrollLeft:t.value.scrollLeft}))};function k(e,i){t.value&&(me(e)?t.value.scrollTo(e):z(e)&&z(i)&&t.value.scrollTo(e,i))}const T=e=>{if(!z(e)){U(M,"value must be a number");return}t.value.scrollTop=e},C=e=>{if(!z(e)){U(M,"value must be a number");return}t.value.scrollLeft=e},s=()=>{if(!t.value)return;const e=t.value.offsetHeight-b,i=t.value.offsetWidth-b,d=e**2/t.value.scrollHeight,S=i**2/t.value.scrollWidth,N=Math.max(d,l.minSize),B=Math.max(S,l.minSize);w.value=d/(e-d)/(N/(e-N)),_.value=S/(i-S)/(B/(i-B)),a.value=N+b<e?`${N}px`:"",h.value=B+b<i?`${B}px`:""};return X(()=>l.noresize,e=>{e?(u==null||u(),v==null||v()):({stop:u}=le(m,s),v=oe("resize",s))},{immediate:!0}),X(()=>[l.maxHeight,l.height],()=>{l.native||j(()=>{var e;s(),t.value&&((e=g.value)==null||e.handleScroll(t.value))})}),se(J,re({scrollbarElement:r,wrapElement:t})),I(()=>{l.native||j(()=>{s()})}),ne(()=>s()),n({wrapRef:t,update:s,scrollTo:k,setScrollTop:T,setScrollLeft:C,handleScroll:p}),(e,i)=>(E(),G("div",{ref_key:"scrollbarRef",ref:r,class:"fz-scrollbar"},[R("div",{ref_key:"wrapRef",ref:t,class:O(P.value),style:A(L.value),onScroll:p},[(E(),x(ce(e.tag),{id:e.id,ref_key:"resizeRef",ref:m,class:O(H.value),style:A(e.viewStyle),role:e.role,"aria-label":e.ariaLabel,"aria-orientation":e.ariaOrientation},{default:q(()=>[ie(e.$slots,"default")]),_:3},8,["id","class","style","role","aria-label","aria-orientation"]))],38),e.native?ue("",!0):(E(),x(we,{key:0,ref_key:"barRef",ref:g,height:a.value,width:h.value,always:e.always,"ratio-x":_.value,"ratio-y":w.value},null,8,["height","width","always","ratio-x","ratio-y"]))],512))}}),ke=de(Ee);export{ke as F,de as i};
