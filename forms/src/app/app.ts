import { Component } from '@angular/core'

import { SignupComponent } from './auth/signup/signup.component'

@Component({
  selector: 'app-root',
  imports: [SignupComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
