(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/animations'), require('rxjs/Observable'), require('rxjs/operators'), require('rxjs/Subject'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/animations', 'rxjs/Observable', 'rxjs/operators', 'rxjs/Subject', '@angular/common'], factory) :
	(factory((global.angular2toaster = global.angular2toaster || {}),global.ng.core,global._angular_platformBrowser,global._angular_animations,global.Rx,global.rxjs_operators,global.Rx,global.ng.common));
}(this, (function (exports,_angular_core,_angular_platformBrowser,_angular_animations,rxjs_Observable,rxjs_operators,rxjs_Subject,_angular_common) { 'use strict';

(function (BodyOutputType) {
    BodyOutputType[BodyOutputType["Default"] = 0] = "Default";
    BodyOutputType[BodyOutputType["TrustedHtml"] = 1] = "TrustedHtml";
    BodyOutputType[BodyOutputType["Component"] = 2] = "Component";
})(exports.BodyOutputType || (exports.BodyOutputType = {}));

var ToastComponent = (function () {
    function ToastComponent(sanitizer, componentFactoryResolver, changeDetectorRef) {
        this.sanitizer = sanitizer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;
        this.bodyOutputType = exports.BodyOutputType;
        this.clickEvent = new _angular_core.EventEmitter();
    }
    ToastComponent.prototype.ngOnInit = function () {
        if (this.toast.closeHtml) {
            this.safeCloseHtml = this.sanitizer.bypassSecurityTrustHtml(this.toast.closeHtml);
        }
    };
    ToastComponent.prototype.ngAfterViewInit = function () {
        if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
            var component = this.componentFactoryResolver.resolveComponentFactory(this.toast.body);
            var componentInstance = this.componentBody.createComponent(component, undefined, this.componentBody.injector);
            componentInstance.instance.toast = this.toast;
            this.changeDetectorRef.detectChanges();
        }
    };
    ToastComponent.prototype.click = function (event, toast) {
        event.stopPropagation();
        this.clickEvent.emit({
            value: { toast: toast, isCloseButton: true }
        });
    };
    ToastComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: '[toastComp]',
                    template: "\n        <i class=\"toaster-icon\" [ngClass]=\"iconClass\"></i>\n        <div class=\"toast-content\">\n            <div [ngClass]=\"toast.toasterConfig?.titleClass\">{{toast.title}}</div>\n            <div [ngClass]=\"toast.toasterConfig?.messageClass\" [ngSwitch]=\"toast.bodyOutputType\">\n                <div *ngSwitchCase=\"bodyOutputType.Component\" #componentBody></div>\n                <div *ngSwitchCase=\"bodyOutputType.TrustedHtml\" [innerHTML]=\"toast.body\"></div>\n                <div *ngSwitchCase=\"bodyOutputType.Default\">{{toast.body}}</div>\n            </div>\n        </div>\n        <div class=\"toast-close-button\" *ngIf=\"toast.showCloseButton\" (click)=\"click($event, toast)\"\n             [innerHTML]=\"safeCloseHtml\">\n        </div>"
                },] },
    ];
    /** @nocollapse */
    ToastComponent.ctorParameters = function () { return [
        { type: _angular_platformBrowser.DomSanitizer, },
        { type: _angular_core.ComponentFactoryResolver, },
        { type: _angular_core.ChangeDetectorRef, },
    ]; };
    ToastComponent.propDecorators = {
        "toast": [{ type: _angular_core.Input },],
        "iconClass": [{ type: _angular_core.Input },],
        "componentBody": [{ type: _angular_core.ViewChild, args: ['componentBody', { read: _angular_core.ViewContainerRef },] },],
        "clickEvent": [{ type: _angular_core.Output },],
    };
    return ToastComponent;
}());

