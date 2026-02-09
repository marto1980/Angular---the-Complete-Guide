import { Directive, ElementRef, inject } from '@angular/core'

@Directive({
  selector: '[appLog]',
  host: {
    '(click)': 'onLog()',
  },
})
export class Log {
  elementRef = inject(ElementRef)
  onLog() {
    console.log('CLICKED')
    console.log(this.elementRef.nativeElement)
  }
}
