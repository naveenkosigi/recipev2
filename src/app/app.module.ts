import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { customHighlight } from './custom-directives/highlight-component';
import { routingAppModule } from './routing.app.module';
import {HttpClientModule} from '@angular/common/http'; 
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { alertPopUp } from './custom-directives/placeholder-directive';
import { shoppingListModule } from './MODELS/shopping-list.model';
import { sharedModule } from './modules/shared-module';
import { sharedServices } from './modules/shared-services';
import { StoreModule } from '@ngrx/store';
import { appReducerMap } from './AppState/appState';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from './effects/authEffects';
import {StoreDevtoolsModule} from  '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    customHighlight,
    AuthenticateComponent,
    AlertBoxComponent,
    alertPopUp
  ],
  imports: [
    BrowserModule,
    routingAppModule,
    HttpClientModule,
    shoppingListModule,
    sharedModule,
    sharedServices,
    StoreModule.forRoot(appReducerMap),
    EffectsModule.forRoot([authEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



