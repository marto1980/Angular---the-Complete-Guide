import {
  Component,
  computed,
  inject,
  Inject,
  Injector,
  input,
  runInInjectionContext,
} from '@angular/core'
import { FormsModule } from '@angular/forms'

import {
  Task,
  TASK_STATUS_OPTIONS,
  TaskStatus,
  TaskStatusOption,
} from '../../task.model'
import { TasksService, TasksServiceToken } from '../../tasks-service'

const getCurrentTaskStatusLabel = (
  injector: Injector,
  taskStatus: TaskStatus,
): TaskStatusOption['label'] =>
  runInInjectionContext(injector, () => {
    const taskStatusOptions = inject(TASK_STATUS_OPTIONS)
    console.log('taskStatusOptions', taskStatusOptions)

    return (
      taskStatusOptions.find(
        (taskStatusOption: Readonly<TaskStatusOption>) =>
          taskStatusOption.taskStatus === taskStatus,
      )?.label ?? 'Open'
    )
  })

export const getCurrentTaskStatus = (
  injector: Injector,
  statusValue: string,
): TaskStatus =>
  runInInjectionContext(injector, () => {
    const taskStatusOptions = inject(TASK_STATUS_OPTIONS)

    return (
      taskStatusOptions.find(
        (taskStatusOption: Readonly<TaskStatusOption>) =>
          taskStatusOption.value === statusValue,
      )?.taskStatus ?? 'OPEN'
    )
  })

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItemComponent {
  task = input.required<Task>()
  private readonly elementInjector = inject(Injector)
  protected readonly taskStatusOptions = inject(TASK_STATUS_OPTIONS)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  taskStatus = computed(() =>
    getCurrentTaskStatusLabel(this.elementInjector, this.task().status),
  )
  // private readonly tasksService = inject(TasksServiceToken)

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    @Inject(TasksServiceToken)
    private readonly tasksService: Readonly<TasksService>,
  ) {}

  onChangeTaskStatus(taskId: string, status: string) {
    this.tasksService.changeTaskStatus(
      taskId,
      getCurrentTaskStatus(this.elementInjector, status),
    )
  }
}
