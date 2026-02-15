import {
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { tap } from 'rxjs'

import { routes } from './app.routes'

const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const newReq = req.clone({
    headers: req.headers.set('X-DEBUG', 'TESTING'),
  })

  console.log('[Outgoing Request]', newReq)

  return next(newReq).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log('Incoming Response')
          console.log('Status', event.status)
          console.log('Body', event.body)
        }
      },
    }),
  )
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()), // this prevents showing the loading fallback
    provideHttpClient(withFetch(), withInterceptors([loggingInterceptor])),
  ],
}
