import { Component } from '@angular/core'

import { WelcomeComponent } from './welcome/welcome.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [WelcomeComponent],
})
export class App {}
