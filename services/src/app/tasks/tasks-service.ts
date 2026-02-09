import { inject, InjectionToken, signal } from '@angular/core'

import { Logger } from '../logger'
import { Task, TaskStatus } from './task.model'

// @Injectable({
//   providedIn: 'root',
// })
export class TasksService {
  private readonly tasks = signal<Task[]>([])
  allTasks = this.tasks.asReadonly()
  logger = inject(Logger)

  addTask(title: string, description: string) {
    this.tasks.update((oldTasks: readonly Task[]) => {
      return [
        ...oldTasks,
        {
          id: crypto.randomUUID(),
          title: title,
          description: description,
          status: 'OPEN',
        },
      ]
    })
    this.logger.log('ADDED NEW TASK: ' + title)
  }

  changeTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((tasksOld) =>
      tasksOld.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    )
    this.logger.log('CHANGED TASK STATUS TO: ' + newStatus)
  }
}

export const TasksServiceToken = new InjectionToken<TasksService>(
  'tasks-service-token',
)
