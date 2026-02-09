import { Component } from '@angular/core'

import { NewTaskComponent } from './new-task/new-task'
import { TasksListComponent } from './tasks-list/tasks-list'

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.html',
  imports: [NewTaskComponent, TasksListComponent],
})
export class TasksComponent {}
