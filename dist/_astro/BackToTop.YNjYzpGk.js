import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as e}from"./index.B5xx_DHV.js";import{c as a}from"./createLucideIcon.BRXPTPCu.js";/**
 * @license lucide-react v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],c=a("ArrowUp",i);function w(){const[r,s]=e.useState(!1);e.useEffect(()=>{const o=()=>s(window.scrollY>600);return o(),window.addEventListener("scroll",o,{passive:!0}),()=>window.removeEventListener("scroll",o)},[]);const n=()=>window.scrollTo({top:0,behavior:"smooth"});return t.jsx("button",{onClick:n,"aria-label":"Nach oben",className:`fixed right-5 bottom-5 z-[55] rounded-full border border-white/15 bg-white/10 backdrop-blur p-3 shadow-sm hover:bg-white/15 transition
      ${r?"opacity-100 translate-y-0":"opacity-0 translate-y-3 pointer-events-none"}`,children:t.jsx(c,{className:"h-5 w-5"})})}export{w as default};
