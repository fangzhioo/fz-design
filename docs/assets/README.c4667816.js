import{d as _,v as y,r as u,o as p,b as m,a5 as e,b1 as A,bm as B,bn as v,bo as C,w as E,_ as o,O as b,bk as f,a9 as h}from"./vendor.7405601a.js";import{_ as k}from"./index.ec0709f3.js";const w=_({setup(r){const n=y(`
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you\u2019d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That\u2019s a bullet list with one \u2026
          </li>
          <li>
            \u2026 or two list items.
          </li>
        </ul>
        <h3>
          Task List
        </h3>
        <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
        <p>
          Isn\u2019t that great? And all of that is editable. But wait, there\u2019s more. Let\u2019s try a code block:
        </p>
        <pre><code class="language-css">body { display: none; }</code></pre>
        <p>
          I know, I know, this is impressive. It\u2019s only the tip of the iceberg though. Give it a try and click a little bit around. Don\u2019t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that\u2019s amazing. Good work, boy! \u{1F44F}
          <br />
          \u2014 Mom
        </blockquote>
`);return(i,a)=>{const s=u("fz-rich-editor");return p(),m("div",null,[e(s,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=t=>n.value=t)},null,8,["modelValue"])])}}}),z=_({setup(r){const n=y(`
        <h2>
          Table
        </h2>
        <h3>
          Have you seen our tables? They are amazing!
        </h3>
        <ul>
          <li>tables with rows, cells and headers (optional)</li>
          <li>support for <code>colgroup</code> and <code>rowspan</code></li>
          <li>and even resizable columns (optional)</li>
        </ul>
        <p>
          Here is an example:
        </p>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>singer</td>
              <td>songwriter</td>
              <td>actress</td>
            </tr>
            <tr>
              <td>Marie Curie</td>
              <td>scientist</td>
              <td>chemist</td>
              <td>physicist</td>
            </tr>
            <tr>
              <td>Indira Gandhi</td>
              <td>prime minister</td>
              <td colspan="2">politician</td>
            </tr>
          </tbody>
        </table>
`);return(i,a)=>{const s=u("fz-rich-editor");return p(),m("div",null,[e(s,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=t=>n.value=t)},null,8,["modelValue"])])}}}),F=_({setup(r){const i={image:{beforeInsert:()=>new Promise(s=>{setTimeout(()=>{const t=window.prompt("\u8BF7\u586B\u5199\u56FE\u7247\u5730\u5740","https://source.unsplash.com/8xznAGy4HcY/800x400");s({src:t,alt:"\u52A0\u8F7D\u5931\u8D25",title:"\u8FD9\u662F\u4E00\u5F20\u56FE\u7247"})},1e3)})}},a=y(`
        <h2>
          Image
        </h2>
        <p>
          This is a basic example of implementing images. Drag to re-order.
        </p>
        <p>
          <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" alt title="This is a cat!!" />
        </p>
`);return(s,t)=>{const l=u("fz-rich-editor");return p(),m("div",null,[e(l,{modelValue:a.value,"onUpdate:modelValue":t[0]||(t[0]=c=>a.value=c),options:i},null,8,["modelValue"])])}}}),V=A.create({name:"placeholder",addOptions(){return{emptyEditorClass:"is-editor-empty",emptyNodeClass:"is-empty",placeholder:"Write something \u2026",showOnlyWhenEditable:!0,showOnlyCurrent:!0,includeChildren:!1}},addProseMirrorPlugins(){return[new B({props:{decorations:({doc:r,selection:n})=>{const i=this.editor.isEditable||!this.options.showOnlyWhenEditable,{anchor:a}=n,s=[];if(!!i)return r.descendants((t,l)=>{const c=a>=l&&a<=l+t.nodeSize,x=!t.isLeaf&&!t.childCount;if((c||!this.options.showOnlyCurrent)&&x){const d=[this.options.emptyNodeClass];this.editor.isEmpty&&d.push(this.options.emptyEditorClass);const g=v.node(l,l+t.nodeSize,{class:d.join(" "),"data-placeholder":typeof this.options.placeholder=="function"?this.options.placeholder({editor:this.editor,node:t,pos:l,hasAnchor:c}):this.options.placeholder});s.push(g)}return this.options.includeChildren}),C.create(r,s)}}})]}});const I=_({setup(r){const n=[V.configure({emptyEditorClass:"is-editor-empty",emptyNodeClass:"is-empty",placeholder:"Write something \u2026"})],i=y("");return(a,s)=>{const t=u("fz-rich-editor");return p(),m("div",null,[e(t,{modelValue:i.value,"onUpdate:modelValue":s[0]||(s[0]=l=>i.value=l),extensions:n},null,8,["modelValue"])])}}});const D={class:"my-custom-menus"},T=["onClick"],$=["onClick"],N=["onClick"],S=_({setup(r){const n=y(`
  <h2>
    Hi there,
  </h2>
  <p>
    this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you\u2019d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
    <li>
      That\u2019s a bullet list with one \u2026
    </li>
    <li>
      \u2026 or two list items.
    </li>
  </ul>
`),i=t=>{t.chain().focus().toggleBold().run()},a=t=>{t.chain().focus().toggleItalic().run()},s=t=>{t.chain().focus().toggleStrike().run()};return(t,l)=>{const c=u("fz-icon"),x=u("fz-rich-editor");return p(),m("div",null,[e(x,{modelValue:n.value,"onUpdate:modelValue":l[0]||(l[0]=d=>n.value=d)},{menus:E(({editor:d})=>[o("div",D,[o("button",{class:b(["action-button",{"is-active":d.isActive("bold")}]),onClick:g=>i(d)},[e(c,{name:"bold"})],10,T),o("button",{class:b(["action-button",{"is-active":d.isActive("italic")}]),onClick:g=>a(d)},[e(c,{name:"italic"})],10,$),o("button",{class:b(["action-button",{"is-active":d.isActive("strike")}]),onClick:g=>s(d)},[e(c,{name:"strikethrough"})],10,N)])]),_:1},8,["modelValue"])])}}});var H=k(S,[["__scopeId","data-v-0730a161"]]);const O={class:"markdown-body"},G=f('<h1 id="%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8" tabindex="-1"><a class="anchor" href="#%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8">\xB6</a> \u5BCC\u6587\u672C\u7F16\u8F91\u5668</h1><p>\u7528\u4E8E\u7F16\u8F91\u4E30\u5BCC\u7684\u6587\u672C\u5185\u5BB9\u7F16\u8F91\u5668\uFF0C\u57FA\u4E8E<a href="https://tiptap.dev/">tiptap \u7F16\u8F91\u5668</a>\u6784\u5EFA\u3002<strong class="bold">\u652F\u6301 markdown</strong> \u7684\u65B9\u5F0F\u7F16\u5199\u3002</p><h2 id="%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95" tabindex="-1"><a class="anchor" href="#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95">\xB6</a> \u57FA\u7840\u7528\u6CD5</h2>',3),L=o("h2",{id:"%E8%A1%A8%E6%A0%BC%E6%8F%92%E5%85%A5",tabindex:"-1"},[o("a",{class:"anchor",href:"#%E8%A1%A8%E6%A0%BC%E6%8F%92%E5%85%A5"},"\xB6"),h(" \u8868\u683C\u63D2\u5165")],-1),P=o("h2",{id:"%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E7%89%87%E4%B8%8A%E4%BC%A0%E9%80%BB%E8%BE%91",tabindex:"-1"},[o("a",{class:"anchor",href:"#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E7%89%87%E4%B8%8A%E4%BC%A0%E9%80%BB%E8%BE%91"},"\xB6"),h(" \u81EA\u5B9A\u4E49\u56FE\u7247\u4E0A\u4F20\u903B\u8F91")],-1),R=o("h2",{id:"%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8B%93%E5%B1%95",tabindex:"-1"},[o("a",{class:"anchor",href:"#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8B%93%E5%B1%95"},"\xB6"),h(" \u81EA\u5B9A\u4E49\u62D3\u5C55")],-1),U=o("p",null,[h("\u6BD4\u5982\u8FD9\u91CC\u6DFB\u52A0\u4E00\u4E2A\u62D3\u5C55"),o("a",{href:"https://tiptap.dev/api/extensions/placeholder"},"@tiptap/extension-placeholder"),h(" \uFF0C\u4E3A\u7F16\u8F91\u5668\u6DFB\u52A0 placeholder\u3002\u522B\u5FD8\u4E86\u6DFB\u52A0 css\uFF01\uFF01")],-1),W=o("h2",{id:"%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8F%9C%E5%8D%95",tabindex:"-1"},[o("a",{class:"anchor",href:"#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8F%9C%E5%8D%95"},"\xB6"),h(" \u81EA\u5B9A\u4E49\u83DC\u5355")],-1),j=o("p",null,[h("\u4F7F\u7528 "),o("code",null,'slot="menus"'),h(" \u63D2\u69FD\uFF0C\u81EA\u5B9A\u4E49\u83DC\u5355\u529F\u80FD\u548C\u6837\u5F0F\u3002")],-1),M=f('<p>\u4F60\u53EF\u5B8C\u5168\u5B9A\u5236\u81EA\u5DF1\u7684\u62D3\u5C55\u548C\u83DC\u5355\u3002</p><h2 id="%E5%B1%9E%E6%80%A7" tabindex="-1"><a class="anchor" href="#%E5%B1%9E%E6%80%A7">\xB6</a> \u5C5E\u6027</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u53C2\u6570</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u7C7B\u578B</th><th style="text-align:center;">\u53EF\u9009\u503C</th><th style="text-align:center;">\u9ED8\u8BA4\u503C</th><th style="text-align:center;">\u662F\u5426\u5FC5\u586B</th></tr></thead><tbody><tr><td style="text-align:center;"><code>arg1</code></td><td style="text-align:center;">\u7B2C\u4E00\u4E2A\u53C2\u6570</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>arg2</code></td><td style="text-align:center;">\u7B2C\u4E8C\u4E2A\u53C2\u6570</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u5426</td></tr></tbody></table></div><h2 id="%E4%BA%8B%E4%BB%B6" tabindex="-1"><a class="anchor" href="#%E4%BA%8B%E4%BB%B6">\xB6</a> \u4E8B\u4EF6</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u4E8B\u4EF6\u540D</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u53C2\u6570\u5217\u8868</th><th style="text-align:center;">\u53C2\u6570\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>click</code></td><td style="text-align:center;">\u70B9\u51FB\u4E8B\u4EF6</td><td style="text-align:center;">$event</td><td style="text-align:center;">\u539F\u751F\u7684 dom event</td></tr><tr><td style="text-align:center;"><code>customEvent</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u4E8B\u4EF6</td><td style="text-align:center;">[a, b, c]</td><td style="text-align:center;">a\uFF1A\u53C2\u6570\u4E00\uFF1Bb\uFF1A\u53C2\u6570\u4E8C\uFF1Bc\uFF1A\u53C2\u6570\u4E09</td></tr></tbody></table></div><h2 id="%E6%96%B9%E6%B3%95" tabindex="-1"><a class="anchor" href="#%E6%96%B9%E6%B3%95">\xB6</a> \u65B9\u6CD5</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u65B9\u6CD5\u540D</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u53C2\u6570\u5217\u8868</th><th style="text-align:center;">\u53C2\u6570\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>update</code></td><td style="text-align:center;">\u624B\u52A8\u66F4\u65B0</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td></tr></tbody></table></div><h2 id="%E6%8F%92%E6%A7%BD" tabindex="-1"><a class="anchor" href="#%E6%8F%92%E6%A7%BD">\xB6</a> \u63D2\u69FD</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u63D2\u69FD\u540D</th><th style="text-align:center;">\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u9ED8\u8BA4\u5185\u5BB9</td></tr></tbody></table></div>',9),J={setup(r,{expose:n}){return n({frontmatter:{}}),(a,s)=>{const t=u("demo-preview");return p(),m("div",O,[G,e(t,{"comp-name":"RichEditor","demo-name":"demo"},{default:E(()=>[e(w)]),_:1}),L,e(t,{"comp-name":"RichEditor","demo-name":"demo2"},{default:E(()=>[e(z)]),_:1}),P,e(t,{"comp-name":"RichEditor","demo-name":"demo3"},{default:E(()=>[e(F)]),_:1}),R,U,e(t,{"comp-name":"RichEditor","demo-name":"demo4"},{default:E(()=>[e(I)]),_:1}),W,j,e(t,{"comp-name":"RichEditor","demo-name":"demo5"},{default:E(()=>[e(H)]),_:1}),M])}}};export{J as default};
