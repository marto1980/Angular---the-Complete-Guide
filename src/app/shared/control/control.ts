import {
  afterEveryRender,
  afterNextRender,
  Component,
  contentChild,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core'

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.html',
  styleUrl: './control.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'control', '(click)': 'onClick()' },
})
export class Control {
  private readonly control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input')
  label = input.required<string>()
  el = inject(ElementRef)
  constructor() {
    afterEveryRender(() => {
      console.log('afterEveryRender')
    })

    afterNextRender(() => {
      console.log('afterNextRender')
    })
  }

  onClick() {
    console.log('Control clicked')
    console.log(this.el)
    console.log(this.control())
  }
}
