import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserSessionService} from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private session: UserSessionService,
              private router: Router) {}

  canActivate(): boolean {
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
