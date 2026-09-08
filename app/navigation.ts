export const screens=['Главная','Рестораны','Бронирование','Заказы','Избранное','Профиль','Меню','Блюдо','Корзина','Оформление','Трекер','Адреса','Бонусы','Настройки','Поддержка','Карта макетов'] as const;
export type Screen=typeof screens[number];
export function screenHash(screen:Screen,restaurantId=1,dishId=1){if(screen==='Меню')return '#restaurant/'+restaurantId;if(screen==='Блюдо')return '#restaurant/'+restaurantId+'/dish/'+dishId;return screen==='Главная'?'#home':'#screen/'+encodeURIComponent(screen)}
export function parseScreenHash(hash:string){const match=hash.match(/^#restaurant\/([1-3])(?:\/dish\/([1-6]))?$/);if(match)return {screen:(match[2]?'Блюдо':'Меню') as Screen,restaurantId:Number(match[1]),dishId:Number(match[2]||1)};let screen:Screen='Главная';try{const decoded=decodeURIComponent(hash.replace(/^#screen\//,''));if(screens.includes(decoded as Screen))screen=decoded as Screen}catch{}return {screen,restaurantId:1,dishId:1}}

export const tabScreens=['Главная','Рестораны','Заказы','Профиль'] as const;
export function parentTab(screen:Screen):typeof tabScreens[number]{if(['Меню','Блюдо'].includes(screen))return 'Рестораны';if(['Заказы','Трекер','Корзина','Оформление'].includes(screen))return 'Заказы';if(screen==='Главная'||screen==='Рестораны')return screen;return 'Профиль'}
