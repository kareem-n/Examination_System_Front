import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);


  if( !auth.GetToken() ) {
    router.navigateByUrl("/login") ;
    return false; 
  }


  if (auth.GetUserRole() == 'admin') {
    return true; 
  }
  
  return false  ;
};
