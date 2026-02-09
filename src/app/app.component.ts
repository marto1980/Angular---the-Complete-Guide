import { Component, inject } from '@angular/core'

import { InvestmentResultsService } from './investment-results.service'

@Component({
  selector: 'app-root',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'finances'
  readonly investmentResultsService = inject(InvestmentResultsService)
}
