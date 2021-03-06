import { ChangeDetectorRef, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ToasterConfig } from './toaster-config';
import { ToasterService } from './toaster.service';
import { Toast } from './toast';
export declare class ToasterContainerComponent implements OnInit, OnDestroy {
    private ref;
    private ngZone;
    private addToastSubscriber;
    private clearToastsSubscriber;
    private toasterService;
    toasterconfig: ToasterConfig;
    toasts: Toast[];
    constructor(toasterService: ToasterService, ref: ChangeDetectorRef, ngZone: NgZone);
    ngOnInit(): void;
    click(toast: Toast, isCloseButton?: boolean): false | undefined;
    childClick($event: any): void;
    stopTimer(toast: Toast): void;
    restartTimer(toast: Toast): void;
    private registerSubscribers();
    private addToast(toast);
    private configureTimer(toast);
    private isLimitExceeded();
    private removeToast(toast);
    private removeAllToasts();
    private clearToasts(clearWrapper);
    private clearToastsAction(toastId?);
    ngOnDestroy(): void;
}
