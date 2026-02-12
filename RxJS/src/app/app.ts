import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { interval, Observable } from 'rxjs'

const createCustomInterval = () =>
  new Observable((subscriber) => {
    // eslint-disable-next-line functional/no-let
    let count = 0
    const intervalId = setInterval(() => {
      if (count > 3) {
        clearInterval(intervalId)
        subscriber.complete()

        return
      }
      subscriber.next({ message: `Custom Interval value ${count.toString()}` })
      count++
    }, 2000)

    return () => {
      clearInterval(intervalId)
      console.log('Custom Interval cleaned up')
    }
  })

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  clickCount = signal(0)
  clickCount$ = toObservable(this.clickCount)
  private readonly destroyRef = inject(DestroyRef)
  interval$ = interval(1000)
  intervalSignal = toSignal(this.interval$, { initialValue: 0 })

  customInterval$ = createCustomInterval()
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
    const customIntervalSubscription = this.customInterval$.subscribe({
      next: (value) => {
        console.log(value)
      },
      complete: () => {
        console.log('COMPLETED!')
      },
    })
    const subscription = this.clickCount$.subscribe({
      next: (value) => {
        console.log(`Clicked button ${value.toString()} times.`)
      },
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
      customIntervalSubscription.unsubscribe()
    })
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1)
    // console.log(`Clicked ${this.clickCount().toString()} number of times.`)
  }
}
