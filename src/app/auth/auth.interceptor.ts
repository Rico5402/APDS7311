import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // this adds the token to the headers on the outgoing call to the api
    const authToken = this.authservice.getToken();
    const authRequest = 
      // note the space after Bearer
      request.clone({headers: request.headers.set("Authorization", "Bearer " + authToken)});
    return next.handle(authRequest);
  }
}
