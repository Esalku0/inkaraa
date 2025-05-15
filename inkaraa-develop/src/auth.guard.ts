import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './app/service/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    logService: LoginService = inject(LoginService);
    router: Router = inject(Router);
  constructor() {}

  canActivate(): boolean {
    if (this.logService.esAdmin()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}