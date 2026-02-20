import { Component, inject, input } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn, RouterLink } from '@angular/router'

import { TaskComponent } from './task/task.component'
import { Task } from './task/task.model'
import { TasksService } from './tasks.service'

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userTasks = input.required<Task[]>()
  userId = input.required<string>()
  order = input<'asc' | 'desc' | undefined>()
}

export const tasksResolver: ResolveFn<Task[]> = (route: Readonly<ActivatedRouteSnapshot>) => {
  const userId = route.paramMap.get('userId')
  const order = route.queryParamMap.get('order')
  const tasksService = inject(TasksService)
  const filteredUserTasks = tasksService.allTasks().filter((task) => task.userId === userId)
  const userTasks = filteredUserTasks.toSorted((a: Readonly<Task>, b: Readonly<Task>) => {
    if (order === 'asc') {
      return a.id > b.id ? 1 : -1
    } else {
      return a.id > b.id ? -1 : 1
    }
  })

  return userTasks.length > 0 ? userTasks : []
}
