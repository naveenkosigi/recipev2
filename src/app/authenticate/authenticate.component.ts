import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { authenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit,AfterContentInit {
  form:FormGroup;
  constructor(private authenticateService:authenticateService,private router:Router) { 
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
      this.authenticateService.logIn(this.form.get('username').value,this.form.get('password').value).subscribe(() => {
        this.router.navigateByUrl("/recipes");
      });
    }
    else{
      this.authenticateService.signUp(this.form.get('username').value,this.form.get('password').value).subscribe(() => {
        this.router.navigateByUrl("/recipes");
      });
    }
  }



}
