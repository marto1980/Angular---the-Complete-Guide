import { Routes } from '@angular/router'

import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component'
import { TasksComponent, tasksResolver } from '../tasks/tasks.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
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
