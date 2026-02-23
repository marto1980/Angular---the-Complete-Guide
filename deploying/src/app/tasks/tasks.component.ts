import { Component, inject, input } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router'

import { userNameResolver } from '../users/user-tasks/user-tasks.component'
import { TaskComponent } from './task/task.component'
import { Task } from './task/task.model'
import { TasksService } from './tasks.service'

export const tasksResolver: ResolveFn<Task[]> = (route: Readonly<ActivatedRouteSnapshot>) => {
  const userId = route.paramMap.get('userId')
  const order = route.queryParamMap.get('order')
  const tasksService = inject(TasksService)
  const userTasks = tasksService
    .allTasks()
    .filter((task) => task.userId === userId)
    .toSorted((a, b) => {
      if (order === 'asc') {
        return a.id > b.id ? 1 : -1
      } else {
        return a.id > b.id ? -1 : 1
      }
    })

  return userTasks.length > 0 ? userTasks : []
}

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
  userTasks = input.required<Task[]>()
}
