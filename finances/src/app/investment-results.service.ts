import { Injectable, signal } from '@angular/core'

import { calculateInvestmentResults } from './investment-results/investment-results'
import { InvestmentResult } from './investment-results/investment-results.model'
import {
  initialFormData,
  InputFormData,
  isInputData,
} from './user-input/user-input.model'

@Injectable({ providedIn: 'root' })
class InvestmentResultsService {
  formData = signal<InputFormData>({ ...initialFormData })
  investmentResults = signal<InvestmentResult[]>([])

  onCalculate = () => {
    const data = this.formData()
    if (isInputData(data)) {
      this.investmentResults.set([
        ...calculateInvestmentResults(
          data.initialInvestment,
          data.annualInvestment,
          data.expectedReturn,
          data.duration,
        ),
      ])
    }
    this.formData.set({ ...initialFormData })
  }
}

export { InvestmentResultsService }
