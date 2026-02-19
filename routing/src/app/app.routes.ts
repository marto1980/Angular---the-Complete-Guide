import { Routes } from '@angular/router'

import { NotFound } from './not-found/not-found'
import { NoTaskComponent } from './tasks/no-task/no-task.component'
import { taskRoutes } from './tasks/tasks.routes'
import { UserTasksComponent } from './users/user-tasks/user-tasks.component'

export const routes: Routes = [
  { path: '', component: NoTaskComponent },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: taskRoutes,
    data: {
      message: 'Hello!',
    },
  },
  {
    path: '**',
    component: NotFound,
  },
]
