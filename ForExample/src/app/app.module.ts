import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { reducer as configReducer } from './store/config/reducer';
import { reducer as authReducer } from './store/auth/reducer';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FeaturesEnum } from './store/features.enum';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NotificationService } from './shared/notification.service';
import { LoginComponent } from './login.component';
import { Facade as authFacade } from './store/auth/facade';
import { Effects as authEffects } from './store/auth/effects';
import { ApiService } from './store/api.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { CookieService } from 'ngx-cookie-service';
import { LoginInterceptor } from './interceptors/login.interceptor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from './guards/auth-guard.service';
import { RolesModule } from './store/auth/roles/roles.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        [FeaturesEnum.CONFIG]: configReducer,
        [FeaturesEnum.AUTH]: authReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: true,
          strictActionSerializability: true,
        },
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([authEffects]),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzSkeletonModule,
    NzButtonModule,
    RolesModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    NotificationService,
    NzMessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true,
    },
    ApiService,
    CookieService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuardService,
    RolesModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
