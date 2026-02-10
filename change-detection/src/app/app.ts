import { Component } from '@angular/core'

import { CounterComponent } from './counter/counter.component'
import { MessagesComponent } from './messages/messages.component'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CounterComponent, MessagesComponent],
})
export class App {
  get debugOutput() {
    console.log('[AppComponent] "debugOutput" binding re-evaluated.')

    return 'AppComponent Component Debug Output'
  }
}
