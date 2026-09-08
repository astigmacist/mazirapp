import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const root=new URL('../',import.meta.url);
async function load(relative,rewrite=x=>x){const code=rewrite(fs.readFileSync(new URL(relative,root),'utf8'));const js=ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))}
const dictionary=JSON.parse(fs.readFileSync(new URL('app/translations.json',root),'utf8'));
const {translate,parsePreferences,resolveTheme}=await load('app/i18n.ts',code=>code.replace("import translations from './translations.json';",'const translations='+JSON.stringify(dictionary)+';'));
for(const [key,values] of Object.entries(dictionary))for(const locale of ['en','kk','ko','zh']){assert.ok(values[locale]?.trim(),`${key}: ${locale}`);assert.equal(translate(key,locale),values[locale])}
for(const locale of ['ru','kk','en','ko','zh'])for(const theme of ['dark','light','system'])assert.deepEqual(parsePreferences(JSON.stringify({locale,theme})),{locale,theme});
for(const bad of [null,'broken','null','[]','{}','{"locale":"fr","theme":"invalid"}'])assert.deepEqual(parsePreferences(bad),{locale:'ru',theme:'system'});
assert.equal(resolveTheme('system',true),'dark');assert.equal(resolveTheme('system',false),'light');
for(const preference of ['light','dark'])for(const systemDark of [true,false])assert.equal(resolveTheme(preference,systemDark),preference);
const {screens,tabScreens,screenHash,parseScreenHash,parentTab}=await load('app/navigation.ts');
assert.deepEqual(tabScreens,['Главная','Рестораны','Заказы','Профиль']);
for(const screen of screens){assert.equal(parseScreenHash(screenHash(screen)).screen,screen);assert.ok(tabScreens.includes(parentTab(screen)))}
assert.equal(parentTab('Настройки'),'Профиль');assert.equal(parentTab('Избранное'),'Профиль');assert.equal(parentTab('Бронирование'),'Профиль');assert.equal(parentTab('Меню'),'Рестораны');assert.equal(parentTab('Трекер'),'Заказы');
for(let restaurantId=1;restaurantId<=3;restaurantId++)for(let dishId=1;dishId<=6;dishId++)assert.deepEqual(parseScreenHash(screenHash('Блюдо',restaurantId,dishId)),{screen:'Блюдо',restaurantId,dishId});
for(const hash of ['#restaurant/99','#screen/%ZZ','#screen/Unknown'])assert.equal(parseScreenHash(hash).screen,'Главная');
console.log('Passed: four tabs, all routes, 15 saved preferences, system appearance overrides and '+Object.keys(dictionary).length+' translations in four additional languages.');
