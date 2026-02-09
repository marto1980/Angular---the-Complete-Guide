import { Component, inject } from '@angular/core'

import { InvestmentResultsService } from '../investment-results.service'

@Component({
  selector: 'app-investment-results',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.scss',
})
export class InvestmentResultsComponent {
  readonly investmentResultsService = inject(InvestmentResultsService)
}
