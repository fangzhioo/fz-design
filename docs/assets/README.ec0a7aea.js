import{r as g,o as x,b as _,a6 as e,w as s,aa as n,p as y,d as u,Y as r,bh as m}from"./vendor.34e98e33.js";import{_ as b,m as f}from"./index.ae7fa35c.js";const p=n("success"),v=n("info"),E=n("warning"),$=n("error"),C={setup(a){const t=y(),i=c=>{t.appContext.config.globalProperties.$message({message:`this is a ${c} message`,type:c})};return(c,d)=>{const l=g("fz-button");return x(),_("div",null,[e(l,{onClick:d[0]||(d[0]=o=>i("success"))},{default:s(()=>[p]),_:1}),e(l,{onClick:d[1]||(d[1]=o=>i("info"))},{default:s(()=>[v]),_:1}),e(l,{onClick:d[2]||(d[2]=o=>i("warning"))},{default:s(()=>[E]),_:1}),e(l,{onClick:d[3]||(d[3]=o=>i("error"))},{default:s(()=>[$]),_:1})])}}},k=u({name:"demo2",setup(){return{handleClick:t=>{f({message:`this is a ${t} message`,type:t,showClose:!0,grouping:!0})}}}}),B=n("success"),A=n("info"),w=n("warning"),F=n("error");function z(a,t,i,c,d,l){const o=g("fz-button");return x(),_("div",null,[e(o,{onClick:t[0]||(t[0]=h=>a.handleClick("success"))},{default:s(()=>[B]),_:1}),e(o,{onClick:t[1]||(t[1]=h=>a.handleClick("info"))},{default:s(()=>[A]),_:1}),e(o,{onClick:t[2]||(t[2]=h=>a.handleClick("warning"))},{default:s(()=>[w]),_:1}),e(o,{onClick:t[3]||(t[3]=h=>a.handleClick("error"))},{default:s(()=>[F]),_:1})])}var N=b(k,[["render",z]]);const V={class:"markdown-body"},j=r("h1",{id:"%E6%B6%88%E6%81%AF%E6%8F%90%E7%A4%BA",tabindex:"-1"},"\u6D88\u606F\u63D0\u793A",-1),D=r("p",null,"\u5E38\u7528\u4E8E\u4E3B\u52A8\u64CD\u4F5C\u540E\u7684\u53CD\u9988\u63D0\u793A\u3002",-1),M=r("h2",{id:"%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95",tabindex:"-1"},"\u57FA\u7840\u7528\u6CD5",-1),I=r("h2",{id:"%E5%8F%AF%E5%85%B3%E9%97%AD%E3%80%81%E5%8F%AF%E6%8A%98%E5%8F%A0",tabindex:"-1"},"\u53EF\u5173\u95ED\u3001\u53EF\u6298\u53E0",-1),P=r("p",null,[n("\u8BBE\u7F6E "),r("code",null,"showClose"),n(" \u53EF\u4EE5\u624B\u52A8\u5173\u95ED,\u8BBE\u7F6E "),r("code",null,"grouping"),n("\u53EF\u4EE5\u628A\u76F8\u540C\u7684\u5185\u5BB9\u63D0\u793A\u6298\u53E0\u3002")],-1),S=m('<h2 id="%E5%B1%9E%E6%80%A7" tabindex="-1">\u5C5E\u6027</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u53C2\u6570</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u7C7B\u578B</th><th style="text-align:center;">\u53EF\u9009\u503C</th><th style="text-align:center;">\u9ED8\u8BA4\u503C</th><th style="text-align:center;">\u662F\u5426\u5FC5\u586B</th></tr></thead><tbody><tr><td style="text-align:center;"><code>arg1</code></td><td style="text-align:center;">\u7B2C\u4E00\u4E2A\u53C2\u6570</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>arg2</code></td><td style="text-align:center;">\u7B2C\u4E8C\u4E2A\u53C2\u6570</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u5426</td></tr></tbody></table></div><h2 id="%E4%BA%8B%E4%BB%B6" tabindex="-1">\u4E8B\u4EF6</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u4E8B\u4EF6\u540D</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u53C2\u6570\u5217\u8868</th><th style="text-align:center;">\u53C2\u6570\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>click</code></td><td style="text-align:center;">\u70B9\u51FB\u4E8B\u4EF6</td><td style="text-align:center;">$event</td><td style="text-align:center;">\u539F\u751F\u7684 dom event</td></tr><tr><td style="text-align:center;"><code>customEvent</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u4E8B\u4EF6</td><td style="text-align:center;">[a, b, c]</td><td style="text-align:center;">a\uFF1A\u53C2\u6570\u4E00\uFF1Bb\uFF1A\u53C2\u6570\u4E8C\uFF1Bc\uFF1A\u53C2\u6570\u4E09</td></tr></tbody></table></div><h2 id="%E6%96%B9%E6%B3%95" tabindex="-1">\u65B9\u6CD5</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u65B9\u6CD5\u540D</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u53C2\u6570\u5217\u8868</th><th style="text-align:center;">\u53C2\u6570\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>update</code></td><td style="text-align:center;">\u624B\u52A8\u66F4\u65B0</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td></tr></tbody></table></div><h2 id="%E6%8F%92%E6%A7%BD" tabindex="-1">\u63D2\u69FD</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u63D2\u69FD\u540D</th><th style="text-align:center;">\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u9ED8\u8BA4\u5185\u5BB9</td></tr></tbody></table></div>',8),q={setup(a,{expose:t}){return t({frontmatter:{}}),(c,d)=>{const l=g("demo-preview");return x(),_("div",V,[j,D,M,e(l,{"comp-name":"Message","demo-name":"demo"},{default:s(()=>[e(C)]),_:1}),I,P,e(l,{"comp-name":"Message","demo-name":"demo2"},{default:s(()=>[e(N)]),_:1}),S])}}};export{q as default};