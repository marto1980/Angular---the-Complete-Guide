import { inject } from '@angular/core'
import { CanMatchFn, RedirectCommand, Router } from '@angular/router'

export const dummyGuard: CanMatchFn = () => {
  const router = inject(Router)
  // eslint-disable-next-line sonarjs/pseudo-random
  const shouldMatch = Math.random()

  return shouldMatch > 0.5 ? true : new RedirectCommand(router.parseUrl('unauthorised'))
}
