import{d as x,v as h,r,ac as k,X as u,o as c,c as y,w as s,a5 as t,b as E,Z as B,a9 as g,_ as o,bk as b}from"./vendor.7405601a.js";import"./index.532807d1.js";import{c as A}from"./index.ec0709f3.js";const f=x({setup(m){const n=h(!0),l=[{date:"2016-05-02",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"},{date:"2016-05-04",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"},{date:"2016-05-01",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"}];return(d,p)=>{const a=r("fz-table-column"),e=r("fz-table"),i=k("loading");return u((c(),y(e,{data:l,style:{width:"100%"}},{default:s(()=>[t(a,{prop:"date",label:"Date",width:"180"}),t(a,{prop:"name",label:"Name",width:"180"}),t(a,{prop:"address",label:"Address"})]),_:1})),[[i,n.value]])}}}),v=x({setup(m){const n=h(!0),l=`
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `,d=[{date:"2016-05-02",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"},{date:"2016-05-04",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"},{date:"2016-05-01",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"}];return(p,a)=>{const e=r("fz-table-column"),i=r("fz-table"),_=k("loading");return c(),E(B,null,[u((c(),y(i,{"element-loading-text":"Loading...","element-loading-spinner":l,"element-loading-svg-view-box":"-10, -10, 50, 50","element-loading-background":"rgba(122, 122, 122, 0.8)",data:d,style:{width:"100%"}},{default:s(()=>[t(e,{prop:"date",label:"Date",width:"180"}),t(e,{prop:"name",label:"Name",width:"180"}),t(e,{prop:"address",label:"Address"})]),_:1})),[[_,n.value]]),u((c(),y(i,{"element-loading-svg":l,class:"custom-loading-svg","element-loading-svg-view-box":"-10, -10, 50, 50",data:d,style:{width:"100%"}},{default:s(()=>[t(e,{prop:"date",label:"Date",width:"180"}),t(e,{prop:"name",label:"Name",width:"180"}),t(e,{prop:"address",label:"Address"})]),_:1})),[[_,n.value]])],64)}}}),D=g(" As a directive "),L=g(" As a service "),w=x({setup(m){const n=h(!1),l=()=>{n.value=!0,setTimeout(()=>{n.value=!1},2e3)},d=()=>{const p=A.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"});setTimeout(()=>{p.close()},2e3)};return(p,a)=>{const e=r("fz-button"),i=k("loading");return c(),E(B,null,[u((c(),y(e,{type:"primary",onClick:l},{default:s(()=>[D]),_:1})),[[i,n.value,void 0,{fullscreen:!0,lock:!0}]]),t(e,{type:"primary",onClick:d},{default:s(()=>[L]),_:1})],64)}}}),j={class:"markdown-body"},z=o("h1",{id:"%E5%8A%A0%E8%BD%BD",tabindex:"-1"},[o("a",{class:"anchor",href:"#%E5%8A%A0%E8%BD%BD"},"\xB6"),g(" \u52A0\u8F7D")],-1),F=o("p",null,"\u52A0\u8F7D\u6570\u636E\u65F6\u663E\u793A\u52A8\u6548\u3002",-1),N=o("h2",{id:"%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95",tabindex:"-1"},[o("a",{class:"anchor",href:"#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95"},"\xB6"),g(" \u57FA\u7840\u7528\u6CD5")],-1),S=o("h2",{id:"%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%A0%E8%BD%BD%E4%B8%AD%E7%BB%84%E4%BB%B6%E5%86%85%E5%AE%B9",tabindex:"-1"},[o("a",{class:"anchor",href:"#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%A0%E8%BD%BD%E4%B8%AD%E7%BB%84%E4%BB%B6%E5%86%85%E5%AE%B9"},"\xB6"),g(" \u81EA\u5B9A\u4E49\u52A0\u8F7D\u4E2D\u7EC4\u4EF6\u5185\u5BB9")],-1),J=o("p",null,"\u4F60\u53EF\u4EE5\u81EA\u5B9A\u4E49\u52A0\u8F7D\u4E2D\u7EC4\u4EF6\u7684\u6587\u5B57\uFF0C\u56FE\u6807\uFF0C\u4EE5\u53CA\u80CC\u666F\u989C\u8272\u3002\u5728\u7ED1\u5B9A\u4E86 v-loading \u6307\u4EE4\u7684\u5143\u7D20\u4E0A\u6DFB\u52A0 element-loading-text \u5C5E\u6027\uFF0C\u5176\u503C\u4F1A\u88AB\u6E32\u67D3\u4E3A\u52A0\u8F7D\u6587\u6848\uFF0C\u5E76\u663E\u793A\u5728\u52A0\u8F7D\u56FE\u6807\u7684\u4E0B\u65B9\u3002 \u7C7B\u4F3C\u5730\uFF0Celement-loading-spinner\u3001element-loading-background \u548C element-loading-svg \u5C5E\u6027\u5206\u522B\u7528\u6765\u8BBE\u5B9A svg \u56FE\u6807\u3001\u80CC\u666F\u8272\u503C\u3001\u52A0\u8F7D\u56FE\u6807\u3002",-1),C=b('<blockquote><p>\u26A0\uFE0F \u867D\u7136 <code>element-loading-spinner</code> / <code>element-loading-svg</code> \u5C5E\u6027\u652F\u6301\u4F20\u5165\u7684 HTML \u7247\u6BB5\uFF0C\u4F46\u662F\u52A8\u6001\u5728\u7F51\u7AD9\u4E0A\u6E32\u67D3\u4EFB\u610F\u7684 HTML \u662F\u975E\u5E38\u5371\u9669\u7684\uFF0C\u56E0\u4E3A\u5F88\u5BB9\u6613\u5BFC\u81F4 <strong class="bold">XSS \u653B\u51FB</strong>\u3002 \u8BF7\u786E\u4FDD <code>element-loading-spinner</code> / <code>element-loading-svg</code> \u7684\u5185\u5BB9\u662F\u53EF\u4FE1\u7684\uFF0C \u4E0D\u8981\u5C06\u7528\u6237\u63D0\u4EA4\u7684\u5185\u5BB9\u8D4B\u503C\u7ED9 <code>element-loading-spinner</code> / <code>element-loading-svg</code> \u5C5E\u6027\u3002</p></blockquote><h2 id="%E8%AE%A9%E5%8A%A0%E8%BD%BD%E7%BB%84%E4%BB%B6%E9%93%BA%E6%BB%A1%E6%95%B4%E4%B8%AA%E5%B1%8F%E5%B9%95" tabindex="-1"><a class="anchor" href="#%E8%AE%A9%E5%8A%A0%E8%BD%BD%E7%BB%84%E4%BB%B6%E9%93%BA%E6%BB%A1%E6%95%B4%E4%B8%AA%E5%B1%8F%E5%B9%95">\xB6</a> \u8BA9\u52A0\u8F7D\u7EC4\u4EF6\u94FA\u6EE1\u6574\u4E2A\u5C4F\u5E55</h2><p>\u52A0\u8F7D\u6570\u636E\u65F6\u663E\u793A\u5168\u5C4F\u52A8\u753B\u3002\u5F53\u4F7F\u7528\u6307\u4EE4\u65B9\u5F0F\u65F6\uFF0C\u5168\u5C4F\u906E\u7F69\u9700\u8981\u6DFB\u52A0 fullscreen \u4FEE\u9970\u7B26\uFF08\u906E\u7F69\u4F1A\u63D2\u5165\u81F3 body \u4E0A\uFF09 \u6B64\u65F6\u82E5\u9700\u8981\u9501\u5B9A\u5C4F\u5E55\u7684\u6EDA\u52A8\uFF0C\u53EF\u4EE5\u4F7F\u7528 lock \u4FEE\u9970\u7B26\uFF1B \u5F53\u4F7F\u7528\u670D\u52A1\u65B9\u5F0F\u65F6\uFF0C\u906E\u7F69\u9ED8\u8BA4\u5373\u4E3A\u5168\u5C4F\uFF0C\u65E0\u9700\u989D\u5916\u8BBE\u7F6E\u3002</p>',3),P=b(`<p>\u5728\u9700\u8981\u7684\u65F6\u5019\u5C55\u793A\u52A0\u8F7D\u52A8\u753B\uFF0C\u9632\u6B62\u9875\u9762\u5931\u53BB\u54CD\u5E94\u63D0\u9AD8\u7528\u6237\u4F53\u9A8C\uFF08\u4F8B\u5982\u8868\u683C\uFF09\u3002</p><p>Element Plus \u63D0\u4F9B\u4E86\u4E24\u79CD\u8C03\u7528 Loading \u7684\u65B9\u6CD5\uFF1A\u6307\u4EE4\u548C\u670D\u52A1\u3002 \u5BF9\u4E8E\u81EA\u5B9A\u4E49\u6307\u4EE4 v-loading\uFF0C\u53EA\u9700\u8981\u7ED1\u5B9A boolean \u503C\u5373\u53EF\u3002 \u9ED8\u8BA4\u72B6\u51B5\u4E0B\uFF0CLoading \u906E\u7F69\u4F1A\u63D2\u5165\u5230\u7ED1\u5B9A\u5143\u7D20\u7684\u5B50\u8282\u70B9\u3002 \u901A\u8FC7\u6DFB\u52A0 body \u4FEE\u9970\u7B26\uFF0C\u53EF\u4EE5\u4F7F\u906E\u7F69\u63D2\u5165\u81F3 Dom \u4E2D\u7684 body \u4E0A\u3002</p><h2 id="%E4%BB%A5%E6%9C%8D%E5%8A%A1%E7%9A%84%E6%96%B9%E5%BC%8F%E6%9D%A5%E8%B0%83%E7%94%A8" tabindex="-1"><a class="anchor" href="#%E4%BB%A5%E6%9C%8D%E5%8A%A1%E7%9A%84%E6%96%B9%E5%BC%8F%E6%9D%A5%E8%B0%83%E7%94%A8">\xB6</a> \u4EE5\u670D\u52A1\u7684\u65B9\u5F0F\u6765\u8C03\u7528</h2><p>Loading \u8FD8\u53EF\u4EE5\u4EE5\u670D\u52A1\u7684\u65B9\u5F0F\u8C03\u7528\u3002 \u4F60\u53EF\u4EE5\u50CF\u8FD9\u6837\u5F15\u5165 Loading \u670D\u52A1\uFF1A</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> FzLoading <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;fz-ui&#39;</span><span class="token punctuation">;</span>
</code></pre><p>\u5728\u4F60\u9700\u8981\u7684\u65F6\u5019\u901A\u8FC7\u4E0B\u9762\u7684\u65B9\u5F0F\u8C03\u7528\uFF1A</p><pre class="language-js"><code class="language-js">FzLoading<span class="token punctuation">.</span><span class="token function">service</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u5176\u4E2D options \u53C2\u6570\u4E3A Loading \u7684\u914D\u7F6E\u9879\uFF0C\u5177\u4F53\u89C1\u4E0B\u8868\u3002 LoadingService \u4F1A\u8FD4\u56DE\u4E00\u4E2A Loading \u5B9E\u4F8B\uFF0C\u53EF\u901A\u8FC7\u8C03\u7528\u8BE5\u5B9E\u4F8B\u7684 close \u65B9\u6CD5\u6765\u5173\u95ED\u5B83\uFF1A</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> loadingInstance <span class="token operator">=</span> FzLoading<span class="token punctuation">.</span><span class="token function">service</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// Loading should be closed asynchronously</span>
  loadingInstance<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u4EE5\u670D\u52A1\u7684\u65B9\u5F0F\u8C03\u7528\u7684\u5168\u5C4F Loading \u662F\u5355\u4F8B\u7684\u3002 \u82E5\u5728\u524D\u4E00\u4E2A\u5168\u5C4F Loading \u5173\u95ED\u524D\u518D\u6B21\u8C03\u7528\u5168\u5C4F Loading\uFF0C\u5E76\u4E0D\u4F1A\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 Loading \u5B9E\u4F8B\uFF0C\u800C\u662F\u8FD4\u56DE\u73B0\u6709\u5168\u5C4F Loading \u7684\u5B9E\u4F8B\uFF1A</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> loadingInstance1 <span class="token operator">=</span> FzLoading<span class="token punctuation">.</span><span class="token function">service</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">fullscreen</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> loadingInstance2 <span class="token operator">=</span> FzLoading<span class="token punctuation">.</span><span class="token function">service</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">fullscreen</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>loadingInstance1 <span class="token operator">===</span> loadingInstance2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><p>\u6B64\u65F6\u8C03\u7528\u5B83\u4EEC\u4E2D\u4EFB\u610F\u4E00\u4E2A\u7684 close \u65B9\u6CD5\u90FD\u80FD\u5173\u95ED\u8FD9\u4E2A\u5168\u5C4F Loading\u3002</p><p>\u5982\u679C\u5B8C\u6574\u5F15\u5165\u4E86 <code>Fz-UI</code>\uFF0C\u90A3\u4E48 <code>app.config.globalProperties</code> \u4E0A\u4F1A\u6709\u4E00\u4E2A\u5168\u5C40\u65B9\u6CD5 <code>$loading</code>\uFF0C \u5B83\u7684\u8C03\u7528\u65B9\u5F0F\u4E3A\uFF1A<code>this.$loading(options)</code>\uFF0C\u540C\u6837\u4F1A\u8FD4\u56DE\u4E00\u4E2A Loading \u5B9E\u4F8B\u3002</p><h2 id="%E5%B1%9E%E6%80%A7" tabindex="-1"><a class="anchor" href="#%E5%B1%9E%E6%80%A7">\xB6</a> \u5C5E\u6027</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u53C2\u6570</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u7C7B\u578B</th><th style="text-align:center;">\u53EF\u9009\u503C</th><th style="text-align:center;">\u9ED8\u8BA4\u503C</th><th style="text-align:center;">\u662F\u5426\u5FC5\u586B</th></tr></thead><tbody><tr><td style="text-align:center;"><code>target</code></td><td style="text-align:center;">Loading \u9700\u8981\u8986\u76D6\u7684 DOM \u8282\u70B9\u3002 \u53EF\u4F20\u5165\u4E00\u4E2A DOM \u5BF9\u8C61\u6216\u5B57\u7B26\u4E32\uFF1B \u82E5\u4F20\u5165\u5B57\u7B26\u4E32\uFF0C\u5219\u4F1A\u5C06\u5176\u4F5C\u4E3A\u53C2\u6570\u4F20\u5165 document.querySelector \u4EE5\u83B7\u53D6\u5230\u5BF9\u5E94 DOM \u8282\u70B9</td><td style="text-align:center;">object/string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>document.body</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>body</code></td><td style="text-align:center;">\u540C v-loading \u6307\u4EE4\u4E2D\u7684 body \u4FEE\u9970\u7B26</td><td style="text-align:center;">boolean</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>false</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>fullscreen</code></td><td style="text-align:center;">\u540C v-loading \u6307\u4EE4\u4E2D\u7684 fullscreen \u4FEE\u9970\u7B26</td><td style="text-align:center;">boolean</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>true</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>lock</code></td><td style="text-align:center;">\u540C v-loading \u6307\u4EE4\u4E2D\u7684 lock \u4FEE\u9970\u7B26</td><td style="text-align:center;">boolean</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>false</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>text</code></td><td style="text-align:center;">\u663E\u793A\u5728\u52A0\u8F7D\u56FE\u6807\u4E0B\u65B9\u7684\u52A0\u8F7D\u6587\u6848</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>-</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>spinner</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u52A0\u8F7D\u56FE\u6807\u7C7B\u540D</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>-</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>background</code></td><td style="text-align:center;">\u906E\u7F69\u80CC\u666F\u8272</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>-</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>custom-class</code></td><td style="text-align:center;">Loading \u7684\u81EA\u5B9A\u4E49\u7C7B\u540D</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>-</code></td><td style="text-align:center;">\u5426</td></tr></tbody></table></div><h2 id="%E6%8C%87%E4%BB%A4" tabindex="-1"><a class="anchor" href="#%E6%8C%87%E4%BB%A4">\xB6</a> \u6307\u4EE4</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u6307\u4EE4\u540D\u79F0</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u7C7B\u578B</th></tr></thead><tbody><tr><td style="text-align:center;"><code>v-loading</code></td><td style="text-align:center;">\u662F\u5426\u663E\u793A\u52A8\u753B</td><td style="text-align:center;">boolean</td></tr><tr><td style="text-align:center;"><code>element-loading-text</code></td><td style="text-align:center;">\u663E\u793A\u5728\u52A0\u8F7D\u56FE\u6807\u4E0B\u65B9\u7684\u52A0\u8F7D\u6587\u6848</td><td style="text-align:center;">string</td></tr><tr><td style="text-align:center;"><code>element-loading-spinner</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u52A0\u8F7D\u56FE\u6807</td><td style="text-align:center;">string</td></tr><tr><td style="text-align:center;"><code>element-loading-svg</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u52A0\u8F7D\u56FE\u6807 (\u4E0E element-loading-spinner \u76F8\u540C)</td><td style="text-align:center;">string</td></tr><tr><td style="text-align:center;"><code>element-loading-background</code></td><td style="text-align:center;">\u80CC\u666F\u906E\u7F69\u7684\u989C\u8272</td><td style="text-align:center;">string</td></tr></tbody></table></div>`,17),R={setup(m,{expose:n}){return n({frontmatter:{}}),(d,p)=>{const a=r("demo-preview");return c(),E("div",j,[z,F,N,t(a,{"comp-name":"Loading","demo-name":"demo"},{default:s(()=>[t(f)]),_:1}),S,J,t(a,{"comp-name":"Loading","demo-name":"demo2"},{default:s(()=>[t(v)]),_:1}),C,t(a,{"comp-name":"Loading","demo-name":"demo3"},{default:s(()=>[t(w)]),_:1}),P])}}};export{R as default};