var ToasterConfig = (function () {
    function ToasterConfig(configOverrides) {
        configOverrides = configOverrides || {};
        this.limit = configOverrides.limit || null;
        this.tapToDismiss = configOverrides.tapToDismiss != null ? configOverrides.tapToDismiss : true;
        this.showCloseButton = configOverrides.showCloseButton != null ? configOverrides.showCloseButton : false;
        this.closeHtml = configOverrides.closeHtml || '<button class="toast-close-button" type="button">&times;</button>';
        this.newestOnTop = configOverrides.newestOnTop != null ? configOverrides.newestOnTop : true;
        this.timeout = configOverrides.timeout != null ? configOverrides.timeout : 5000;
        this.typeClasses = configOverrides.typeClasses || {
            error: 'toast-error',
            info: 'toast-info',
            wait: 'toast-wait',
            success: 'toast-success',
            warning: 'toast-warning'
        };
        this.iconClasses = configOverrides.iconClasses || {
            error: 'icon-error',
            info: 'icon-info',
            wait: 'icon-wait',
            success: 'icon-success',
            warning: 'icon-warning'
        };
        this.bodyOutputType = configOverrides.bodyOutputType || exports.BodyOutputType.Default;
        this.bodyTemplate = configOverrides.bodyTemplate || 'toasterBodyTmpl.html';
        this.defaultTypeClass = configOverrides.defaultTypeClass || 'toast-info';
        this.positionClass = configOverrides.positionClass || 'toast-top-right';
        this.titleClass = configOverrides.titleClass || 'toast-title';
        this.messageClass = configOverrides.messageClass || 'toast-message';
        this.animation = configOverrides.animation || '';
        this.preventDuplicates = configOverrides.preventDuplicates != null ? configOverrides.preventDuplicates : false;
        this.mouseoverTimerStop = configOverrides.mouseoverTimerStop != null ? configOverrides.mouseoverTimerStop : false;
        this.toastContainerId = configOverrides.toastContainerId != null ? configOverrides.toastContainerId : null;
    }
    return ToasterConfig;
}());

var ToasterService = (function () {
    /**
     * Creates an instance of ToasterService.
     */
    function ToasterService() {
        var _this = this;
        this.addToast = new rxjs_Observable.Observable(function (observer) { return _this._addToast = observer; }).pipe(rxjs_operators.share());
        this.clearToasts = new rxjs_Observable.Observable(function (observer) { return _this._clearToasts = observer; }).pipe(rxjs_operators.share());
        this._removeToastSubject = new rxjs_Subject.Subject();
        this.removeToast = this._removeToastSubject.pipe(rxjs_operators.share());
    }
    /**
     * Synchronously create and show a new toast instance.
     *
     * @param {(string | Toast)} type The type of the toast, or a Toast object.
     * @param {string=} title The toast title.
     * @param {string=} body The toast body.
     * @returns {Toast}
     *          The newly created Toast instance with a randomly generated GUID Id.
     */
    /**
         * Synchronously create and show a new toast instance.
         *
         * @param {(string | Toast)} type The type of the toast, or a Toast object.
         * @param {string=} title The toast title.
         * @param {string=} body The toast body.
         * @returns {Toast}
         *          The newly created Toast instance with a randomly generated GUID Id.
         */
    ToasterService.prototype.pop = /**
         * Synchronously create and show a new toast instance.
         *
         * @param {(string | Toast)} type The type of the toast, or a Toast object.
         * @param {string=} title The toast title.
         * @param {string=} body The toast body.
         * @returns {Toast}
         *          The newly created Toast instance with a randomly generated GUID Id.
         */
    function (type, title, body) {
        var toast = typeof type === 'string' ? { type: type, title: title, body: body } : type;
        toast.toastId = Guid.newGuid();
        if (!this._addToast) {
            throw new Error('No Toaster Containers have been initialized to receive toasts.');
        }
        this._addToast.next(toast);
        return toast;
    };
    /**
     * Asynchronously create and show a new toast instance.
     *
     * @param {(string | Toast)} type The type of the toast, or a Toast object.
     * @param {string=} title The toast title.
     * @param {string=} body The toast body.
     * @returns {Observable<Toast>}
     *          A hot Observable that can be subscribed to in order to receive the Toast instance
     *          with a randomly generated GUID Id.
     */
    /**
         * Asynchronously create and show a new toast instance.
         *
         * @param {(string | Toast)} type The type of the toast, or a Toast object.
         * @param {string=} title The toast title.
         * @param {string=} body The toast body.
         * @returns {Observable<Toast>}
         *          A hot Observable that can be subscribed to in order to receive the Toast instance
         *          with a randomly generated GUID Id.
         */
    ToasterService.prototype.popAsync = /**
         * Asynchronously create and show a new toast instance.
         *
         * @param {(string | Toast)} type The type of the toast, or a Toast object.
         * @param {string=} title The toast title.
         * @param {string=} body The toast body.
         * @returns {Observable<Toast>}
         *          A hot Observable that can be subscribed to in order to receive the Toast instance
         *          with a randomly generated GUID Id.
         */
    function (type, title, body) {
        var _this = this;
        setTimeout(function () {
            _this.pop(type, title, body);
        }, 0);
        return this.addToast;
    };
    /**
     * Clears a toast by toastId and/or toastContainerId.
     *
     * @param {string} toastId The toastId to clear.
     * @param {number=} toastContainerId
     *        The toastContainerId of the container to remove toasts from.
     */
    /**
         * Clears a toast by toastId and/or toastContainerId.
         *
         * @param {string} toastId The toastId to clear.
         * @param {number=} toastContainerId
         *        The toastContainerId of the container to remove toasts from.
         */
    ToasterService.prototype.clear = /**
         * Clears a toast by toastId and/or toastContainerId.
         *
         * @param {string} toastId The toastId to clear.
         * @param {number=} toastContainerId
         *        The toastContainerId of the container to remove toasts from.
         */
    function (toastId, toastContainerId) {
        var clearWrapper = {
            toastId: toastId, toastContainerId: toastContainerId
        };
        this._clearToasts.next(clearWrapper);
    };
    ToasterService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ToasterService.ctorParameters = function () { return []; };
    return ToasterService;
}());
// http://stackoverflow.com/questions/26501688/a-typescript-guid-class
var Guid = (function () {
    function Guid() {
    }
    Guid.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
}());

