import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountServiceService } from '@services/account-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountServiceService, private router: Router) {}
  
  canActivate() :boolean {
    if( this.accountService.isLoggedIn ) {
      return true;
    } else {
      console.log('Not authenticated. Navigating to login');
      this.router.navigate(['/login']);
      console.log('Navigated to login');
      
      return false;
    }
  }

}
