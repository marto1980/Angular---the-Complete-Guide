import { inject } from '@angular/core'
import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router'

import { NotFoundComponent } from './not-found/not-found.component'
import { NoTaskComponent } from './tasks/no-task/no-task.component'
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component'

// eslint-disable-next-line sonarjs/function-return-type
const dummyCanMatch: CanMatchFn = () => {
  const router = inject(Router)
  // eslint-disable-next-line sonarjs/pseudo-random
  const shouldGetAccess = Math.random()
  if (shouldGetAccess < 1) {
    return true
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'))
}

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    // redirectTo: '/users/u1',
    // pathMatch: 'full'
    title: 'No task selected',
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    loadChildren: () => import('./users/users.routes').then((module) => module.routes),
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]
