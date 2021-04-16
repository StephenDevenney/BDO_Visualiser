import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = this.authService.getToken();
        if(token)
            req = req.clone({ headers: req.headers.set('Authorization', token)});

        if(!req.headers.has('Content-Type') && !req.headers.has('Content-Type-Ignore'))
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json')});

        req = req.clone({ headers: req.headers.set('Accept', 'application/json')});

        return next.handle(req);
    }
}