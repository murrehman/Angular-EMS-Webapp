import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  // intercept(req: HttpRequest<any>, next: HttpHandler) {

  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     const tokenizedReq = req.clone({
  //       setHeaders: {
  //         'x-auth-token': token
  //         // `Bearer ${token}`
  //       }
  //     });
  //     return next.handle(tokenizedReq)
  //   } else
  //     return next.handle(req);
  // }


  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = localStorage.getItem('token');

    if (token) {
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: token
          // `Bearer ${token}`
        }
      });
      return next.handle(tokenizedReq)
    } else
      return next.handle(req);
  }
}
