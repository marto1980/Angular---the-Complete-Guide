import { Component, computed, inject, Injector, signal } from '@angular/core'

import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model'
import { TasksServiceToken } from '../tasks-service'
import { getCurrentTaskStatus, TaskItemComponent } from './task-item/task-item'

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  private readonly tasksService = inject(TasksServiceToken)
  private readonly injector = inject(Injector)
  protected taskStatusOptions = inject(TASK_STATUS_OPTIONS)
  private readonly selectedFilter = signal<string>('all')
  private readonly filterTasks = () => {
    return this.selectedFilter() === 'all'
      ? this.tasksService.allTasks()
      : this.tasksService
          .allTasks()
          .filter(
            (task) =>
              task.status ===
              getCurrentTaskStatus(this.injector, this.selectedFilter()),
          )
  }
  tasks = computed(this.filterTasks)

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter)
  }
}
