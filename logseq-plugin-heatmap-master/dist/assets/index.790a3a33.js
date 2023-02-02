import{f as c,p as b,R as a,r as m,u as p,j as g,a as q}from"./vendor.415db1c0.js";const x=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}};x();const v="modulepreload",d={},S="",w=function(o,s){return!s||s.length===0?o():Promise.all(s.map(r=>{if(r=`${S}${r}`,r in d)return;d[r]=!0;const t=r.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${n}`))return;const i=document.createElement("link");if(i.rel=t?"stylesheet":v,t||(i.as="script",i.crossOrigin=""),i.href=r,document.head.appendChild(i),t)return new Promise((h,M)=>{i.addEventListener("load",h),i.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>o())},f="logseq-heatmap-trigger-icon",I=()=>{const[e,o]=m.exports.useState(logseq.isMainUIVisible),s=p();return a.useEffect(()=>{const r="ui:visible:changed",t=async({visible:n})=>{s()&&o(n)};return logseq.on(r,t),()=>{logseq.off(r,t)}},[s]),e},A=()=>{const[e,o]=a.useState(null),s=a.useCallback(async()=>{const r=await logseq.Editor.getCurrentPage();o(r)},[]);return a.useEffect(()=>(s(),logseq.App.onRouteChanged(s)),[s]),e},R=()=>{const e=A();return a.useMemo(()=>e&&e["journal?"]&&e.journalDay?k(e.journalDay):null,[e])},D=()=>{const e=p(),[o,s]=a.useState("light");return a.useEffect(()=>{s(top?.document.querySelector("html")?.getAttribute("data-theme")??(matchMedia("prefers-color-scheme: dark").matches?"dark":"light")),logseq.App.onThemeModeChanged(r=>{console.log(r),e()&&s(r.mode)})},[e]),o};let y="MMM do, yyyy";async function E(){let e=(await logseq.App.getUserConfigs())?.preferredDateFormat??"MMM do, yyyy";return y=e,e}const u=e=>typeof e!="string"?e:new Date(e),N=e=>c(u(e),"yyyy-MM-dd"),O=e=>c(u(e),"yyyyMMdd"),U=e=>c(u(e),y),k=e=>b(`${e}`,"yyyyMMdd",new Date),l=g.exports.jsx,_=g.exports.jsxs,C=a.lazy(()=>w(()=>import("./Heatmap.db8e2c58.js"),["assets/Heatmap.db8e2c58.js","assets/Heatmap.ced616a6.css","assets/vendor.415db1c0.js"]).then(e=>({default:e.Heatmap})));function P(){const e=m.exports.useRef(null),o=I(),s=D(),[r,t]=a.useState(o);return a.useEffect(()=>{if(o)t(!0);else{const n=setTimeout(()=>{t(!1)},1e3);return()=>{clearTimeout(n)}}},[o]),r?l(a.Suspense,{fallback:"loading...",children:l("main",{className:`absolute inset-0 ${s}`,onClick:n=>{e.current?.contains(n.target)||window.logseq.hideMainUI()},children:l(C,{ref:e})})}):null}const j=(e,...o)=>String.raw(e,...o);function $(){const e=logseq.baseInfo.id;console.info(`#${e}: MAIN`),q.render(l(a.StrictMode,{children:l(P,{})}),document.getElementById("app"));function o(){return{async show(){await E(),logseq.showMainUI()}}}logseq.provideModel(o()),logseq.setMainUIInlineStyle({zIndex:11,maxWidth:"calc(100% - 10px)"}),logseq.provideStyle(j`
    .${f} {
      width: 18px;
      height: 18px;
      margin: 2px 0.4em 0 0.4em;
      background-color: #26a641;
      border-radius: 4px;
      border: 1px solid #eee;
    }
  `),logseq.App.registerUIItem("toolbar",{key:"heatmap-plugin-open",template:`
    <a data-on-click="show">
      <div class="${f}"></div>
    </a>
  `})}logseq.ready($).catch(console.error);export{_ as a,U as b,O as c,N as f,l as j,k as p,f as t,R as u};