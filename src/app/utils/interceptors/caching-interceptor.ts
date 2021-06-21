import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { startWith, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { RequestCacheService } from '../../services/other/request-cache.service';
import { observable } from 'rxjs';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Requête interceptée : ' + req.urlWithParams);
    // const cachedResponse = this.cache.get(req);
    // return cachedResponse ? Observable.of(cachedResponse) : this.sendRequest(req, next, this.cache);
    return next.handle(req);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(req, event);
        }
      })
    );
  }
}
