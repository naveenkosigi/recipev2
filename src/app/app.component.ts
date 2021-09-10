import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe';
  selectedTab:number=1;

  showTab(num : number){
    this.selectedTab = num;
  }
}
