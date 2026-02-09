import { InjectionToken, Provider } from '@angular/core'

type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE'

type TaskStatusOption = {
  value: 'open' | 'in-progress' | 'done'
  taskStatus: TaskStatus
  label: 'Open' | 'Working on it' | 'Completed'
}

type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
}

const taskStatusOptions: TaskStatusOption[] = [
  { value: 'open', taskStatus: 'OPEN', label: 'Open' },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    label: 'Working on it',
  },
  { value: 'done', taskStatus: 'DONE', label: 'Completed' },
]

const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOption[]>(
  'task-status-options',
)

const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: taskStatusOptions,
}

export type { TaskStatus, Task, TaskStatusOption }
export { taskStatusOptionsProvider, TASK_STATUS_OPTIONS }
