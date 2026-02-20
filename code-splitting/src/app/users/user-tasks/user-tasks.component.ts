import { Component, inject, input } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router'

import { UsersService } from '../users.service'

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userName = input.required<string>()
  message = input.required<string>()
  // private activatedRoute = inject(ActivatedRoute);

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: data => {
  //       console.log(data);
  //     }
  //   })
  // }
}

export const resolveUserName: ResolveFn<string> = (
  route: Readonly<ActivatedRouteSnapshot>,
  _state: Readonly<RouterStateSnapshot>,
) => {
  const usersService = inject(UsersService)
  const userName = usersService.users.find((u) => u.id === route.paramMap.get('userId'))?.name ?? ''

  return userName
}

export const resolveTitle: ResolveFn<string> = (
  route: Readonly<ActivatedRouteSnapshot>,
  state: Readonly<RouterStateSnapshot>,
) => {
  const userName = resolveUserName(route, state)

  return `${typeof userName === 'string' ? userName : ''}'s Tasks`
}
