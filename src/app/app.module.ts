import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Componentes
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';

import { CookieService } from 'ngx-cookie-service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,  // habilitar el uso de interceptor
      useClass: TokenInterceptorService,  // hacer referencia a cual clase
      multi: true   //que este pendiente de las peticiones que se hagan
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
