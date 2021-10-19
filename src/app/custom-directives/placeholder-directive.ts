import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[alert]'
})

export class alertPopUp{
    constructor(public containerRef:ViewContainerRef){

    }
}