import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  clickCount = signal(0)
  clickCount$ = toObservable(this.clickCount)
  private readonly destroyRef = inject(DestroyRef)

  // constructor() {
  // effect(() => {
  //   console.log(`Clicked button ${this.clickCount().toString()} times.`)
  // })

  ngOnInit(): void {
    // const subscription = interval(1000)
    //   .pipe(map((value) => value * 2))
    //   .subscribe({
    //     next: (value) => {
    //       console.log(value)
    //     },
    //   })
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe()
    // })
    const subscription = this.clickCount$.subscribe({
      next: (value) => {
        console.log(`Clicked button ${value.toString()} times.`)
      },
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1)
    // console.log(`Clicked ${this.clickCount().toString()} number of times.`)
  }
}
