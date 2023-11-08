import{h as k,a2 as V,a8 as z,a3 as F,d as O,a9 as m,w as P,a6 as E,H as R,aa as _,T as j,O as A,a4 as Z}from"./framework.f91504f0.js";import{u as D}from"./use-namespace.697bb1de.js";import{u as H}from"./use-z-index.1af40665.js";import{r as p,i as q,b as I,g,a as L,c as $}from"./dom.1ddecdbe.js";import{i as K,a as M}from"./index.b1089a6f.js";function Y(t){let e;const o=k(!1),s=V({...t,originalPosition:"",originalOverflow:"",visible:!1});function r(a){s.text=a}function n(){const a=s.parent,d=v.ns;if(!a.vLoadingAddClassList){let i=a.getAttribute("loading-number");i=Number.parseInt(i)-1,i?a.setAttribute("loading-number",i.toString()):(p(a,d.bm("parent","relative")),a.removeAttribute("loading-number")),p(a,d.bm("parent","hidden"))}c(),y.unmount()}function c(){var a,d;(d=(a=v.$el)==null?void 0:a.parentNode)==null||d.removeChild(v.$el)}function u(){var a;t.beforeClose&&!t.beforeClose()||(o.value=!0,clearTimeout(e),e=window.setTimeout(l,400),s.visible=!1,(a=t.closed)==null||a.call(t))}function l(){if(!o.value)return;const a=s.parent;o.value=!1,a.vLoadingAddClassList=void 0,n()}const f=O({name:"FzLoading",setup(a,{expose:d}){const i=D("loading"),T=H();return d({ns:i,zIndex:T}),()=>{const C=s.spinner||s.svg,N=m("svg",{class:"circular",viewBox:s.svgViewBox?s.svgViewBox:"0 0 50 50",...C?{innerHTML:C}:{}},[m("circle",{class:"path",cx:"25",cy:"25",r:"20",fill:"none"})]),S=s.text?m("p",{class:i.b("text")},[s.text]):void 0;return m(j,{name:i.b("fade"),onAfterLeave:l},{default:P(()=>[E(R("div",{style:{backgroundColor:s.background||""},class:[i.b("mask"),s.customClass,s.fullscreen?i.is("fullscreen"):""]},[m("div",{class:i.b("spinner")},[N,S])]),[[_,s.visible]])])})}}}),y=z(f),v=y.mount(document.createElement("div"));return{...F(s),setText:r,removeElLoadingChild:c,close:u,handleAfterLeave:l,vm:v,get $el(){return v.$el}}}let b;const B=function(t={}){if(!q)return;const e=G(t);if(e.fullscreen&&b)return b;const o=Y({...e,closed:()=>{var r;(r=e.closed)==null||r.call(e),e.fullscreen&&(b=void 0)}});J(e,e.parent,o),w(e,e.parent,o),e.parent.vLoadingAddClassList=()=>w(e,e.parent,o);let s=e.parent.getAttribute("loading-number");return s?s=`${Number.parseInt(s)+1}`:s="1",e.parent.setAttribute("loading-number",s),e.parent.appendChild(o.$el),A(()=>o.visible.value=e.visible),e.fullscreen&&(b=o),o},G=t=>{let e;return I(t.target)?e=document.querySelector(t.target)??document.body:e=t.target||document.body,{parent:e===document.body||t.body?document.body:e,background:t.background||"",svg:t.svg||"",svgViewBox:t.svgViewBox||"",spinner:t.spinner||!1,text:t.text||"",fullscreen:e===document.body&&(t.fullscreen??!0),lock:t.lock??!1,customClass:t.customClass||"",visible:t.visible??!0,target:e}},J=async(t,e,o)=>{const{nextZIndex:s}=o.vm.zIndex||o.vm._.exposed.zIndex,r={};if(t.fullscreen)o.originalPosition.value=g(document.body,"position"),o.originalOverflow.value=g(document.body,"overflow"),r.zIndex=s();else if(t.parent===document.body){o.originalPosition.value=g(document.body,"position"),await A();for(const n of["top","left"]){const c=n==="top"?"scrollTop":"scrollLeft",l=t.target.getBoundingClientRect()[n]+document.body[c]+document.documentElement[c]-Number.parseInt(g(document.body,`margin-${n}`),10);r[n]=`${l}px`}for(const n of["height","width"]){const u=t.target.getBoundingClientRect()[n];r[n]=`${u}px`}}else o.originalPosition.value=g(e,"position");for(const[n,c]of Object.entries(r))o.$el.style[n]=c},w=(t,e,o)=>{const s=o.vm.ns||o.vm._.exposed.ns;["absolute","fixed","sticky"].includes(o.originalPosition.value)?p(e,s.bm("parent","relative")):L(e,s.bm("parent","relative")),t.fullscreen&&t.lock?L(e,s.bm("parent","hidden")):p(e,s.bm("parent","hidden"))},x=Symbol("FzLoading"),Q=t=>t.replace(/\B([A-Z])/g,"-$1").toLowerCase(),h=(t,e)=>{const o=e.instance,s=l=>$(e.value)?e.value[l]:void 0,r=l=>{const f=I(l)&&(o==null?void 0:o[l])||l;return f&&k(f)},n=l=>r(s(l)||t.getAttribute(`element-loading-${Q(l)}`)),c=s("fullscreen")??e.modifiers.fullscreen,u={text:n("text"),svg:n("svg"),svgViewBox:n("svgViewBox"),spinner:n("spinner"),background:n("background"),customClass:n("customClass"),fullscreen:c,target:s("target")??(c?void 0:t),body:s("body")??e.modifiers.body,lock:s("lock")??e.modifiers.lock};t[x]={options:u,instance:B(u)}},U=(t,e)=>{for(const o of Object.keys(e)){const s=e[o];Z(s)&&(s.value=t[o])}},W={mounted(t,e){e.value&&h(t,e)},updated(t,e){const o=t[x];e.oldValue!==e.value&&(e.value&&!e.oldValue?h(t,e):e.value&&e.oldValue?$(e.value)&&U(e.value,o.options):o==null||o.instance.close())},unmounted(t){var e;(e=t[x])==null||e.instance.close()}},ne=K(W,"loading"),ae=M(B,"FzLoading");export{ae as F,ne as l};
