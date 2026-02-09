import { Component } from '@angular/core'

import { TasksComponent } from './tasks/tasks'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [TasksComponent],
})
export class App {}
