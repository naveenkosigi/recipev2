import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector:'[custom-highlight]'
})

export class customHighlight implements OnInit{
    constructor(private elementRef:ElementRef,private renderer:Renderer2){

    }

    ngOnInit(){
        this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','red');
    }
}