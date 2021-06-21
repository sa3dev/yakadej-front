import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';
import { UserService } from '../services/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class HasPhoneGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = await this.userService.userInfo().toPromise();
        // Redirect to home
        if (user.phoneNumber.length === 0) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }

}
