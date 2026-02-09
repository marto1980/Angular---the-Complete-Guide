/* eslint-disable sonarjs/pseudo-random */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component } from '@angular/core'

import { LifecycleComponent } from './lifecycle/lifecycle.component'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [LifecycleComponent],
})
export class App {
  lifecycleComponentIsVisible = false
  lifecycleInputText = 'Some Random Number: ' + Math.random() * 100

  onToggleLifecycleComponentVisibility() {
    this.lifecycleComponentIsVisible = !this.lifecycleComponentIsVisible
  }

  onChangeLifecycleInputText() {
    this.lifecycleInputText = 'Some Random Number: ' + Math.random() * 100
  }
}
