import { Routes } from '@angular/router'

import { dummyGuard } from './dummy-guard'
import { NotFound } from './not-found/not-found'
import { NoTaskComponent } from './tasks/no-task/no-task.component'
import { titleResolver } from './tasks/tasks.component'
import { taskRoutes } from './tasks/tasks.routes'
import { userNameResolver, UserTasksComponent } from './users/user-tasks/user-tasks.component'

export const routes: Routes = [
  { path: '', component: NoTaskComponent, title: 'No task selected' },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: taskRoutes,
    canMatch: [dummyGuard],
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: userNameResolver,
    },
    title: titleResolver,
  },
  {
    path: '**',
    component: NotFound,
  },
]
