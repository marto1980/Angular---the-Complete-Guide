import { inject } from '@angular/core'
import { CanMatchFn, RedirectCommand, Router } from '@angular/router'

export const dummyGuard: CanMatchFn = () => {
  const router = inject(Router)
  const shouldMatch = crypto.getRandomValues(new Uint32Array(1))[0] / 4_294_967_296

  return shouldMatch > 0.5 ? true : new RedirectCommand(router.parseUrl('unauthorised'))
}
