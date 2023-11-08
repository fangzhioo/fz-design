var Popper=function(l){"use strict";var E="top",L="bottom",R="right",A="left",le="auto",Y=[E,L,R,A],z="start",J="end",qe="clippingParents",xe="viewport",K="popper",Ve="reference",$e=Y.reduce(function(t,e){return t.concat([e+"-"+z,e+"-"+J])},[]),je=[].concat(Y,[le]).reduce(function(t,e){return t.concat([e,e+"-"+z,e+"-"+J])},[]),Ne="beforeRead",_e="read",Ie="afterRead",ze="beforeMain",Fe="main",Ue="afterMain",Ge="beforeWrite",Xe="write",Ye="afterWrite",Je=[Ne,_e,Ie,ze,Fe,Ue,Ge,Xe,Ye];function q(t){return t?(t.nodeName||"").toLowerCase():null}function T(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function Q(t){var e=T(t).Element;return t instanceof e||t instanceof Element}function S(t){var e=T(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function De(t){if(typeof ShadowRoot=="undefined")return!1;var e=T(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function Dt(t){var e=t.state;Object.keys(e.elements).forEach(function(n){var r=e.styles[n]||{},i=e.attributes[n]||{},o=e.elements[n];!S(o)||!q(o)||(Object.assign(o.style,r),Object.keys(i).forEach(function(a){var f=i[a];f===!1?o.removeAttribute(a):o.setAttribute(a,f===!0?"":f)}))})}function Pt(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,n.popper),e.styles=n,e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow),function(){Object.keys(e.elements).forEach(function(r){var i=e.elements[r],o=e.attributes[r]||{},a=Object.keys(e.styles.hasOwnProperty(r)?e.styles[r]:n[r]),f=a.reduce(function(s,c){return s[c]="",s},{});!S(i)||!q(i)||(Object.assign(i.style,f),Object.keys(o).forEach(function(s){i.removeAttribute(s)}))})}}var Pe={name:"applyStyles",enabled:!0,phase:"write",fn:Dt,effect:Pt,requires:["computeStyles"]};function V(t){return t.split("-")[0]}var F=Math.max,pe=Math.min,Z=Math.round;function ee(t,e){e===void 0&&(e=!1);var n=t.getBoundingClientRect(),r=1,i=1;if(S(t)&&e){var o=t.offsetHeight,a=t.offsetWidth;a>0&&(r=Z(n.width)/a||1),o>0&&(i=Z(n.height)/o||1)}return{width:n.width/r,height:n.height/i,top:n.top/i,right:n.right/r,bottom:n.bottom/i,left:n.left/r,x:n.left/r,y:n.top/i}}function Ee(t){var e=ee(t),n=t.offsetWidth,r=t.offsetHeight;return Math.abs(e.width-n)<=1&&(n=e.width),Math.abs(e.height-r)<=1&&(r=e.height),{x:t.offsetLeft,y:t.offsetTop,width:n,height:r}}function Ke(t,e){var n=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(n&&De(n)){var r=e;do{if(r&&t.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function N(t){return T(t).getComputedStyle(t)}function Et(t){return["table","td","th"].indexOf(q(t))>=0}function I(t){return((Q(t)?t.ownerDocument:t.document)||window.document).documentElement}function de(t){return q(t)==="html"?t:t.assignedSlot||t.parentNode||(De(t)?t.host:null)||I(t)}function Qe(t){return!S(t)||N(t).position==="fixed"?null:t.offsetParent}function At(t){var e=navigator.userAgent.toLowerCase().indexOf("firefox")!==-1,n=navigator.userAgent.indexOf("Trident")!==-1;if(n&&S(t)){var r=N(t);if(r.position==="fixed")return null}var i=de(t);for(De(i)&&(i=i.host);S(i)&&["html","body"].indexOf(q(i))<0;){var o=N(i);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||e&&o.willChange==="filter"||e&&o.filter&&o.filter!=="none")return i;i=i.parentNode}return null}function ie(t){for(var e=T(t),n=Qe(t);n&&Et(n)&&N(n).position==="static";)n=Qe(n);return n&&(q(n)==="html"||q(n)==="body"&&N(n).position==="static")?e:n||At(t)||e}function Ae(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function oe(t,e,n){return F(t,pe(e,n))}function Mt(t,e,n){var r=oe(t,e,n);return r>n?n:r}function Ze(){return{top:0,right:0,bottom:0,left:0}}function et(t){return Object.assign({},Ze(),t)}function tt(t,e){return e.reduce(function(n,r){return n[r]=t,n},{})}var kt=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,et(typeof t!="number"?t:tt(t,Y))};function Lt(t){var e,n=t.state,r=t.name,i=t.options,o=n.elements.arrow,a=n.modifiersData.popperOffsets,f=V(n.placement),s=Ae(f),c=[A,R].indexOf(f)>=0,p=c?"height":"width";if(!(!o||!a)){var v=kt(i.padding,n),g=Ee(o),d=s==="y"?E:A,h=s==="y"?L:R,u=n.rects.reference[p]+n.rects.reference[s]-a[s]-n.rects.popper[p],y=a[s]-n.rects.reference[s],x=ie(o),b=x?s==="y"?x.clientHeight||0:x.clientWidth||0:0,j=u/2-y/2,m=v[d],w=b-g[p]-v[h],O=b/2-g[p]/2+j,$=oe(m,O,w),D=s;n.modifiersData[r]=(e={},e[D]=$,e.centerOffset=$-O,e)}}function Rt(t){var e=t.state,n=t.options,r=n.element,i=r===void 0?"[data-popper-arrow]":r;i!=null&&(typeof i=="string"&&(i=e.elements.popper.querySelector(i),!i)||!Ke(e.elements.popper,i)||(e.elements.arrow=i))}var nt={name:"arrow",enabled:!0,phase:"main",fn:Lt,effect:Rt,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function te(t){return t.split("-")[1]}var Wt={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Bt(t){var e=t.x,n=t.y,r=window,i=r.devicePixelRatio||1;return{x:Z(e*i)/i||0,y:Z(n*i)/i||0}}function rt(t){var e,n=t.popper,r=t.popperRect,i=t.placement,o=t.variation,a=t.offsets,f=t.position,s=t.gpuAcceleration,c=t.adaptive,p=t.roundOffsets,v=t.isFixed,g=a.x,d=g===void 0?0:g,h=a.y,u=h===void 0?0:h,y=typeof p=="function"?p({x:d,y:u}):{x:d,y:u};d=y.x,u=y.y;var x=a.hasOwnProperty("x"),b=a.hasOwnProperty("y"),j=A,m=E,w=window;if(c){var O=ie(n),$="clientHeight",D="clientWidth";if(O===T(n)&&(O=I(n),N(O).position!=="static"&&f==="absolute"&&($="scrollHeight",D="scrollWidth")),O=O,i===E||(i===A||i===R)&&o===J){m=L;var M=v&&O===w&&w.visualViewport?w.visualViewport.height:O[$];u-=M-r.height,u*=s?1:-1}if(i===A||(i===E||i===L)&&o===J){j=R;var k=v&&O===w&&w.visualViewport?w.visualViewport.width:O[D];d-=k-r.width,d*=s?1:-1}}var P=Object.assign({position:f},c&&Wt),H=p===!0?Bt({x:d,y:u}):{x:d,y:u};if(d=H.x,u=H.y,s){var W;return Object.assign({},P,(W={},W[m]=b?"0":"",W[j]=x?"0":"",W.transform=(w.devicePixelRatio||1)<=1?"translate("+d+"px, "+u+"px)":"translate3d("+d+"px, "+u+"px, 0)",W))}return Object.assign({},P,(e={},e[m]=b?u+"px":"",e[j]=x?d+"px":"",e.transform="",e))}function St(t){var e=t.state,n=t.options,r=n.gpuAcceleration,i=r===void 0?!0:r,o=n.adaptive,a=o===void 0?!0:o,f=n.roundOffsets,s=f===void 0?!0:f,c={placement:V(e.placement),variation:te(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:i,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,rt(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:a,roundOffsets:s})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,rt(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}var Me={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:St,data:{}},me={passive:!0};function Tt(t){var e=t.state,n=t.instance,r=t.options,i=r.scroll,o=i===void 0?!0:i,a=r.resize,f=a===void 0?!0:a,s=T(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&c.forEach(function(p){p.addEventListener("scroll",n.update,me)}),f&&s.addEventListener("resize",n.update,me),function(){o&&c.forEach(function(p){p.removeEventListener("scroll",n.update,me)}),f&&s.removeEventListener("resize",n.update,me)}}var ke={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Tt,data:{}},Ht={left:"right",right:"left",bottom:"top",top:"bottom"};function he(t){return t.replace(/left|right|bottom|top/g,function(e){return Ht[e]})}var Ct={start:"end",end:"start"};function it(t){return t.replace(/start|end/g,function(e){return Ct[e]})}function Le(t){var e=T(t),n=e.pageXOffset,r=e.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Re(t){return ee(I(t)).left+Le(t).scrollLeft}function qt(t){var e=T(t),n=I(t),r=e.visualViewport,i=n.clientWidth,o=n.clientHeight,a=0,f=0;return r&&(i=r.width,o=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(a=r.offsetLeft,f=r.offsetTop)),{width:i,height:o,x:a+Re(t),y:f}}function Vt(t){var e,n=I(t),r=Le(t),i=(e=t.ownerDocument)==null?void 0:e.body,o=F(n.scrollWidth,n.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),a=F(n.scrollHeight,n.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),f=-r.scrollLeft+Re(t),s=-r.scrollTop;return N(i||n).direction==="rtl"&&(f+=F(n.clientWidth,i?i.clientWidth:0)-o),{width:o,height:a,x:f,y:s}}function We(t){var e=N(t),n=e.overflow,r=e.overflowX,i=e.overflowY;return/auto|scroll|overlay|hidden/.test(n+i+r)}function ot(t){return["html","body","#document"].indexOf(q(t))>=0?t.ownerDocument.body:S(t)&&We(t)?t:ot(de(t))}function ae(t,e){var n;e===void 0&&(e=[]);var r=ot(t),i=r===((n=t.ownerDocument)==null?void 0:n.body),o=T(r),a=i?[o].concat(o.visualViewport||[],We(r)?r:[]):r,f=e.concat(a);return i?f:f.concat(ae(de(a)))}function Be(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Nt(t){var e=ee(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}function at(t,e){return e===xe?Be(qt(t)):Q(e)?Nt(e):Be(Vt(I(t)))}function _t(t){var e=ae(de(t)),n=["absolute","fixed"].indexOf(N(t).position)>=0,r=n&&S(t)?ie(t):t;return Q(r)?e.filter(function(i){return Q(i)&&Ke(i,r)&&q(i)!=="body"}):[]}function It(t,e,n){var r=e==="clippingParents"?_t(t):[].concat(e),i=[].concat(r,[n]),o=i[0],a=i.reduce(function(f,s){var c=at(t,s);return f.top=F(c.top,f.top),f.right=pe(c.right,f.right),f.bottom=pe(c.bottom,f.bottom),f.left=F(c.left,f.left),f},at(t,o));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function ft(t){var e=t.reference,n=t.element,r=t.placement,i=r?V(r):null,o=r?te(r):null,a=e.x+e.width/2-n.width/2,f=e.y+e.height/2-n.height/2,s;switch(i){case E:s={x:a,y:e.y-n.height};break;case L:s={x:a,y:e.y+e.height};break;case R:s={x:e.x+e.width,y:f};break;case A:s={x:e.x-n.width,y:f};break;default:s={x:e.x,y:e.y}}var c=i?Ae(i):null;if(c!=null){var p=c==="y"?"height":"width";switch(o){case z:s[c]=s[c]-(e[p]/2-n[p]/2);break;case J:s[c]=s[c]+(e[p]/2-n[p]/2);break}}return s}function ne(t,e){e===void 0&&(e={});var n=e,r=n.placement,i=r===void 0?t.placement:r,o=n.boundary,a=o===void 0?qe:o,f=n.rootBoundary,s=f===void 0?xe:f,c=n.elementContext,p=c===void 0?K:c,v=n.altBoundary,g=v===void 0?!1:v,d=n.padding,h=d===void 0?0:d,u=et(typeof h!="number"?h:tt(h,Y)),y=p===K?Ve:K,x=t.rects.popper,b=t.elements[g?y:p],j=It(Q(b)?b:b.contextElement||I(t.elements.popper),a,s),m=ee(t.elements.reference),w=ft({reference:m,element:x,strategy:"absolute",placement:i}),O=Be(Object.assign({},x,w)),$=p===K?O:m,D={top:j.top-$.top+u.top,bottom:$.bottom-j.bottom+u.bottom,left:j.left-$.left+u.left,right:$.right-j.right+u.right},M=t.modifiersData.offset;if(p===K&&M){var k=M[i];Object.keys(D).forEach(function(P){var H=[R,L].indexOf(P)>=0?1:-1,W=[E,L].indexOf(P)>=0?"y":"x";D[P]+=k[W]*H})}return D}function zt(t,e){e===void 0&&(e={});var n=e,r=n.placement,i=n.boundary,o=n.rootBoundary,a=n.padding,f=n.flipVariations,s=n.allowedAutoPlacements,c=s===void 0?je:s,p=te(r),v=p?f?$e:$e.filter(function(h){return te(h)===p}):Y,g=v.filter(function(h){return c.indexOf(h)>=0});g.length===0&&(g=v);var d=g.reduce(function(h,u){return h[u]=ne(t,{placement:u,boundary:i,rootBoundary:o,padding:a})[V(u)],h},{});return Object.keys(d).sort(function(h,u){return d[h]-d[u]})}function Ft(t){if(V(t)===le)return[];var e=he(t);return[it(t),e,it(e)]}function Ut(t){var e=t.state,n=t.options,r=t.name;if(!e.modifiersData[r]._skip){for(var i=n.mainAxis,o=i===void 0?!0:i,a=n.altAxis,f=a===void 0?!0:a,s=n.fallbackPlacements,c=n.padding,p=n.boundary,v=n.rootBoundary,g=n.altBoundary,d=n.flipVariations,h=d===void 0?!0:d,u=n.allowedAutoPlacements,y=e.options.placement,x=V(y),b=x===y,j=s||(b||!h?[he(y)]:Ft(y)),m=[y].concat(j).reduce(function(G,_){return G.concat(V(_)===le?zt(e,{placement:_,boundary:p,rootBoundary:v,padding:c,flipVariations:h,allowedAutoPlacements:u}):_)},[]),w=e.rects.reference,O=e.rects.popper,$=new Map,D=!0,M=m[0],k=0;k<m.length;k++){var P=m[k],H=V(P),W=te(P)===z,fe=[E,L].indexOf(H)>=0,se=fe?"width":"height",B=ne(e,{placement:P,boundary:p,rootBoundary:v,altBoundary:g,padding:c}),C=fe?W?R:A:W?L:E;w[se]>O[se]&&(C=he(C));var ge=he(C),U=[];if(o&&U.push(B[H]<=0),f&&U.push(B[C]<=0,B[ge]<=0),U.every(function(G){return G})){M=P,D=!1;break}$.set(P,U)}if(D)for(var ye=h?3:1,Te=function(G){var _=m.find(function(we){var ue=$.get(we);if(ue)return ue.slice(0,G).every(function(re){return re})});if(_)return M=_,"break"},ce=ye;ce>0;ce--){var be=Te(ce);if(be==="break")break}e.placement!==M&&(e.modifiersData[r]._skip=!0,e.placement=M,e.reset=!0)}}var st={name:"flip",enabled:!0,phase:"main",fn:Ut,requiresIfExists:["offset"],data:{_skip:!1}};function ct(t,e,n){return n===void 0&&(n={x:0,y:0}),{top:t.top-e.height-n.y,right:t.right-e.width+n.x,bottom:t.bottom-e.height+n.y,left:t.left-e.width-n.x}}function ut(t){return[E,R,L,A].some(function(e){return t[e]>=0})}function Gt(t){var e=t.state,n=t.name,r=e.rects.reference,i=e.rects.popper,o=e.modifiersData.preventOverflow,a=ne(e,{elementContext:"reference"}),f=ne(e,{altBoundary:!0}),s=ct(a,r),c=ct(f,i,o),p=ut(s),v=ut(c);e.modifiersData[n]={referenceClippingOffsets:s,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:v},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":v})}var lt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Gt};function Xt(t,e,n){var r=V(t),i=[A,E].indexOf(r)>=0?-1:1,o=typeof n=="function"?n(Object.assign({},e,{placement:t})):n,a=o[0],f=o[1];return a=a||0,f=(f||0)*i,[A,R].indexOf(r)>=0?{x:f,y:a}:{x:a,y:f}}function Yt(t){var e=t.state,n=t.options,r=t.name,i=n.offset,o=i===void 0?[0,0]:i,a=je.reduce(function(p,v){return p[v]=Xt(v,e.rects,o),p},{}),f=a[e.placement],s=f.x,c=f.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=s,e.modifiersData.popperOffsets.y+=c),e.modifiersData[r]=a}var pt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Yt};function Jt(t){var e=t.state,n=t.name;e.modifiersData[n]=ft({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}var Se={name:"popperOffsets",enabled:!0,phase:"read",fn:Jt,data:{}};function Kt(t){return t==="x"?"y":"x"}function Qt(t){var e=t.state,n=t.options,r=t.name,i=n.mainAxis,o=i===void 0?!0:i,a=n.altAxis,f=a===void 0?!1:a,s=n.boundary,c=n.rootBoundary,p=n.altBoundary,v=n.padding,g=n.tether,d=g===void 0?!0:g,h=n.tetherOffset,u=h===void 0?0:h,y=ne(e,{boundary:s,rootBoundary:c,padding:v,altBoundary:p}),x=V(e.placement),b=te(e.placement),j=!b,m=Ae(x),w=Kt(m),O=e.modifiersData.popperOffsets,$=e.rects.reference,D=e.rects.popper,M=typeof u=="function"?u(Object.assign({},e.rects,{placement:e.placement})):u,k=typeof M=="number"?{mainAxis:M,altAxis:M}:Object.assign({mainAxis:0,altAxis:0},M),P=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,H={x:0,y:0};if(O){if(o){var W,fe=m==="y"?E:A,se=m==="y"?L:R,B=m==="y"?"height":"width",C=O[m],ge=C+y[fe],U=C-y[se],ye=d?-D[B]/2:0,Te=b===z?$[B]:D[B],ce=b===z?-D[B]:-$[B],be=e.elements.arrow,G=d&&be?Ee(be):{width:0,height:0},_=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:Ze(),we=_[fe],ue=_[se],re=oe(0,$[B],G[B]),dn=j?$[B]/2-ye-re-we-k.mainAxis:Te-re-we-k.mainAxis,mn=j?-$[B]/2+ye+re+ue+k.mainAxis:ce+re+ue+k.mainAxis,He=e.elements.arrow&&ie(e.elements.arrow),hn=He?m==="y"?He.clientTop||0:He.clientLeft||0:0,vt=(W=P==null?void 0:P[m])!=null?W:0,vn=C+dn-vt-hn,gn=C+mn-vt,gt=oe(d?pe(ge,vn):ge,C,d?F(U,gn):U);O[m]=gt,H[m]=gt-C}if(f){var yt,yn=m==="x"?E:A,bn=m==="x"?L:R,X=O[w],Oe=w==="y"?"height":"width",bt=X+y[yn],wt=X-y[bn],Ce=[E,A].indexOf(x)!==-1,Ot=(yt=P==null?void 0:P[w])!=null?yt:0,xt=Ce?bt:X-$[Oe]-D[Oe]-Ot+k.altAxis,$t=Ce?X+$[Oe]+D[Oe]-Ot-k.altAxis:wt,jt=d&&Ce?Mt(xt,X,$t):oe(d?xt:bt,X,d?$t:wt);O[w]=jt,H[w]=jt-X}e.modifiersData[r]=H}}var dt={name:"preventOverflow",enabled:!0,phase:"main",fn:Qt,requiresIfExists:["offset"]};function Zt(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function en(t){return t===T(t)||!S(t)?Le(t):Zt(t)}function tn(t){var e=t.getBoundingClientRect(),n=Z(e.width)/t.offsetWidth||1,r=Z(e.height)/t.offsetHeight||1;return n!==1||r!==1}function nn(t,e,n){n===void 0&&(n=!1);var r=S(e),i=S(e)&&tn(e),o=I(e),a=ee(t,i),f={scrollLeft:0,scrollTop:0},s={x:0,y:0};return(r||!r&&!n)&&((q(e)!=="body"||We(o))&&(f=en(e)),S(e)?(s=ee(e,!0),s.x+=e.clientLeft,s.y+=e.clientTop):o&&(s.x=Re(o))),{x:a.left+f.scrollLeft-s.x,y:a.top+f.scrollTop-s.y,width:a.width,height:a.height}}function rn(t){var e=new Map,n=new Set,r=[];t.forEach(function(o){e.set(o.name,o)});function i(o){n.add(o.name);var a=[].concat(o.requires||[],o.requiresIfExists||[]);a.forEach(function(f){if(!n.has(f)){var s=e.get(f);s&&i(s)}}),r.push(o)}return t.forEach(function(o){n.has(o.name)||i(o)}),r}function on(t){var e=rn(t);return Je.reduce(function(n,r){return n.concat(e.filter(function(i){return i.phase===r}))},[])}function an(t){var e;return function(){return e||(e=new Promise(function(n){Promise.resolve().then(function(){e=void 0,n(t())})})),e}}function fn(t){var e=t.reduce(function(n,r){var i=n[r.name];return n[r.name]=i?Object.assign({},i,r,{options:Object.assign({},i.options,r.options),data:Object.assign({},i.data,r.data)}):r,n},{});return Object.keys(e).map(function(n){return e[n]})}var mt={placement:"bottom",modifiers:[],strategy:"absolute"};function ht(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return!e.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function ve(t){t===void 0&&(t={});var e=t,n=e.defaultModifiers,r=n===void 0?[]:n,i=e.defaultOptions,o=i===void 0?mt:i;return function(a,f,s){s===void 0&&(s=o);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},mt,o),modifiersData:{},elements:{reference:a,popper:f},attributes:{},styles:{}},p=[],v=!1,g={state:c,setOptions:function(u){var y=typeof u=="function"?u(c.options):u;h(),c.options=Object.assign({},o,c.options,y),c.scrollParents={reference:Q(a)?ae(a):a.contextElement?ae(a.contextElement):[],popper:ae(f)};var x=on(fn([].concat(r,c.options.modifiers)));return c.orderedModifiers=x.filter(function(b){return b.enabled}),d(),g.update()},forceUpdate:function(){if(!v){var u=c.elements,y=u.reference,x=u.popper;if(ht(y,x)){c.rects={reference:nn(y,ie(x),c.options.strategy==="fixed"),popper:Ee(x)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(D){return c.modifiersData[D.name]=Object.assign({},D.data)});for(var b=0;b<c.orderedModifiers.length;b++){if(c.reset===!0){c.reset=!1,b=-1;continue}var j=c.orderedModifiers[b],m=j.fn,w=j.options,O=w===void 0?{}:w,$=j.name;typeof m=="function"&&(c=m({state:c,options:O,name:$,instance:g})||c)}}}},update:an(function(){return new Promise(function(u){g.forceUpdate(),u(c)})}),destroy:function(){h(),v=!0}};if(!ht(a,f))return g;g.setOptions(s).then(function(u){!v&&s.onFirstUpdate&&s.onFirstUpdate(u)});function d(){c.orderedModifiers.forEach(function(u){var y=u.name,x=u.options,b=x===void 0?{}:x,j=u.effect;if(typeof j=="function"){var m=j({state:c,name:y,instance:g,options:b}),w=function(){};p.push(m||w)}})}function h(){p.forEach(function(u){return u()}),p=[]}return g}}var sn=ve(),cn=[ke,Se,Me,Pe],un=ve({defaultModifiers:cn}),ln=[ke,Se,Me,Pe,pt,st,dt,nt,lt],pn=ve({defaultModifiers:ln});return l.afterMain=Ue,l.afterRead=Ie,l.afterWrite=Ye,l.applyStyles=Pe,l.arrow=nt,l.auto=le,l.basePlacements=Y,l.beforeMain=ze,l.beforeRead=Ne,l.beforeWrite=Ge,l.bottom=L,l.clippingParents=qe,l.computeStyles=Me,l.createPopper=pn,l.createPopperBase=sn,l.createPopperLite=un,l.detectOverflow=ne,l.end=J,l.eventListeners=ke,l.flip=st,l.hide=lt,l.left=A,l.main=Fe,l.modifierPhases=Je,l.offset=pt,l.placements=je,l.popper=K,l.popperGenerator=ve,l.popperOffsets=Se,l.preventOverflow=dt,l.read=_e,l.reference=Ve,l.right=R,l.start=z,l.top=E,l.variationPlacements=$e,l.viewport=xe,l.write=Xe,Object.defineProperty(l,"__esModule",{value:!0}),l}({});
