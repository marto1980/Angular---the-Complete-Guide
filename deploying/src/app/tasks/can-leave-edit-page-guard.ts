import { CanDeactivateFn } from '@angular/router'

import { NewTaskComponent } from './new-task/new-task.component'

export const canLeaveEditPageGuard: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.isSubmitted()) {
    return true
  }

  if (component.enteredDate() || component.enteredSummary() || component.enteredTitle()) {
    return confirm('You have unsaved data. Are you sure you want to leave?')
  }

  return true
}
