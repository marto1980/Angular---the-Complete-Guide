import { Component, ElementRef, inject, viewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TasksServiceToken } from '../tasks-service'

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.scss',
})
export class NewTaskComponent {
  private readonly formEl = viewChild<ElementRef<HTMLFormElement>>('form')
  private readonly tasksService = inject(TasksServiceToken)

  onAddTask(title: string, description: string) {
    console.log('title', title, 'description', description)
    // this.formEl()?.nativeElement.reset()
    this.tasksService.addTask(title, description)
  }
}
