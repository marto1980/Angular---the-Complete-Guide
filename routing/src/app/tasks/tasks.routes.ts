import { Routes } from '@angular/router'

import { canLeaveEditPageGuard } from './can-leave-edit-page-guard'
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
  { path: 'tasks/new', component: NewTaskComponent, canDeactivate: [canLeaveEditPageGuard] },
]

export { taskRoutes }
