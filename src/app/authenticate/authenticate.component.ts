import { AfterContentInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { alertPopUp } from '../custom-directives/placeholder-directive';
import { authenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit,AfterContentInit {
  form:FormGroup;
  @ViewChild(alertPopUp,{static:false}) alertPopUp:alertPopUp;
  constructor(private authenticateService:authenticateService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { 
    this.form=new FormGroup({
      username:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,Validators.required)
    });
  }

  ngOnInit(): void {
    
  }

  ngAfterContentInit() : void{
    
  }

  authenticate(isSignUp:boolean):void{
    console.log(this.form);
    if(isSignUp === false){
      this.authenticateService.logIn(this.form.get('username').value,this.form.get('password').value);
    }
    else{
      this.authenticateService.signUp(this.form.get('username').value,this.form.get('password').value).subscribe(() => {
        this.router.navigateByUrl("/recipes");
      });
    }
  }

  addAlertPopUp() : void{
    const component=this.componentFactoryResolver.resolveComponentFactory(AlertBoxComponent);
    const hostElement=this.alertPopUp.containerRef;
    hostElement.clear();
    const newComponent=hostElement.createComponent(component);
    newComponent.instance.message="test dynamic content";
    const subscription=newComponent.instance.closed.subscribe(() => {
      hostElement.clear();
      subscription.unsubscribe();
    });
  }



}
