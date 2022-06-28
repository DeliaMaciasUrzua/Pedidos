import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorizationService } from '../components/shared/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  reqClone: any;

  constructor(
    private authService: AuthorizationService,
    private router: Router,

  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
     // console.log('Pasó por interceptor');
     const headers = new HttpHeaders({  //para guardar el token
      'token-usuario': 'ABC123456789'
      });
      this.reqClone = req.clone({   // se clona para enviar este paramatros de headers
        headers
      });

    if (!this.authService.isTokenValid()) {  //si el token no es valido mandarlo al login
      this.reqClone = '';
      console.log('token invalido');
      this.router.navigate(['login'], {replaceUrl: false});
      return next.handle(this.reqClone);
      //Dirigir al login
    } else { //si el token es valido continua.
      console.log('token valido');
      return next.handle(this.reqClone).pipe(
        catchError(this.msjError)
      );
    }



  }


  msjError(error: HttpErrorResponse) {
    console.warn(error);
    // si marca un error especifico simplemente llevar al login y borrar las cookies
    return throwError('Error');
  }
}
