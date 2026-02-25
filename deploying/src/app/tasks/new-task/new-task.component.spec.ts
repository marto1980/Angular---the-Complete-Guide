/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable functional/no-let */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideRouter, Router } from '@angular/router'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { TasksService } from '../tasks.service'
import { NewTaskComponent } from './new-task.component'

describe('NewTaskComponent', () => {
  let component: NewTaskComponent
  let fixture: ComponentFixture<NewTaskComponent>
  let tasksServiceSpy: { addTask: ReturnType<typeof vi.fn> }
  let router: Router

  beforeEach(async () => {
    tasksServiceSpy = {
      addTask: vi.fn(),
    }

    await TestBed.configureTestingModule({
      imports: [NewTaskComponent],
      providers: [provideRouter([]), { provide: TasksService, useValue: tasksServiceSpy }],
    }).compileComponents()

    router = TestBed.inject(Router)
    vi.spyOn(router, 'navigate').mockResolvedValue(true)

    fixture = TestBed.createComponent(NewTaskComponent)
    component = fixture.componentInstance
    fixture.componentRef.setInput('userId', 'test-user-id')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call addTask and navigate on submit', () => {
    const title = 'Test Title'
    const summary = 'Test Summary'
    const date = '2023-10-10'

    component.enteredTitle.set(title)
    component.enteredSummary.set(summary)
    component.enteredDate.set(date)

    component.onSubmit()

    expect(tasksServiceSpy.addTask).toHaveBeenCalledWith(
      {
        title,
        summary,
        date,
      },
      'test-user-id',
    )

    expect(component.isSubmitted()).toBe(true)

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(router.navigate).toHaveBeenCalledWith(['/users', 'test-user-id', 'tasks'], {
      replaceUrl: true,
    })
  })

  it('should update signals when inputs change', () => {
    const titleInput = fixture.debugElement.query(By.css('#title')).nativeElement
    const summaryInput = fixture.debugElement.query(By.css('#summary')).nativeElement
    const dateInput = fixture.debugElement.query(By.css('#due-date')).nativeElement

    titleInput.value = 'New Title'
    titleInput.dispatchEvent(new Event('input'))

    summaryInput.value = 'New Summary'
    summaryInput.dispatchEvent(new Event('input'))

    dateInput.value = '2023-12-31'
    dateInput.dispatchEvent(new Event('input'))

    expect(component.enteredTitle()).toBe('New Title')
    expect(component.enteredSummary()).toBe('New Summary')
    expect(component.enteredDate()).toBe('2023-12-31')
  })

  it('should call onSubmit when form is submitted', () => {
    component.enteredTitle.set('Test Title')
    component.enteredSummary.set('Test Summary')
    component.enteredDate.set('2023-10-10')
    fixture.detectChanges()

    const form = fixture.debugElement.query(By.css('form'))
    form.triggerEventHandler('ngSubmit', null)

    expect(tasksServiceSpy.addTask).toHaveBeenCalledWith(
      {
        title: 'Test Title',
        summary: 'Test Summary',
        date: '2023-10-10',
      },
      'test-user-id',
    )
  })
})
