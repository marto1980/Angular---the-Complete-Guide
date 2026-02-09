import { InvestmentResult } from './investment-results.model'

const calculateInvestmentResults = (
  initialInvestment: number,
  annualInvestment: number,
  expectedReturn: number,
  duration: number,
): readonly InvestmentResult[] => {
  const helper = (
    year: number,
    investmentValue: number,
    acc: readonly InvestmentResult[],
  ): readonly InvestmentResult[] => {
    if (year > duration) {
      return acc
    }
    const interestEarnedInYear = investmentValue * (expectedReturn / 100)
    const newInvestmentValue =
      investmentValue + interestEarnedInYear + annualInvestment
    const totalInterest =
      newInvestmentValue - annualInvestment * year - initialInvestment
    const result: InvestmentResult = {
      year,
      interest: interestEarnedInYear,
      valueEndOfYear: newInvestmentValue,
      annualInvestment,
      totalInterest,
      totalAmountInvested: initialInvestment + annualInvestment * year,
    }

    return helper(year + 1, newInvestmentValue, [...acc, result])
  }

  return helper(1, initialInvestment, [])
}

export { calculateInvestmentResults }
