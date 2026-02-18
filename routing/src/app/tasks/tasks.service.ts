import { isPlatformBrowser } from '@angular/common'
import { afterNextRender, inject, Injectable, PLATFORM_ID, signal } from '@angular/core'

import { type NewTaskData, Task } from './task/task.model'

const isTasks = (arr: unknown): arr is Task[] => {
  if (Array.isArray(arr)) {
    const obj: unknown = arr[0]
    const taskProps = ['id', 'userId', 'title', 'summary', 'dueDate']

    return (
      typeof obj === 'object' &&
      !!obj &&
      taskProps.every((propName) => Object.keys(obj).includes(propName))
    )
  }

  return false
}

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly platformId = inject(PLATFORM_ID)
  private readonly isBrowser = isPlatformBrowser(this.platformId)
  private readonly tasks = signal([
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary: 'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary: 'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ])

  allTasks = this.tasks.asReadonly()

  constructor() {
    // Access localStorage only on the browser
    afterNextRender(() => {
      const tasks = globalThis.localStorage.getItem('tasks')

      if (tasks) {
        const loadedTasks: unknown = JSON.parse(tasks)

        if (isTasks(loadedTasks)) {
          this.tasks.set(loadedTasks)
        }
      }
    })
  }

  addTask(taskData: Readonly<NewTaskData>, userId: string) {
    this.tasks.update((prevTasks) => [
      {
        id: Date.now().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...prevTasks,
    ])
    this.saveTasks()
  }

  removeTask(id: string) {
    this.tasks.update((prevTasks) => prevTasks.filter((task) => task.id !== id))
    this.saveTasks()
  }

  private saveTasks() {
    // Access localStorage only on the browser
    if (this.isBrowser) {
      globalThis.localStorage.setItem('tasks', JSON.stringify(this.tasks()))
    }
  }
}
