'use client';
import {Dialog as DialogPrimitive} from '@base-ui/react/dialog';
import {AlertDialog as AlertPrimitive} from '@base-ui/react/alert-dialog';
import {Menu as MenuPrimitive} from '@base-ui/react/menu';
import {Select as SelectPrimitive} from '@base-ui/react/select';
import {DialogPortal,DialogOverlay} from '@/components/ui/dialog';
import {AlertDialogPortal,AlertDialogOverlay} from '@/components/ui/alert-dialog';
import {DropdownMenuPortal} from '@/components/ui/dropdown-menu';
import {useIOSViewport} from './ios-viewport';

export function IOSDialogContent({children,className='',showCloseButton:_,...props}:DialogPrimitive.Popup.Props & {showCloseButton?:boolean}){
 const {portal}=useIOSViewport();
 return <DialogPortal container={portal}><DialogOverlay className="ios-dimmer"/><DialogPrimitive.Popup data-slot="dialog-content" className={'ios-sheet '+className} {...props}><div className="ios-sheet-grabber" aria-hidden="true"/>{children}</DialogPrimitive.Popup></DialogPortal>;
}
export function IOSAlertContent({className='',...props}:AlertPrimitive.Popup.Props){
 const {portal}=useIOSViewport();
 return <AlertDialogPortal container={portal}><AlertDialogOverlay className="ios-dimmer"/><AlertPrimitive.Popup data-slot="alert-dialog-content" className={'ios-alert '+className} {...props}/></AlertDialogPortal>;
}
type MenuProps=MenuPrimitive.Popup.Props & Pick<MenuPrimitive.Positioner.Props,'align'|'alignOffset'|'side'|'sideOffset'>;
export function IOSDropdownMenuContent({className='',align='end',alignOffset=0,side='bottom',sideOffset=8,...props}:MenuProps){
 const {portal,viewport}=useIOSViewport();
 return <DropdownMenuPortal container={portal}><MenuPrimitive.Positioner className="ios-popover-positioner" align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} collisionBoundary={viewport.current ?? undefined} collisionPadding={12}><MenuPrimitive.Popup data-slot="dropdown-menu-content" className={'ios-popover '+className} {...props}/></MenuPrimitive.Positioner></DropdownMenuPortal>;
}
export function IOSSelectContent({className='',children,...props}:SelectPrimitive.Popup.Props){
 const {portal,viewport}=useIOSViewport();
 return <SelectPrimitive.Portal container={portal}><SelectPrimitive.Positioner className="ios-popover-positioner" side="bottom" sideOffset={8} align="start" alignItemWithTrigger={false} collisionBoundary={viewport.current ?? undefined} collisionPadding={12}><SelectPrimitive.Popup data-slot="select-content" className={'ios-popover ios-select '+className} {...props}><SelectPrimitive.List>{children}</SelectPrimitive.List></SelectPrimitive.Popup></SelectPrimitive.Positioner></SelectPrimitive.Portal>;
}
