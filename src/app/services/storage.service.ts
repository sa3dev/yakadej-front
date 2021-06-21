import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    constructor(
        private localSt: LocalStorageService
    ) { }

    store(key: string, value: string) {
        this.localSt.store(key, value);
    }

    fetch(key: string): string {
        return this.localSt.retrieve(key);
    }

    delete(key: string) {
        this.localSt.clear(key);
    }
}
