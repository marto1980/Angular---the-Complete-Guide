import { Component, computed, inject, input } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router'

import { userNameResolver } from '../users/user-tasks/user-tasks.component'
import { TaskComponent } from './task/task.component'
import { TasksService } from './tasks.service'

export const titleResolver: ResolveFn<string> = (
  route: Readonly<ActivatedRouteSnapshot>,
  state: Readonly<RouterStateSnapshot>,
) => {
  const resolvedUserName = userNameResolver(route, state)
  const userName = typeof resolvedUserName === 'string' ? resolvedUserName : ''

  return `${userName}'s tasks`
}

@Component({
  selector: 'app-tasks',
  imports: [RouterLink, TaskComponent],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  order = input.required<'asc' | 'desc'>()
  userId = input.required<string>()
  private readonly tasksService = inject(TasksService)
  isLoading = this.tasksService.isLoading

  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .toSorted((a, b) => {
        if (this.order() === 'asc') {
          return a.id > b.id ? 1 : -1
        } else {
          return a.id > b.id ? -1 : 1
        }
      }),
  )
}
