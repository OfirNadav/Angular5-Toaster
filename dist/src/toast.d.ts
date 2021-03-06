import { BodyOutputType } from './bodyOutputType';
import { ToasterConfig } from './toaster-config';
export interface Toast {
    type: string;
    title?: string;
    body?: any;
    toastId?: string;
    toastContainerId?: number;
    onShowCallback?: OnActionCallback;
    onHideCallback?: OnActionCallback;
    timeout?: number;
    timeoutId?: number | null;
    bodyOutputType?: BodyOutputType;
    clickHandler?: ClickHandler;
    showCloseButton?: boolean;
    closeHtml?: string;
    toasterConfig?: ToasterConfig;
    data?: any;
}
export declare type ClickHandler = (toast: Toast, isCloseButton?: boolean) => boolean;
export declare type OnActionCallback = (toast: Toast) => void;
