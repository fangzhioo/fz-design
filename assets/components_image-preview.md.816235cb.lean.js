import{d as u,h as D,C as n,o as e,c as C,H as E,w as l,a as p,b as k,e as b,F as m,l as h,k as a,Q as w}from"./chunks/framework.0391d42f.js";const A=u({__name:"basic",setup(i){const s=D(!1),o=["https://pic2.zhimg.com/80/v2-fc5251c9a88b62bd7d2de6dd0706bce1_1440w.webp","https://pic3.zhimg.com/80/v2-cea87b3d83d24e0dd550f57446b4bc06_1440w.webp","https://pic2.zhimg.com/80/v2-e30dce18f800f8836a0a17a9057084ad_1440w.webp","https://pic4.zhimg.com/80/v2-1b3d0de324b13c2161760036c5641e33_1440w.webp","https://pic3.zhimg.com/80/v2-79500087812de7ae188a44a3b6097ed2_1440w.webp","https://pic3.zhimg.com/80/v2-45feb9cc46c8bb8bb52cd6ec3f89c0f2_1440w.webp","https://pic1.zhimg.com/80/v2-1f6a2bf7b07cb09c272570b8b3b0c228_1440w.webp","https://pic2.zhimg.com/80/v2-578aa5b2d99e1ba42e075ad50a3560d1_1440w.webp","https://pic4.zhimg.com/80/v2-3d3a557a8d1c41dc7353255073b94ecb_1440w.webp"],c=()=>{s.value=!1},t=()=>{console.log("switchViewer")},d=()=>{s.value=!0};return(y,x)=>{const r=n("fz-button"),F=n("fz-image-preview");return e(),C(m,null,[E(r,{onClick:d},{default:l(()=>[p(" 开始预览 ")]),_:1}),s.value?(e(),k(F,{key:0,"z-index":9999,"url-list":o,"close-on-press-escape":"",onClose:c,onSwitch:t})):b("",!0)],64)}}}),g=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"})),_=a("h1",{id:"imagepreview-图片预览",tabindex:"-1"},[p("ImagePreview 图片预览 "),a("a",{class:"header-anchor",href:"#imagepreview-图片预览","aria-label":'Permalink to "ImagePreview 图片预览"'},"​")],-1),v=a("p",null,"图片预览",-1),f=a("h2",{id:"基本用法",tabindex:"-1"},[p("基本用法 "),a("a",{class:"header-anchor",href:"#基本用法","aria-label":'Permalink to "基本用法"'},"​")],-1),z=a("p",null,"image-preview/basic",-1),V=w("",4),P=JSON.parse('{"title":"ImagePreview 图片预览","description":"","frontmatter":{},"headers":[],"relativePath":"components/image-preview.md","filePath":"components/image-preview.md","lastUpdated":1698110768000}'),B={name:"components/image-preview.md"},q=Object.assign(B,{setup(i){const s=Object.assign({"../demos/image-preview/basic.vue":g});return(o,c)=>{const t=n("vp-demo");return e(),C("div",null,[_,v,f,E(t,{demos:h(s),source:"%3Cpre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Escript%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Ets%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Esetup%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20script%22%3E%3Cspan%20class%3D%22token%20language-javascript%22%3E%0A%20%20%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20ref%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20showViewer%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20boolean%22%3Efalse%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20urls%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%5B%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20string%22%3E'https%3A%2F%2Fpic2.zhimg.com%2F80%2Fv2-fc5251c9a88b62bd7d2de6dd0706bce1_1440w.webp'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20string%22%3E'https%3A%2F%2Fpic3.zhimg.com%2F80%2Fv2-cea87b3d83d24e0dd550f57446b4bc06_1440w.webp'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20string%22%3E'https%3A%2F%2Fpic2.zhimg.com%2F80%2Fv2-e30dce18f800f8836a0a17a9057084ad_1440w.webp'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20string%22%3E'https%3A%2F%2Fpic4.zhimg.com%2F80%2Fv2-1b3d0de324b13c2161760036c5641e33_1440w.webp'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20string%22%3E'https%3A%2F%2Fpic3.zhimg.com%2F80%2Fv2-79500087812de7ae188a44a3b6097ed2_1440w.webp'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20string%22%3E'https%3A%2F%2Fpic3.zhimg.com%2F80%2Fv2-45feb9cc46c8bb8bb52cd6ec3f89c0f2_1440w.webp'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20string%22%3E'https%3A%2F%2Fpic1.zhimg.com%2F80%2Fv2-1f6a2bf7b07cb09c272570b8b3b0c228_1440w.webp'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20string%22%3E'https%3A%2F%2Fpic2.zhimg.com%2F80%2Fv2-578aa5b2d99e1ba42e075ad50a3560d1_1440w.webp'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20string%22%3E'https%3A%2F%2Fpic4.zhimg.com%2F80%2Fv2-3d3a557a8d1c41dc7353255073b94ecb_1440w.webp'%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%5D%3C%2Fspan%3E%0A%0A%20%20%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20closeViewer%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20parameter%22%3E%3Cspan%20class%3D%22token%20keyword%22%3Evoid%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%20%20showViewer%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3Evalue%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20boolean%22%3Efalse%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%0A%20%20%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20switchViewer%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20parameter%22%3E%3Cspan%20class%3D%22token%20keyword%22%3Evoid%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%20%20console%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Elog%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E'switchViewer'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%0A%20%20%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20handleToggle%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20parameter%22%3E%3Cspan%20class%3D%22token%20keyword%22%3Evoid%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%20%20showViewer%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3Evalue%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20boolean%22%3Etrue%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Escript%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Efz-button%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%40click%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EhandleToggle%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%20%E5%BC%80%E5%A7%8B%E9%A2%84%E8%A7%88%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Efz-button%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Efz-image-preview%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3Ev-if%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EshowViewer%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Az-index%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E9999%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aurl-list%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Eurls%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3Eclose-on-press-escape%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%40close%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EcloseViewer%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%40switch%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EswitchViewer%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"image-preview/basic","raw-source":"%3Cscript%20lang%3D%22ts%22%20setup%3E%0A%20%20import%20%7B%20ref%20%7D%20from%20'vue'%0A%20%20const%20showViewer%20%3D%20ref(false)%0A%20%20const%20urls%20%3D%20%5B%0A%20%20%20%20'https%3A%2F%2Fpic2.zhimg.com%2F80%2Fv2-fc5251c9a88b62bd7d2de6dd0706bce1_1440w.webp'%2C%0A%20%20%20%20'https%3A%2F%2Fpic3.zhimg.com%2F80%2Fv2-cea87b3d83d24e0dd550f57446b4bc06_1440w.webp'%2C%0A%20%20%20%20'https%3A%2F%2Fpic2.zhimg.com%2F80%2Fv2-e30dce18f800f8836a0a17a9057084ad_1440w.webp'%2C%0A%20%20%20%20'https%3A%2F%2Fpic4.zhimg.com%2F80%2Fv2-1b3d0de324b13c2161760036c5641e33_1440w.webp'%2C%0A%20%20%20%20'https%3A%2F%2Fpic3.zhimg.com%2F80%2Fv2-79500087812de7ae188a44a3b6097ed2_1440w.webp'%2C%0A%20%20%20%20'https%3A%2F%2Fpic3.zhimg.com%2F80%2Fv2-45feb9cc46c8bb8bb52cd6ec3f89c0f2_1440w.webp'%2C%0A%20%20%20%20'https%3A%2F%2Fpic1.zhimg.com%2F80%2Fv2-1f6a2bf7b07cb09c272570b8b3b0c228_1440w.webp'%2C%0A%20%20%20%20'https%3A%2F%2Fpic2.zhimg.com%2F80%2Fv2-578aa5b2d99e1ba42e075ad50a3560d1_1440w.webp'%2C%0A%20%20%20%20'https%3A%2F%2Fpic4.zhimg.com%2F80%2Fv2-3d3a557a8d1c41dc7353255073b94ecb_1440w.webp'%0A%20%20%5D%0A%0A%20%20const%20closeViewer%20%3D%20()%3A%20void%20%3D%3E%20%7B%0A%20%20%20%20showViewer.value%20%3D%20false%0A%20%20%7D%0A%0A%20%20const%20switchViewer%20%3D%20()%3A%20void%20%3D%3E%20%7B%0A%20%20%20%20console.log('switchViewer')%0A%20%20%7D%0A%0A%20%20const%20handleToggle%20%3D%20()%3A%20void%20%3D%3E%20%7B%0A%20%20%20%20showViewer.value%20%3D%20true%0A%20%20%7D%0A%3C%2Fscript%3E%0A%0A%3Ctemplate%3E%0A%20%20%3Cfz-button%20%40click%3D%22handleToggle%22%3E%20%E5%BC%80%E5%A7%8B%E9%A2%84%E8%A7%88%20%3C%2Ffz-button%3E%0A%0A%20%20%3Cfz-image-preview%0A%20%20%20%20v-if%3D%22showViewer%22%0A%20%20%20%20%3Az-index%3D%229999%22%0A%20%20%20%20%3Aurl-list%3D%22urls%22%0A%20%20%20%20close-on-press-escape%0A%20%20%20%20%40close%3D%22closeViewer%22%0A%20%20%20%20%40switch%3D%22switchViewer%22%0A%20%20%2F%3E%0A%3C%2Ftemplate%3E%0A",description:""},{default:l(()=>[z]),_:1},8,["demos"]),V])}}});export{P as __pageData,q as default};
