import { Component, Inject, Input } from '@angular/core'

import { TasksService } from './tasks.service'

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string
  @Input({ required: true }) name: string | undefined
  isAddingTask = false
  constructor(
    @Inject(TasksService) private readonly tasksService: Readonly<TasksService>,
  ) {}

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId)
  }

  onStartAddTask() {
    this.isAddingTask = true
  }
  onCloseAddTask() {
    this.isAddingTask = false
  }
}
