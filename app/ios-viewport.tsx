'use client';
import {createContext,useContext,useMemo,useRef,type ReactNode,type RefObject} from 'react';
import {Signal,Wifi,BatteryFull} from 'lucide-react';
export type ViewportContext={portal:RefObject<HTMLDivElement|null>;viewport:RefObject<HTMLDivElement|null>};
const Viewport=createContext<ViewportContext|null>(null);
export function useIOSViewport(){const value=useContext(Viewport);if(!value)throw Error('iOS viewport missing');return value}
export function scrollAppToTop(){document.getElementById('ios-app-scroll')?.scrollTo({top:0,behavior:'instant'})}
export function IOSViewport({children}:{children:ReactNode}){const portal=useRef<HTMLDivElement>(null),viewport=useRef<HTMLDivElement>(null);const value=useMemo(()=>({portal,viewport}),[]);return <Viewport.Provider value={value}><div className="ios-stage"><div className="ios-design-signature"><b>Məzir</b><span>iOS · iPhone</span></div><div className="ios-device" ref={viewport}><div className="ios-status-bar" aria-hidden="true"><span>9:41</span><i className="dynamic-island"/><div><Signal size={16} fill="currentColor"/><Wifi size={17}/><BatteryFull size={23}/></div></div><div className="ios-app-scroll" id="ios-app-scroll">{children}</div><div className="ios-home-indicator" aria-hidden="true"/><div className="ios-portals" ref={portal}/></div></div></Viewport.Provider>}
