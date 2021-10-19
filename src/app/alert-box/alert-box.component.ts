import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {

  @Input() message:string;
  @Output() closed=new EventEmitter<void>(); 
  constructor() { }

  ngOnInit(): void {
  }

  close():void{
    console.log("closed");
    this.closed.emit();
  }

}
