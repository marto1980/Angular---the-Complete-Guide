import { Injectable } from '@angular/core'

import { dummyTasks } from './dummy-tasks'
import { type NewTaskData, type Task } from './task/task.model'

@Injectable({ providedIn: 'root' })
class TasksService {
  private tasks = dummyTasks
  constructor() {
    const tasks = localStorage.getItem('tasks')
    if (tasks) {
      this.tasks = JSON.parse(tasks) as Task[]
    }
  }
  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId)
  }
  addTask(taskData: NewTaskData, userId: string) {
    this.tasks = [
      {
        id: Date.now().toString(),
        userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...this.tasks,
    ]
    this.saveTasks()
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id)
    this.saveTasks()
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
}
export { TasksService }
