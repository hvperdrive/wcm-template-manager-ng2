"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dynamic_load_service_1 = require("./dynamic-load.service");
var DynamicLoadComponent = (function () {
    function DynamicLoadComponent(
        // The 'ViewContainerRef' has the 'createComponent()' function we need to get the Component in our DOM
        vcr, 
        // The 'ComponentFactoryResolver' gets the component out of the ComponentFactory
        // This can only be done using the component's name
        cfr, 
        // That's where our DynamicLoadService steps in
        // Thanks to the 'ENTRIES' we injected in it
        // .getComponents() now returns an array of all the components that we passed into the 'dynamic-load.module'
        dynamicLoadService) {
        this.vcr = vcr;
        this.cfr = cfr;
        this.dynamicLoadService = dynamicLoadService;
    }
    DynamicLoadComponent.prototype.ngOnChanges = function () {
        // First, if a component is already loaded, we keep track of it in 'this.currentComponent'
        // This way we can destroy it before loading a new one
        if (typeof this.currentComponent !== 'undefined') {
            this.currentComponent.destroy();
        }
        // Get component based on the data.
        var selectedComponent = this.dynamicLoadService.selectComponent(this.type, this.componentData);
        // After checking for a component which matches the criteria, render it
        if (selectedComponent) {
            // Based on what we retrieved in the previous step we now get the component out of the ComponentFactory
            var compFactory = this.cfr.resolveComponentFactory(selectedComponent);
            // Using the above we now use the 'ViewContainerRef' to get the Component in our DOM
            // We also store the component in our 'currentComponent' if we need to destroy it.
            this.currentComponent = this.vcr.createComponent(compFactory);
            // Lastly we pass the resolved data to the component
            this.currentComponent.instance.data = this.componentData;
        }
        else {
            console.log('there was no component found');
        }
    };
    DynamicLoadComponent.prototype.ngOnDestroy = function () {
        if (typeof this.currentComponent !== 'undefined') {
            this.currentComponent.destroy();
        }
    };
    return DynamicLoadComponent;
}());
__decorate([
    core_1.Input()
], DynamicLoadComponent.prototype, "componentData", void 0);
__decorate([
    core_1.Input()
], DynamicLoadComponent.prototype, "type", void 0);
DynamicLoadComponent = __decorate([
    core_1.Component({
        selector: 'app-dynamic-load',
        template: '',
        styles: [':host { display: block; }']
    }),
    __param(0, core_1.Inject(core_1.ViewContainerRef)),
    __param(1, core_1.Inject(core_1.ComponentFactoryResolver)),
    __param(2, core_1.Inject(dynamic_load_service_1.DynamicLoadService))
], DynamicLoadComponent);
exports.DynamicLoadComponent = DynamicLoadComponent;
//# sourceMappingURL=dynamic-load.component.js.map