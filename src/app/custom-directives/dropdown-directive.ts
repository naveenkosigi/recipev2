import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";


@Directive({
    selector:'[custom-dropdown]'
})

export class customDropdown{
    @HostBinding('class.open') isOpen:boolean=false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }

    constructor(private elRef:ElementRef){

    }
}