const Z=Symbol("config-provider"),K=Symbol("global-locale"),Y=Symbol("global-theme"),g=Symbol("global-size"),J=Symbol("global-z-index"),b=Symbol("button-group"),u=Symbol("checkbox-group"),P=Symbol("form"),R=Symbol("form-item"),S=Symbol("layout-row"),V=Symbol("popper"),U=Symbol("popper-content"),B=Symbol("radio-group"),N="fz",m="is-",n=(_,t,c,r,E)=>{let e=`${_}-${t}`;return c&&(e+=`-${c}`),r&&(e+=`__${r}`),E&&(e+=`--${E}`),e},h=_=>{const t=N,c=(s="")=>n(t,_,s,"","");return{namespace:t,getName:()=>`${c()}`.toLowerCase().replace(/( |^)[a-z]/g,s=>s.toUpperCase()).replace(/(\-([a-z]))/g,(s,o,a)=>a.toUpperCase()),b:c,e:s=>s?n(t,_,"",s,""):"",m:s=>s?n(t,_,"","",s):"",be:(s,o)=>s&&o?n(t,_,s,o,""):"",em:(s,o)=>s&&o?n(t,_,"",s,o):"",bm:(s,o)=>s&&o?n(t,_,s,"",o):"",bem:(s,o,a)=>s&&o&&a?n(t,_,s,o,a):"",is:(s,...o)=>{const a=o.length>=1?o[0]:!0;return s&&a?`${m}${s}`:""},cssVar:s=>{const o={};for(const a in s)s[a]&&(o[`--${t}-${a}`]=s[a]);return o},cssVarName:s=>`--${t}-${s}`,cssVarBlock:s=>{const o={};for(const a in s)s[a]&&(o[`--${t}-${_}-${a}`]=s[a]);return o},cssVarBlockName:s=>`--${t}-${_}-${s}`}};export{J as F,Z as a,K as b,Y as c,g as d,P as e,R as f,b as g,S as h,B as i,u as j,V as k,U as l,h as u};