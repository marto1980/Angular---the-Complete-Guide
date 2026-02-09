import { Directive, ElementRef, inject, input } from '@angular/core'

import { Log } from './log'

@Directive({
  selector: 'a[appSafeLink]',
  host: {
    '(click)': 'onConfirmLeaveApp($event)',
  },
  hostDirectives: [Log],
})
export class SafeLink {
  queryParam = input('myapp', { alias: 'appSafeLink' })
  hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef)
  constructor() {
    console.log('Calling AppSafeLink')
  }

  onConfirmLeaveApp(event: Readonly<MouseEvent>) {
    const wantsToLeave = globalThis.confirm(
      'Do you really want to leave the app?',
    )

    if (wantsToLeave) {
      this.hostElement.nativeElement.href =
        this.hostElement.nativeElement.href + `?from=${this.queryParam()}`

      return
    }

    event.preventDefault()
  }
}
