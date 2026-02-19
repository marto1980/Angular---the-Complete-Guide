import { Component, inject, input } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet } from '@angular/router'

import { UsersService } from '../users.service'

export const userNameResolver: ResolveFn<string> = (route: Readonly<ActivatedRouteSnapshot>) => {
  const usersService = inject(UsersService)
  const userId = route.paramMap.get('userId')

  return (
    usersService.users.find((user) => {
      return user.id === userId
    })?.name ?? ''
  )
}

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userName = input<string>()
  message = input<string>()
}
