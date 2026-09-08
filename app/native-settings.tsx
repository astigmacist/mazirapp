import {useState} from 'react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import {Switch} from '@/components/ui/switch';
import {usePreferences} from './preferences';
import {languages} from './i18n';

type Account={name:string;email:string;phone:string};
type Props={account:Account;onSave:(account:Account)=>void;onBack:()=>void;onTheme:()=>void;onLanguage:()=>void;onLogout:()=>void;notifications:boolean;onNotifications:(value:boolean)=>void;offers:boolean;onOffers:(value:boolean)=>void};
export function NativeSettings({account,onSave,onBack,onTheme,onLanguage,onLogout,notifications,onNotifications,offers,onOffers}:Props){
 const {t,theme,locale}=usePreferences();
 const [draft,setDraft]=useState(account);
 const themeName=theme==='system'?'Системная':theme==='light'?'Светлая':'Тёмная';
 return <div className="native-settings">
  <button className="native-back" onClick={onBack} aria-label={t('Назад')}><ChevronLeft size={28}/></button>
  <h1>{t('Настройки')}</h1>
  <section className="settings-section"><h2>{t('Учётная запись')}</h2>
   <form className="ios-group account-form" onSubmit={e=>{e.preventDefault();onSave({...draft,name:draft.name.trim(),email:draft.email.trim(),phone:draft.phone.trim()})}}>
    <label className="ios-setting-row"><span className="sr-only">{t('Имя')}</span><input required minLength={1} maxLength={64} autoComplete="name" aria-label={t('Имя')} value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/></label>
    <label className="ios-setting-row"><span>{t('Электронная почта')}</span><input type="email" autoComplete="email" aria-label={t('Электронная почта')} value={draft.email} placeholder="name@example.com" onChange={e=>setDraft({...draft,email:e.target.value})}/></label>
    <label className="ios-setting-row"><span>{t('Телефон')}</span><input type="tel" autoComplete="tel" aria-label={t('Телефон')} value={draft.phone} placeholder="+7" onChange={e=>setDraft({...draft,phone:e.target.value})}/></label>
    <button className="ios-setting-row settings-save" type="submit">{t('Сохранить')}</button>
   </form>
  </section>
  <section className="settings-section"><div className="ios-group">
   <button className="ios-setting-row" onClick={onTheme}><span>{t('Тема')}</span><span className="setting-value">{t(themeName)}<ChevronRight size={19}/></span></button>
   <button className="ios-setting-row" onClick={onLanguage}><span>{t('Язык')}</span><span className="setting-value">{languages.find(x=>x.id===locale)!.native}<ChevronRight size={19}/></span></button>
  </div></section>
  <section className="settings-section"><h2>{t('О приложении')}</h2><div className="ios-group">
   <div className="ios-setting-row"><span>{t('Версия приложения')}</span><span className="setting-value">1.0.0</span></div>
   <div className="ios-setting-row"><span>{t('Платформа')}</span><span className="setting-value">iOS</span></div>
  </div></section>
  <section className="settings-section"><h2>{t('Уведомления')}</h2><div className="ios-group">
   <div className="ios-setting-row"><span>{t('Статус заказа')}</span><Switch aria-label={t('Уведомления о заказе')} checked={notifications} onCheckedChange={onNotifications}/></div>
   <div className="ios-setting-row"><span>{t('Акции и новости')}</span><Switch aria-label={t('Акции и новости')} checked={offers} onCheckedChange={onOffers}/></div>
  </div></section>
  <div className="ios-group"><button className="ios-setting-row settings-save" onClick={onLogout}>{t('Выйти из аккаунта')}</button></div>
 </div>;
}
