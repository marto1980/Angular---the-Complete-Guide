import { DatePipe } from '@angular/common'
import { Component, inject, input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { CardComponent } from '../../shared/card/card.component'
import { TasksService } from '../tasks.service'
import { type Task } from './task.model'

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<Task>()
  private readonly tasksService = inject(TasksService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  onComplete() {
    this.tasksService.removeTask(this.task().id)
    void this.router.navigate(['./'], {
      onSameUrlNavigation: 'reload',
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
    })
  }
}
