import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';
import { UserService } from '../services/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {

    constructor(
        private router: Router,
        private storageService: StorageService,
        private userService: UserService
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.storageService.fetch('token');
        const isConnected = token !== null && token.length > 0;
        if (!isConnected) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }

}
