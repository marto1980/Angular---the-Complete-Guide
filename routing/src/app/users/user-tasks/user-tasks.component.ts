import { Component, computed, inject, input } from '@angular/core'

import { UsersService } from '../users.service'

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input<string>()
  private readonly usersService = inject(UsersService)

  userName = computed(() => {
    return this.usersService.users.find((user) => user.id === this.userId())?.name
  })
}
