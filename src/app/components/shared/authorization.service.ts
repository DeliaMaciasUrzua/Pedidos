import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private _token: any;


  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {

    // this._token = this.cookieService.get('Auth');

    // // cookieService.delete('Auth');
    // this._token = null;
    // // this._token = JSON.parse(localStorage.getItem('auth_token'));
    // console.log(this._token);
    // if (!this._token) {
    //   console.warn(`Token from local storage was null`);
    //   this.loadToken(null);
    //   this.router.navigate(['login']);
    // }
  }

  isTokenValid(): boolean { //verificar que si sea valido
    this._token = null;
    var isValid = false;
    this._token = this.cookieService.get('Auth');
    // if (!this._token) {
    //   console.warn(`Token from local storage was null`);
    //   // this.loadToken(null);
    //   // this.router.navigate(['login']);
    //   // isValid = false;
    //   // return false;
    // }
    // else {
      if( !!this.loadToken(this._token)) isValid = true;
      // else isValid = false;
    // }


    return isValid;


    // return !!this._token && this._token.expires_in > new Date().getTime();
  }



  loadToken(value: any) {
    // this.cookieService.get('Auth')
    console.log('loadToken: ' + value);
    // this._token = value;
    if (value === null || value === undefined) {
        // localStorage.removeItem('auth_token');
        console.log(this.cookieService.get('Auth'));
        this.cookieService.delete('Auth');
        this.router.navigate(['login'], {replaceUrl: false});
    }
    // else {
    //     // this._token.expires_in = (new Date().getTime() + ((this._token.expires_in - 1) * 1000));
    //     // localStorage.setItem('auth_token', JSON.stringify(this._token));
    // }
    return value;
  }

  get token(): any {
    return this._token;
}

  saveToken(token: any) {  // guardar Token
    this.cookieService.set('Auth', token.value, { expires: token.expires  ,secure: true });
  }


  logout(replaceURL: boolean = false ) {
    // if (!this._token) {
      this.loadToken(null);
      this.router.navigate(['login'], {replaceUrl: replaceURL});
    // }
  }
}
