import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core'
import { interval, map } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly destroyRef = inject(DestroyRef)

  constructor() {
    effect(() => {
      console.log(`Clicked button ${this.clickCount().toString()} times.`)
    })
  }
  ngOnInit(): void {
    const subscription = interval(1000)
      .pipe(map((value) => value * 2))
      .subscribe({
        next: (value) => {
          console.log(value)
        },
      })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }

  clickCount = signal(0)
  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1)
    // console.log(`Clicked ${this.clickCount().toString()} number of times.`)
  }
}
