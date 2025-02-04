import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient,  withInterceptors, } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { loggingInterceptor } from './interceptor/logging.interceptor';
// import { AuthInterceptor } from './Services/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    


    provideHttpClient(withInterceptors([authInterceptor , loggingInterceptor]))
  ]
};
