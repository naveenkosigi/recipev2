import { AfterContentInit, Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector:'[custom-highlight]'
})

export class customHighlight implements OnInit,AfterContentInit{
    @Input() defaultColor="transparent";
    @Input() hoverColor="red";
    @HostBinding('style.backgroundColor') backgroundColor=this.defaultColor;
    constructor(private elementRef:ElementRef,private renderer:Renderer2){

    }

    ngOnInit(){
        //this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','transparent');
    }

    ngAfterContentInit(){
        this.backgroundColor=this.defaultColor;
    }

    @HostListener('mouseenter') mouseenter(event:Event){
        //this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','grey');
        this.backgroundColor=this.hoverColor;
    }

    @HostListener('mouseleave') mouseleave(event:Event){
        //this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','transparent');
        this.backgroundColor=this.defaultColor;
    }

}