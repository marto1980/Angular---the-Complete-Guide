import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterLink } from '@angular/router'

import { TaskComponent } from './task/task.component'
import { TasksService } from './tasks.service'

@Component({
  selector: 'app-tasks',
  imports: [RouterLink, TaskComponent],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  private readonly tasksService = inject(TasksService)
  // protected order = input<'asc' | 'desc'>()
  order = signal<'asc' | 'desc'>('desc')
  userId = input.required<string>()
  userTasks = computed(() => {
    return this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .toSorted((a, b) => {
        if (this.order() === 'asc') {
          return a.id > b.id ? 1 : -1
        } else {
          return a.id > b.id ? -1 : 1
        }
      })
  })
  isLoading = this.tasksService.isLoading
  activatedRoute = inject(ActivatedRoute)
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (paramMap) => {
        const orderValue = paramMap.get('order')

        if (orderValue && (orderValue === 'asc' || orderValue === 'desc')) {
          this.order.set(orderValue)
        }
      },
    })
  }
}
