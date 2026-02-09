import { Component } from '@angular/core'

import { DUMMY_USERS } from './dummy-users'

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  users = DUMMY_USERS
  selectedUserId?: string
  get selectedUser() {
    return DUMMY_USERS.find((user) => user.id === this.selectedUserId)
  }
  onSelectUser(id: string) {
    this.selectedUserId = id
    console.log('Selected user with id:' + id)
  }
}
