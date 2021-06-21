import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';
import { UserService } from '../services/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {

    constructor(
        private storageService: StorageService,
        private userService: UserService
    ) {
    }

    async canActivate() {

        const token = this.storageService.fetch('token');
        const isConnected = token !== null && token.length > 0;
        const user = await this.userService.userInfo().toPromise();

        if (!isConnected || (isConnected && user.phoneNumber.length === 0)) {
            return true;
        }
        return false;
    }

}
