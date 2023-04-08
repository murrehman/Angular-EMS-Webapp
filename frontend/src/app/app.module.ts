import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './appServices/auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { RegisterComponent } from './register/register.component';
import { SocialAuthService, SocialAuthServiceConfig } from "angularx-social-login";
import { SocialLoginModule, GoogleLoginProvider } from "angularx-social-login";
import { CookieService } from 'ngx-cookie-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';

// let config = new SocialAuthService([{
//   id: GoogleLoginProvider.PROVIDER_ID,
//   provider: new GoogleLoginProvider(googleid)
// }])


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    SingleEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    NgxPaginationModule
  ],
  providers: [FormBuilder,
    HttpClient,
    AuthService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.gClientId)
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
