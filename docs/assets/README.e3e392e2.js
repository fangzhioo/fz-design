import{_ as h}from"./index.fbccb427.js";import{d as v,k as _,r,o as i,b as c,M as n,O as y,a4 as d,w as s,a3 as g,ag as f}from"./vendor.509435e9.js";const x=v({setup(){return{val:_("fzui")}}}),V={class:"section-item"},b={class:"section-item"},$={class:"section-item"},w=g(".com"),U={class:"section-item"},z=g("Http://"),k={class:"section-item"},N={class:"section-item"};function B(e,t,u,m,p,a){const o=r("fz-input");return i(),c("div",null,[n("div",null,y(e.val),1),n("div",V,[d(o,{placeholder:"\u8BF7\u8F93\u5165",clearable:"",modelValue:e.val,"onUpdate:modelValue":t[0]||(t[0]=l=>e.val=l)},null,8,["modelValue"])]),n("div",b,[d(o,{placeholder:"\u8BF7\u8F93\u5165","show-password":"",modelValue:e.val,"onUpdate:modelValue":t[1]||(t[1]=l=>e.val=l)},null,8,["modelValue"])]),n("div",$,[d(o,{placeholder:"\u8BF7\u8F93\u5165",modelValue:e.val,"onUpdate:modelValue":t[2]||(t[2]=l=>e.val=l)},{append:s(()=>[w]),_:1},8,["modelValue"])]),n("div",U,[d(o,{placeholder:"\u8BF7\u8F93\u5165",modelValue:e.val,"onUpdate:modelValue":t[3]||(t[3]=l=>e.val=l)},{prepend:s(()=>[z]),_:1},8,["modelValue"])]),n("div",k,[d(o,{placeholder:"\u8BF7\u8F93\u5165","prefix-icon":"mobile-phone",modelValue:e.val,"onUpdate:modelValue":t[4]||(t[4]=l=>e.val=l)},null,8,["modelValue"])]),n("div",N,[d(o,{placeholder:"\u8BF7\u8F93\u5165","suffix-icon":"search",modelValue:e.val,"onUpdate:modelValue":t[5]||(t[5]=l=>e.val=l)},null,8,["modelValue"])])])}var C=h(x,[["render",B],["__scopeId","data-v-074deb1b"]]);const I=v({setup(){return{val:_("fzui")}}});function j(e,t,u,m,p,a){const o=r("fz-input");return i(),c("div",null,[n("div",null,y(e.val),1),d(o,{placeholder:"\u8BF7\u8F93\u5165",type:"textarea",maxlength:20,"show-word-limit":"",modelValue:e.val,"onUpdate:modelValue":t[0]||(t[0]=l=>e.val=l)},null,8,["modelValue"])])}var E=h(I,[["render",j]]);const P={class:"markdown-body"},S=n("h1",null,"\u8F93\u5165\u6846",-1),D=n("p",null,"\u6587\u672C\u8F93\u5165\u6846",-1),H=n("h2",null,"\u57FA\u7840\u7528\u6CD5",-1),M=n("h2",null,"textarea \u6587\u672C\u6846",-1),O=f('<h2>\u5C5E\u6027</h2><table><thead><tr><th style="text-align:center;">\u53C2\u6570</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u7C7B\u578B</th><th style="text-align:center;">\u53EF\u9009\u503C</th><th style="text-align:center;">\u9ED8\u8BA4\u503C</th><th style="text-align:center;">\u662F\u5426\u5FC5\u586B</th></tr></thead><tbody><tr><td style="text-align:center;"><code>arg1</code></td><td style="text-align:center;">\u7B2C\u4E00\u4E2A\u53C2\u6570</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>arg2</code></td><td style="text-align:center;">\u7B2C\u4E8C\u4E2A\u53C2\u6570</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u5426</td></tr></tbody></table><h2>\u4E8B\u4EF6</h2><table><thead><tr><th style="text-align:center;">\u4E8B\u4EF6\u540D</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u53C2\u6570\u5217\u8868</th><th style="text-align:center;">\u53C2\u6570\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>click</code></td><td style="text-align:center;">\u70B9\u51FB\u4E8B\u4EF6</td><td style="text-align:center;">$event</td><td style="text-align:center;">\u539F\u751F\u7684 dom event</td></tr><tr><td style="text-align:center;"><code>customEvent</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u4E8B\u4EF6</td><td style="text-align:center;">[a, b, c]</td><td style="text-align:center;">a\uFF1A\u53C2\u6570\u4E00\uFF1Bb\uFF1A\u53C2\u6570\u4E8C\uFF1Bc\uFF1A\u53C2\u6570\u4E09</td></tr></tbody></table>',4),A={setup(e,{expose:t}){return t({frontmatter:{}}),(m,p)=>{const a=r("Preview");return i(),c("div",P,[S,D,H,d(a,{"comp-name":"Input","demo-name":"demo"},{default:s(()=>[d(C)]),_:1}),M,d(a,{"comp-name":"Input","demo-name":"demo2"},{default:s(()=>[d(E)]),_:1}),O])}}};export{A as default};
