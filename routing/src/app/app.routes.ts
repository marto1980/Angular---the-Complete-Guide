import { Routes } from '@angular/router'

import { NotFound } from './not-found/not-found'
import { NewTaskComponent } from './tasks/new-task/new-task.component'
import { NoTaskComponent } from './tasks/no-task/no-task.component'
import { TasksComponent } from './tasks/tasks.component'
import { UserTasksComponent } from './users/user-tasks/user-tasks.component'

export const routes: Routes = [
  { path: '', component: NoTaskComponent },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: [
      {
        path: 'tasks',
        component: TasksComponent,
      },
      { path: 'tasks/new', component: NewTaskComponent },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
]
