import { isPlatformBrowser } from '@angular/common'
import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core'

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.html',
  styleUrl: './server-status.scss',
})
export class ServerStatus implements OnInit, AfterViewInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline')
  private readonly platformId = inject(PLATFORM_ID)
  private readonly destroyRef = inject(DestroyRef)

  constructor() {
    effect(() => {
      console.log('currentStatus', this.currentStatus())
    })
  }
  ngOnInit() {
    console.log('ON INIT')
    if (isPlatformBrowser(this.platformId)) {
      const interval = setInterval(() => {
        // eslint-disable-next-line sonarjs/pseudo-random
        const rnd = Math.random()
        if (rnd < 0.5) {
          this.currentStatus.set('online')
        } else if (rnd < 0.9) {
          this.currentStatus.set('offline')
        } else {
          this.currentStatus.set('unknown')
        }
      }, 5000)
      this.destroyRef.onDestroy(() => {
        console.log('DESTROY')
        clearInterval(interval)
      })
    }
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT')
  }
}
