import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
   
    provideRouter(routes, withComponentInputBinding()),
    

  ]
};
