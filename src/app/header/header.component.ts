import { Component, OnInit,EventEmitter, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { appState } from '../AppState/appState';
import { authState } from '../reducers/authentication-reducer';
import { authenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() toReturn=new EventEmitter<number>();
  showAuthentication:boolean=true;
  private storeObservable:Observable<authState>;
  constructor(private authService:authenticateService,private store:Store<appState>) {
    this.storeObservable=this.store.select('authState');
  }

  ngOnInit(): void {
    this.storeObservable.subscribe((state:authState) => {

      if(state.sessionDetails === null){
        this.showAuthentication=true;
      }
      else{
        this.showAuthentication=false;
      }
    });
  }

  click(num:number):void{
    this.toReturn.emit(num);
  }

  logOut(){
    this.authService.logOut();
  }
}
