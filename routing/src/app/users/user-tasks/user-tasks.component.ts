import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
} from '@angular/router'

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
export class UserTasksComponent implements OnInit {
  userName?: string
  message?: string
  destroyRef = inject(DestroyRef)

  activatedRoute = inject(ActivatedRoute)
  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.userName = data['userName']
      },
    })
  }
}
