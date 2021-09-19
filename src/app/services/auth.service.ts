import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class authService{
    private isAuthenticated:boolean=true;

    constructor(private router:Router){

    }
    authenticate() : Promise<boolean>{
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                if(this.isAuthenticated === true){
                    resolve(this.isAuthenticated);
                }
                else{
                    resolve(this.isAuthenticated);
                    this.router.navigate(['/recipes']);
                }
            }, 5000);
        });
    }
}