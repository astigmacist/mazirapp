export const dishes = [
 {id:1,name:'Лагман',desc:'Домашняя лапша, нежная говядина и овощи в насыщенном бульоне.',price:3200,weight:'350 г',cal:420,category:'Горячее',tag:'Хит',allergens:'Глютен, сельдерей',pos:'50% 70%'},
 {id:2,name:'Баурсаки',desc:'Золотистые, воздушные и тёплые. Как дома, только уже на столе.',price:1200,weight:'200 г',cal:510,category:'Выпечка',tag:'Любимое',allergens:'Глютен, молоко',pos:'0% 0%'},
 {id:3,name:'Лагман с овощами',desc:'Домашняя лапша, болгарский перец, томаты и свежая зелень.',price:2800,weight:'350 г',cal:330,category:'Горячее',tag:'Без мяса',allergens:'Глютен, сельдерей',pos:'55% 65%'},
 {id:4,name:'Чай по-казахски',desc:'Ароматный чёрный чай с молоком. Подаём в пиале.',price:900,weight:'400 мл',cal:90,category:'Напитки',tag:'К баурсакам',allergens:'Молоко',pos:'100% 0%'},
 {id:5,name:'Семейный сет',desc:'Две порции лагмана, свежие баурсаки и чай на двоих.',price:7900,weight:'На двоих',cal:1500,category:'Сеты',tag:'Выгодно',allergens:'Глютен, молоко, сельдерей',pos:'50% 50%'},
 {id:6,name:'Чай без молока',desc:'Свежезаваренный чёрный чай с тонким ароматом.',price:700,weight:'400 мл',cal:2,category:'Напитки',tag:'Классика',allergens:'Нет',pos:'100% 0%'}
];
export const restaurants=[{id:1,name:'Rumi',type:'Казахская',rating:4.9,time:25,fee:600,desc:'Казахская кухня · Достык, 12'},{id:2,name:'Дастархан',type:'Казахская',rating:4.8,time:35,fee:800,desc:'Восточная кухня · Абая, 56'},{id:3,name:'Чайхана',type:'Казахская',rating:4.7,time:40,fee:700,desc:'Домашняя кухня · Сатпаева, 30'}];
export type CartItem={id:number;qty:number;extra:boolean;note:string};
export function totals(cart:CartItem[],mode:string,promo:boolean,bonus:boolean,fee=600){const subtotal=cart.reduce((s,x)=>s+(dishes.find(d=>d.id===x.id)!.price+(x.extra?400:0))*x.qty,0);const delivery=mode==='Доставка'&&subtotal>0?fee:0;const service=mode==='В зале'?Math.round(subtotal*.1):0;const discount=promo?Math.round(subtotal*.2):0;const points=bonus?Math.min(500,subtotal-discount):0;return {subtotal,delivery,service,discount,points,total:subtotal+delivery+service-discount-points};}
export const money=(n:number)=>n.toLocaleString('ru-RU')+' ₸';
