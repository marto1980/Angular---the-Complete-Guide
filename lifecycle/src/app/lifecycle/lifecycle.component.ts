import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DestroyRef,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private readonly destroyRef: DestroyRef) {
    console.log('CONSTRUCTOR')
    console.log('text:', this.text)
  }

  ngOnInit() {
    console.log('ngOnInit')
    console.log('text:', this.text)
    this.destroyRef.onDestroy(() => {
      console.log('DestroyRef cleanup logic executed')
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges')
    console.log(changes)
  }

  ngDoCheck() {
    console.log('ngDoCheck')
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit')
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked')
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit')
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked')
  }

  ngOnDestroy() {
    console.log('ngOnDestroy')
  }
}
