import { Component, Input, output } from '@angular/core'

import { type User } from './user.model'

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input({ required: true }) user!: User
  @Input({ required: true }) selected!: boolean
  select = output<string>()
  get ImagePath() {
    return 'assets/users/' + this.user.avatar
  }

  onSelectUser() {
    this.select.emit(this.user.id)
  }
}
