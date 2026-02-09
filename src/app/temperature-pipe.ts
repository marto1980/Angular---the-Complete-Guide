import { Pipe, PipeTransform } from '@angular/core'

type Temp = 'cel' | 'fah'

const getTransformer = (inputType: Temp, outputType?: Temp) => {
  if (inputType === 'cel' && outputType === 'fah')
    return (value: number) => (value * 9) / 5 + 32
  else if (inputType === 'fah' && outputType === 'cel')
    return (value: number) => ((value - 32) * 5) / 9
  else return (value: number) => value
}

const getSymbol = (type: Temp) => (type === 'cel' ? '°C' : '°F')

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number | string, inputType: Temp, outputType?: Temp) {
    const numValue =
      typeof value === 'string' ? Number.parseFloat(value) : value

    const outputValue = getTransformer(inputType, outputType)(numValue)
    const outputSymbol = getSymbol(outputType ?? inputType)

    return `${outputValue.toFixed(2)} ${outputSymbol}`
  }
}
