import { Component, computed, inject, signal } from '@angular/core'

import { AuthComponent } from './auth/auth'
import { AuthDirective } from './auth/auth-directive'
import { AuthService } from './auth/auth.service'
import { LearningResourcesComponent } from './learning-resources/learning-resources'

@Component({
  selector: 'app-root',

  imports: [AuthComponent, LearningResourcesComponent, AuthDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('directives')
  private readonly authService = inject(AuthService)
  private readonly checkIsAdmin = () =>
    this.authService.activePermission() === 'admin'

  isAdmin = computed(this.checkIsAdmin)
}
