import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient,  withInterceptors, } from '@angular/common/http';
// import { AuthInterceptor } from './Services/auth-interceptor.service';
import { authInterceptor } from './interceptor/auth.interceptor';
import { loggingInterceptor } from './interceptor/logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

    provideHttpClient(withInterceptors([authInterceptor , loggingInterceptor]))
  ]
};
