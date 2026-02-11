import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { interval } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    const subscription = interval(1000).subscribe({
      next: (value) => {
        console.log(value)
      },
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }
}
