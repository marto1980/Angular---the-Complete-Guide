import { Routes } from '@angular/router'

import { NewTaskComponent } from './new-task/new-task.component'
import { TasksComponent } from './tasks.component'

const taskRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  { path: 'tasks/new', component: NewTaskComponent },
]

export { taskRoutes }
