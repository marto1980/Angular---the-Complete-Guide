import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { interval, map } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly destroyRef = inject(DestroyRef)

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
}
