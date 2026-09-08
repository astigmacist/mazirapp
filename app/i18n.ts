import translations from './translations.json';
export type Locale='ru'|'kk'|'en'|'ko'|'zh';
export type Theme='dark'|'light'|'system';
export const languages:{id:Locale;native:string;label:string;tag:string}[]=[{id:'ru',native:'Русский',label:'Русский',tag:'ru'},{id:'kk',native:'Қазақша',label:'Казахский',tag:'kk'},{id:'en',native:'English',label:'Английский',tag:'en'},{id:'ko',native:'한국어',label:'Корейский',tag:'ko'},{id:'zh',native:'简体中文',label:'Китайский',tag:'zh-Hans'}];
export const localeTags:Record<Locale,string>={ru:'ru-RU',kk:'kk-KZ',en:'en-GB',ko:'ko-KR',zh:'zh-CN'};
export const storageKey='mazir-appearance-v1';
export function parsePreferences(value:string|null):{locale:Locale;theme:Theme}{try{const p=JSON.parse(value||'{}');return {locale:languages.some(x=>x.id===p.locale)?p.locale:'ru',theme:['light','dark','system'].includes(p.theme)?p.theme:'system'}}catch{return {locale:'ru',theme:'system'}}}
export const dictionary=translations as Record<string,Record<Exclude<Locale,'ru'>,string>>;
const byLower=new Map(Object.entries(dictionary).map(([key,value])=>[key.toLowerCase(),value]));
const escape=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const fragments=Object.keys(dictionary).sort((a,b)=>b.length-a.length).map(escape).join('|');
const fragmentPattern=new RegExp('(?<![\\p{L}])(?:'+fragments+')(?![\\p{L}])','giu');
export function formatMoney(n:number,locale:Locale){return new Intl.NumberFormat(localeTags[locale],{maximumFractionDigits:0}).format(n)+' ₸'}
export function translate(value:string,locale:Locale){if(locale==='ru')return value;const trim=value.trim().replace(/\s+/g,' ');const exact=dictionary[trim]||byLower.get(trim.toLowerCase());if(exact)return (value.match(/^\s*/)?.[0]||'')+exact[locale]+(value.match(/\s*$/)?.[0]||'');if(/^\d{4}-\d{2}-\d{2}$/.test(trim)){const date=new Date(trim+'T12:00:00Z');if(!Number.isNaN(date.getTime()))return new Intl.DateTimeFormat(localeTags[locale],{day:'numeric',month:'long',timeZone:'UTC'}).format(date)}return value.replace(fragmentPattern,key=>(dictionary[key]||byLower.get(key.toLowerCase()))?.[locale]||key)}
export function matchesLocalized(query:string,value:string,locale:Locale){const normalize=(s:string)=>s.normalize('NFKC').toLocaleLowerCase(localeTags[locale]);return normalize(value).includes(normalize(query))||normalize(translate(value,locale)).includes(normalize(query))}

export function resolveTheme(theme:Theme,systemDark:boolean):'dark'|'light'{return theme==='system'?(systemDark?'dark':'light'):theme}
