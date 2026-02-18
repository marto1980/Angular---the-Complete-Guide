import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'

import { UsersService } from '../users.service'

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userName = ''
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly usersService = inject(UsersService)
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    console.log(this.activatedRoute)
    this.activatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (paramMap) => {
        this.userName =
          this.usersService.users.find((user) => user.id === paramMap.get('userId'))?.name ?? ''
      },
    })
  }
}
