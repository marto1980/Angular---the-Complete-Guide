import { Component, computed, inject, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { TaskComponent } from './task/task.component'
import { TasksService } from './tasks.service'

@Component({
  selector: 'app-tasks',
  imports: [RouterLink, TaskComponent],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private readonly tasksService = inject(TasksService)
  protected order = input<'asc' | 'desc'>()
  userId = input.required<string>()
  userTasks = computed(() => {
    return this.tasksService.allTasks().filter((task) => task.userId === this.userId())
  })
  isLoading = this.tasksService.isLoading
}
