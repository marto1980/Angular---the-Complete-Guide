import { Component, inject, Input } from '@angular/core'

import { TasksService } from '../tasks.service'
import { type Task } from './task.model'

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task
  private readonly tasksService = inject(TasksService)
  onCompleteTask() {
    this.tasksService.removeTask(this.task.id)
  }
}
