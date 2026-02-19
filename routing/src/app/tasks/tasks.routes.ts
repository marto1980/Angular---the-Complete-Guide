import { Routes } from '@angular/router'

import { NewTaskComponent } from './new-task/new-task.component'
import { TasksComponent, tasksResolver } from './tasks.component'

const taskRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks',
    component: TasksComponent,
    resolve: {
      userTasks: tasksResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  { path: 'tasks/new', component: NewTaskComponent },
]

export { taskRoutes }
