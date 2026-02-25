import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideRouter, Router } from '@angular/router'
import { beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest'

import { TasksService } from '../tasks.service'
import { NewTaskComponent } from './new-task.component'

type NewTaskComponentTestContext = {
  component: NewTaskComponent
  fixture: ComponentFixture<NewTaskComponent>
  tasksServiceSpy: { addTask: ReturnType<typeof vi.fn> }
  navigateSpy: MockInstance
}

describe('NewTaskComponent', () => {
  beforeEach<NewTaskComponentTestContext>(async (context) => {
    const tasksServiceSpy = {
      addTask: vi.fn(),
    }

    await TestBed.configureTestingModule({
      imports: [NewTaskComponent],
      providers: [provideRouter([]), { provide: TasksService, useValue: tasksServiceSpy }],
    }).compileComponents()

    const router = TestBed.inject(Router)
    // eslint-disable-next-line functional/immutable-data
    context.navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true)
    // eslint-disable-next-line functional/immutable-data
    context.tasksServiceSpy = tasksServiceSpy

    const fixture = TestBed.createComponent(NewTaskComponent)
    // eslint-disable-next-line functional/immutable-data
    context.fixture = fixture
    // eslint-disable-next-line functional/immutable-data
    context.component = fixture.componentInstance

    fixture.componentRef.setInput('userId', 'test-user-id')
    fixture.detectChanges()
  })

  const updateInputValue = (
    fixture: Readonly<ComponentFixture<NewTaskComponent>>,
    selector: string,
    value: string,
  ) => {
    const debugElement = fixture.debugElement.query(By.css(selector))
    const nativeElement: unknown = debugElement.nativeElement

    if (nativeElement instanceof HTMLInputElement) {
      // eslint-disable-next-line functional/immutable-data
      nativeElement.value = value
      nativeElement.dispatchEvent(new Event('input'))
    }
  }

  it<NewTaskComponentTestContext>('should create', ({ component }) => {
    expect(component).toBeTruthy()
  })

  it<NewTaskComponentTestContext>('should call addTask and navigate on submit', ({
    component,
    tasksServiceSpy,
    navigateSpy,
  }) => {
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

    expect(navigateSpy).toHaveBeenCalledWith(['/users', 'test-user-id', 'tasks'], {
      replaceUrl: true,
    })
  })

  it<NewTaskComponentTestContext>('should update signals when inputs change', ({
    fixture,
    component,
  }) => {
    updateInputValue(fixture, '#title', 'New Title')
    updateInputValue(fixture, '#summary', 'New Summary')
    updateInputValue(fixture, '#due-date', '2023-12-31')

    expect(component.enteredTitle()).toBe('New Title')
    expect(component.enteredSummary()).toBe('New Summary')
    expect(component.enteredDate()).toBe('2023-12-31')
  })

  it<NewTaskComponentTestContext>('should call onSubmit when form is submitted', ({
    fixture,
    component,
    tasksServiceSpy,
  }) => {
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
