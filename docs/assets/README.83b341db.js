import{d as h,s as u,r as i,o as s,b as r,a5 as d,w as p,X as l,a9 as m,bb as x}from"./vendor.58e925f9.js";const b=h({setup(c){const a=u(`
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
`);return(o,e)=>{const n=i("fz-rich-editor");return s(),r("div",null,[d(n,{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=t=>a.value=t)},null,8,["modelValue"])])}}}),_=h({setup(c){const a=u(`
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
`);return(o,e)=>{const n=i("fz-rich-editor");return s(),r("div",null,[d(n,{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=t=>a.value=t)},null,8,["modelValue"])])}}}),E=h({setup(c){const o={image:{beforeInsert:()=>new Promise(n=>{console.log("\u56FE\u7247\u4E0A\u4F20\uFF01\uFF01\uFF01"),setTimeout(()=>{console.log("\u56FE\u7247\u4E0A\u4F20\u6210\u529F\uFF01\uFF01\uFF01"),n({src:"https://source.unsplash.com/8xznAGy4HcY/800x400",alt:"\u52A0\u8F7D\u5931\u8D25",title:"\u8FD9\u662F\u4E00\u5F20\u56FE\u7247"})},1e3)})}},e=u(`
        <h2>
          Image
        </h2>
        <p>
          This is a basic example of implementing images. Drag to re-order.
        </p>
        <p>
          <img src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt title="This is a cat!!" />
        </p>
`);return(n,t)=>{const y=i("fz-rich-editor");return s(),r("div",null,[d(y,{modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=g=>e.value=g),options:o},null,8,["modelValue"])])}}}),f={class:"markdown-body"},v=l("h1",{id:"%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8",tabindex:"-1"},"\u5BCC\u6587\u672C\u7F16\u8F91\u5668",-1),F=l("p",null,[m("\u7528\u4E8E\u7F16\u8F91\u4E30\u5BCC\u7684\u6587\u672C\u5185\u5BB9\u7F16\u8F91\u5668\uFF0C\u57FA\u4E8E"),l("a",{href:"https://tiptap.dev/"},"tiptap \u7F16\u8F91\u5668"),m("\u6784\u5EFA\u3002")],-1),B=l("h2",{id:"%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95",tabindex:"-1"},"\u57FA\u7840\u7528\u6CD5",-1),A=l("h2",{id:"%E8%A1%A8%E6%A0%BC%E6%8F%92%E5%85%A5",tabindex:"-1"},"\u8868\u683C\u63D2\u5165",-1),k=l("h2",{id:"%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E7%89%87%E4%B8%8A%E4%BC%A0%E9%80%BB%E8%BE%91",tabindex:"-1"},"\u81EA\u5B9A\u4E49\u56FE\u7247\u4E0A\u4F20\u903B\u8F91",-1),w=x('<h2 id="%E5%B1%9E%E6%80%A7" tabindex="-1">\u5C5E\u6027</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u53C2\u6570</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u7C7B\u578B</th><th style="text-align:center;">\u53EF\u9009\u503C</th><th style="text-align:center;">\u9ED8\u8BA4\u503C</th><th style="text-align:center;">\u662F\u5426\u5FC5\u586B</th></tr></thead><tbody><tr><td style="text-align:center;"><code>arg1</code></td><td style="text-align:center;">\u7B2C\u4E00\u4E2A\u53C2\u6570</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u5426</td></tr><tr><td style="text-align:center;"><code>arg2</code></td><td style="text-align:center;">\u7B2C\u4E8C\u4E2A\u53C2\u6570</td><td style="text-align:center;">string</td><td style="text-align:center;">-</td><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u5426</td></tr></tbody></table></div><h2 id="%E4%BA%8B%E4%BB%B6" tabindex="-1">\u4E8B\u4EF6</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u4E8B\u4EF6\u540D</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u53C2\u6570\u5217\u8868</th><th style="text-align:center;">\u53C2\u6570\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>click</code></td><td style="text-align:center;">\u70B9\u51FB\u4E8B\u4EF6</td><td style="text-align:center;">$event</td><td style="text-align:center;">\u539F\u751F\u7684 dom event</td></tr><tr><td style="text-align:center;"><code>customEvent</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u4E8B\u4EF6</td><td style="text-align:center;">[a, b, c]</td><td style="text-align:center;">a\uFF1A\u53C2\u6570\u4E00\uFF1Bb\uFF1A\u53C2\u6570\u4E8C\uFF1Bc\uFF1A\u53C2\u6570\u4E09</td></tr></tbody></table></div><h2 id="%E6%96%B9%E6%B3%95" tabindex="-1">\u65B9\u6CD5</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u65B9\u6CD5\u540D</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:center;">\u53C2\u6570\u5217\u8868</th><th style="text-align:center;">\u53C2\u6570\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>update</code></td><td style="text-align:center;">\u624B\u52A8\u66F4\u65B0</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td></tr></tbody></table></div><h2 id="%E6%8F%92%E6%A7%BD" tabindex="-1">\u63D2\u69FD</h2><div class="doc-table"><table><thead><tr><th style="text-align:center;">\u63D2\u69FD\u540D</th><th style="text-align:center;">\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:center;"><code>default</code></td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u9ED8\u8BA4\u5185\u5BB9</td></tr></tbody></table></div>',8),C={setup(c,{expose:a}){return a({frontmatter:{}}),(e,n)=>{const t=i("demo-preview");return s(),r("div",f,[v,F,B,d(t,{"comp-name":"RichEditor","demo-name":"demo"},{default:p(()=>[d(b)]),_:1}),A,d(t,{"comp-name":"RichEditor","demo-name":"demo2"},{default:p(()=>[d(_)]),_:1}),k,d(t,{"comp-name":"RichEditor","demo-name":"demo3"},{default:p(()=>[d(E)]),_:1}),w])}}};export{C as default};
