import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router'

import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component'
import { Task } from '../tasks/task/task.model'
import { TasksService } from '../tasks/tasks.service'

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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    loadComponent: () => import('../tasks/tasks.component').then((module) => module.TasksComponent),
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: tasksResolver,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
]
