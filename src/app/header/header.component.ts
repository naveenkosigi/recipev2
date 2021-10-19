import { Component, OnInit,EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { authenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  @Output() toReturn=new EventEmitter<number>();
  subscription:Subscription;
  showAuthentication:boolean=true;
  constructor(private authService:authenticateService) { 
    this.subscription=authService.sessionSubject.subscribe(sessionBoolean => {
      if(sessionBoolean === false){
        this.showAuthentication=true;
      }
      else{
        this.showAuthentication=false;
      }
    });
  }

  ngOnInit(): void {
  }

  click(num:number):void{
    this.toReturn.emit(num);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logOut(){
    this.authService.logOut();
  }
}