var ToasterContainerComponent = (function () {
    function ToasterContainerComponent(toasterService, ref, ngZone) {
        this.ref = ref;
        this.ngZone = ngZone;
        this.toasts = [];
        this.toasterService = toasterService;
    }
    ToasterContainerComponent.prototype.ngOnInit = function () {
        this.registerSubscribers();
        if (this.toasterconfig === null || typeof this.toasterconfig === 'undefined') {
            this.toasterconfig = new ToasterConfig();
        }
    };
    // event handlers
    // event handlers
    ToasterContainerComponent.prototype.click = 
    // event handlers
    function (toast, isCloseButton) {
        if (this.toasterconfig.tapToDismiss || (toast.showCloseButton && isCloseButton)) {
            var removeToast = true;
            if (toast.clickHandler) {
                if (typeof toast.clickHandler === 'function') {
                    removeToast = toast.clickHandler(toast, isCloseButton);
                }
                else {
                    console.log('The toast click handler is not a callable function.');
                    return false;
                }
            }
            if (removeToast) {
                this.removeToast(toast);
            }
        }
    };
    ToasterContainerComponent.prototype.childClick = function ($event) {
        this.click($event.value.toast, $event.value.isCloseButton);
    };
    ToasterContainerComponent.prototype.stopTimer = function (toast) {
        if (this.toasterconfig.mouseoverTimerStop) {
            if (toast.timeoutId) {
                window.clearTimeout(toast.timeoutId);
                toast.timeoutId = null;
            }
        }
    };
    ToasterContainerComponent.prototype.restartTimer = function (toast) {
        if (this.toasterconfig.mouseoverTimerStop) {
            if (!toast.timeoutId) {
                this.configureTimer(toast);
            }
        }
        else if (toast.timeoutId === null) {
            this.removeToast(toast);
        }
    };
    // private functions
    // private functions
    ToasterContainerComponent.prototype.registerSubscribers = 
    // private functions
    function () {
        var _this = this;
        this.addToastSubscriber = this.toasterService.addToast.subscribe(function (toast) {
            _this.addToast(toast);
        });
        this.clearToastsSubscriber = this.toasterService.clearToasts.subscribe(function (clearWrapper) {
            _this.clearToasts(clearWrapper);
        });
    };
    ToasterContainerComponent.prototype.addToast = function (toast) {
        toast.toasterConfig = this.toasterconfig;
        if (toast.toastContainerId && this.toasterconfig.toastContainerId
            && toast.toastContainerId !== this.toasterconfig.toastContainerId) {
            return;
        }
        if (!toast.type) {
            toast.type = this.toasterconfig.defaultTypeClass;
        }
        if (this.toasterconfig.preventDuplicates && this.toasts.length > 0) {
            if (toast.toastId && this.toasts.some(function (t) { return t.toastId === toast.toastId; })) {
                return;
            }
            else if (this.toasts.some(function (t) { return t.body === toast.body; })) {
                return;
            }
        }
        if (toast.showCloseButton === null || typeof toast.showCloseButton === 'undefined') {
            if (typeof this.toasterconfig.showCloseButton === 'object') {
                toast.showCloseButton = this.toasterconfig.showCloseButton[toast.type];
            }
            else if (typeof this.toasterconfig.showCloseButton === 'boolean') {
                toast.showCloseButton = this.toasterconfig.showCloseButton;
            }
        }
        if (toast.showCloseButton) {
            toast.closeHtml = toast.closeHtml || this.toasterconfig.closeHtml;
        }
        toast.bodyOutputType = toast.bodyOutputType || this.toasterconfig.bodyOutputType;
        this.configureTimer(toast);
        if (this.toasterconfig.newestOnTop) {
            this.toasts.unshift(toast);
            if (this.isLimitExceeded()) {
                this.toasts.pop();
            }
        }
        else {
            this.toasts.push(toast);
            if (this.isLimitExceeded()) {
                this.toasts.shift();
            }
        }
        if (toast.onShowCallback) {
            toast.onShowCallback(toast);
        }
    };
    ToasterContainerComponent.prototype.configureTimer = function (toast) {
        var _this = this;
        var timeout = (typeof toast.timeout === 'number')
            ? toast.timeout : this.toasterconfig.timeout;
        if (typeof timeout === 'object') {
            timeout = timeout[toast.type];
        }
        if (timeout > 0) {
            this.ngZone.runOutsideAngular(function () {
                toast.timeoutId = window.setTimeout(function () {
                    _this.ngZone.run(function () {
                        _this.ref.markForCheck();
                        _this.removeToast(toast);
                    });
                }, timeout);
            });
        }
    };
    ToasterContainerComponent.prototype.isLimitExceeded = function () {
        return this.toasterconfig.limit && this.toasts.length > this.toasterconfig.limit;
    };
    ToasterContainerComponent.prototype.removeToast = function (toast) {
        var index = this.toasts.indexOf(toast);
        if (index < 0) {
            return;
        }
        this.toasts.splice(index, 1);
        if (toast.timeoutId) {
            window.clearTimeout(toast.timeoutId);
            toast.timeoutId = null;
        }
        if (toast.onHideCallback) {
            toast.onHideCallback(toast);
        }
        this.toasterService._removeToastSubject.next({
            toastId: toast.toastId,
            toastContainerId: toast.toastContainerId
        });
    };
    ToasterContainerComponent.prototype.removeAllToasts = function () {
        for (var i = this.toasts.length - 1; i >= 0; i--) {
            this.removeToast(this.toasts[i]);
        }
    };
    ToasterContainerComponent.prototype.clearToasts = function (clearWrapper) {
        var toastId = clearWrapper.toastId;
        var toastContainerId = clearWrapper.toastContainerId;
        if (toastContainerId === null || typeof toastContainerId === 'undefined') {
            this.clearToastsAction(toastId);
        }
        else if (toastContainerId === this.toasterconfig.toastContainerId) {
            this.clearToastsAction(toastId);
        }
    };
    ToasterContainerComponent.prototype.clearToastsAction = function (toastId) {
        if (toastId) {
            this.removeToast(this.toasts.filter(function (t) { return t.toastId === toastId; })[0]);
        }
        else {
            this.removeAllToasts();
        }
    };
    ToasterContainerComponent.prototype.ngOnDestroy = function () {
        if (this.addToastSubscriber) {
            this.addToastSubscriber.unsubscribe();
        }
        if (this.clearToastsSubscriber) {
            this.clearToastsSubscriber.unsubscribe();
        }
    };
    ToasterContainerComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'toaster-container',
                    template: "\n        <div id=\"toast-container\" [ngClass]=\"[toasterconfig.positionClass]\">\n            <div toastComp *ngFor=\"let toast of toasts\" class=\"toast\" [toast]=\"toast\"\n                 [@toastState]=\"toasterconfig.animation\"\n                 [iconClass]=\"toasterconfig.iconClasses[toast.type]\"\n                 [ngClass]=\"toasterconfig.typeClasses[toast.type]\"\n                 (click)=\"click(toast)\" (clickEvent)=\"childClick($event)\"\n                 (mouseover)=\"stopTimer(toast)\" (mouseout)=\"restartTimer(toast)\">\n            </div>\n        </div>\n    ",
                    // TODO: use styleUrls once Angular 2 supports the use of relative paths
                    // https://github.com/angular/angular/issues/2383
                    // styleUrls: ['./toaster.css']
                    animations: [
                        _angular_animations.trigger('toastState', [
                            _angular_animations.state('flyRight, flyLeft, slideDown, slideUp, fade', _angular_animations.style({ opacity: 1, transform: 'translate(0,0)' })),
                            _angular_animations.transition('void => flyRight', [
                                _angular_animations.style({
                                    opacity: 0, transform: 'translateX(100%)'
                                }),
                                _angular_animations.animate('0.25s ease-in')
                            ]),
                            _angular_animations.transition('flyRight => void', [
                                _angular_animations.animate('0.25s 10ms ease-out', _angular_animations.style({
                                    opacity: 0, transform: 'translateX(100%)'
                                }))
                            ]),
                            _angular_animations.transition('void => flyLeft', [
                                _angular_animations.style({
                                    opacity: 0, transform: 'translateX(-100%)'
                                }),
                                _angular_animations.animate('0.25s ease-in')
                            ]),
                            _angular_animations.transition('flyLeft => void', [
                                _angular_animations.animate('0.25s 10ms ease-out', _angular_animations.style({
                                    opacity: 0, transform: 'translateX(-100%)'
                                }))
                            ]),
                            _angular_animations.transition('void => slideDown', [
                                _angular_animations.style({
                                    opacity: 0, transform: 'translateY(-200%)'
                                }),
                                _angular_animations.animate('0.3s ease-in')
                            ]),
                            _angular_animations.transition('slideDown => void', [
                                _angular_animations.animate('0.3s 10ms ease-out', _angular_animations.style({
                                    opacity: 0, transform: 'translateY(200%)'
                                }))
                            ]),
                            _angular_animations.transition('void => slideUp', [
                                _angular_animations.style({
                                    opacity: 0, transform: 'translateY(200%)'
                                }),
                                _angular_animations.animate('0.3s ease-in')
                            ]),
                            _angular_animations.transition('slideUp => void', [
                                _angular_animations.animate('0.3s 10ms ease-out', _angular_animations.style({
                                    opacity: 0, transform: 'translateY(-200%)'
                                }))
                            ]),
                            _angular_animations.transition('void => fade', [
                                _angular_animations.style({
                                    opacity: 0,
                                }),
                                _angular_animations.animate('0.3s ease-in')
                            ]),
                            _angular_animations.transition('fade => void', [
                                _angular_animations.animate('0.3s 10ms ease-out', _angular_animations.style({
                                    opacity: 0,
                                }))
                            ])
                        ]),
                    ]
                },] },
    ];
    /** @nocollapse */
    ToasterContainerComponent.ctorParameters = function () { return [
        { type: ToasterService, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: _angular_core.NgZone, },
    ]; };
    ToasterContainerComponent.propDecorators = {
        "toasterconfig": [{ type: _angular_core.Input },],
    };
    return ToasterContainerComponent;
}());

var ToasterModule = (function () {
    function ToasterModule() {
    }
    ToasterModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule],
                    declarations: [
                        ToastComponent,
                        ToasterContainerComponent
                    ],
                    providers: [ToasterService],
                    exports: [
                        ToasterContainerComponent,
                        ToastComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    ToasterModule.ctorParameters = function () { return []; };
    return ToasterModule;
}());

exports.ToastComponent = ToastComponent;
exports.ToasterContainerComponent = ToasterContainerComponent;
exports.ToasterService = ToasterService;
exports.ToasterConfig = ToasterConfig;
exports.ToasterModule = ToasterModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
