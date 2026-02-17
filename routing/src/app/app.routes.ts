import { Routes } from '@angular/router'

import { NoTaskComponent } from './tasks/no-task/no-task.component'
import { TasksComponent } from './tasks/tasks.component'

export const routes: Routes = [
  { path: '', component: NoTaskComponent },
  { path: 'tasks', component: TasksComponent },
]
