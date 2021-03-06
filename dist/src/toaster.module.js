import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToasterContainerComponent } from './toaster-container.component';
import { ToasterService } from './toaster.service';
var ToasterModule = (function () {
    function ToasterModule() {
    }
    ToasterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
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
export { ToasterModule };
//# sourceMappingURL=toaster.module.js.map