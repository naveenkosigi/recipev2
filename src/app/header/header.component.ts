import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toReturn=new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  click(num:number):void{
    this.toReturn.emit(num);
  }
}
