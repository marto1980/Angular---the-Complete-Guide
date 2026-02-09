import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { Log } from '../log'
import { AuthService } from './auth.service'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  hostDirectives: [Log],
})
export class AuthComponent {
  email = signal('')
  password = signal('')
  private readonly authService = inject(AuthService)

  onSubmit() {
    this.authService.authenticate(this.email(), this.password())
  }
}
