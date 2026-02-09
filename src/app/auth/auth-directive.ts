import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'

import { Permission } from './auth.model'
import { AuthService } from './auth.service'

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' })
  private readonly authService = inject(AuthService)
  private readonly templateRef = inject(TemplateRef)
  private readonly viewContainerRef = inject(ViewContainerRef)

  constructor() {
    effect(() => {
      if (this.userType() === this.authService.activePermission()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainerRef.clear()
      }
    })
  }
}
