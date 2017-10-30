import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    readonly FAIL_ROUTE = "/login";

    constructor(private router: Router, private authService: AuthService) { }

    public canActivate() {
       if( this.authService.isAuthenticated ) {
         return true;
       }

        this.router.navigate([this.FAIL_ROUTE]);
        return false;
    }
}
