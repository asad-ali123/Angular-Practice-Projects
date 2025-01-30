import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appContainer]'
})

export class viewContainer{
    constructor(public viewContainer: ViewContainerRef){}
    
}