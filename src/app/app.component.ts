import { Component, OnInit } from '@angular/core';
import { authenticateService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe';
  selectedTab:number=1;

  constructor(private authService:authenticateService){

  }
  showTab(num : number){
    this.selectedTab = num;
  }

  ngOnInit() : void{
    this.authService.autoLogin();
  }
}
