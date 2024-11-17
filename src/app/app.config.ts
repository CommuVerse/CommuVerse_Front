import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes)]

};
