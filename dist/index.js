async function f({config:e,$fs:n,$import:t}){let s=[];for(let r of e.languages){let i=await c(n,t,r);s.push(u(i,r))}return s}var c=async(e,n,t)=>{let i=(await e.readFile(`src/i18n/${t}/index.ts`,"utf-8")).toString().split(`
`).filter(a=>!a.trim().startsWith("import ")).join(`
`).replace(/:.*=/g," =");await e.writeFile(`${t}.temp.js`,i);let o=(await n(`${t}.temp.js`)).default;return await e.rm(`${t}.temp.js`),o},u=(e,n)=>({type:"Resource",languageTag:{type:"LanguageTag",language:n},body:Object.entries(e).map(([t,s])=>g(t,s))}),g=(e,n)=>({type:"Message",id:{type:"Identifier",name:e},pattern:{type:"Pattern",elements:[{type:"Text",value:n}]}});async function m(e){for(let n of e.resources){let t=n.languageTag.language,s=p(n),r=t===e.config.referenceLanguage?"BaseTranslation":"Translation",i=`import type { ${r} } from './src/i18n/i18n-types'

const ${t}: ${r} = ${s}

export default ${t}`;await e.$fs.writeFile(`${t}.ts`,i)}}var p=e=>{let n=Object.fromEntries(e.body.map(l));return JSON.stringify(n,null,3)};function l(e){return[e.id.name,e.pattern.elements[0].value]}export{f as readResources,m as writeResources};
