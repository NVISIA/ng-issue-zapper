import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  public canActivate(routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    const neededRole = routeSnapshot.data['role'];

    return this.authService.isAuthorizedForRole(neededRole);
  }
}
