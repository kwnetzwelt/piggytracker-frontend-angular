import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{

      const o = await new Promise<boolean>(async (resolve, reject) => {
        const v = await this.authService.checkIfUserAuthenticated();
        resolve(v);
      });
      if(!o)
        this.router.navigate(["/"]);
      return o;

  }

}
