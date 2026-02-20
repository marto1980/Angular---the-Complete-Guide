import { Routes } from '@angular/router'

import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component'
import { TasksComponent, tasksResolver } from '../tasks/tasks.component'
import { TasksService } from '../tasks/tasks.service'

export const routes: Routes = [
  {
    path: '',
    providers: [TasksService],
    children: [
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
    ],
  },
]
