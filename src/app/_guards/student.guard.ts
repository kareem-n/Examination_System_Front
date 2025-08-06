import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class studentGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}


  canActivate(){
    
    if( !this.authService.GetToken() ){
      this.router.navigate(['/login'])
      return false; 
    } 

    if( this.authService.GetUserRole() == "student" ){
      return true; 
    }

    return false; 
  }

};
