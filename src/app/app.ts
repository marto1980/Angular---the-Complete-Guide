import { DatePipe } from '@angular/common'
import { Component } from '@angular/core'

import { TemperaturePipe } from './temperature-pipe'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [DatePipe, TemperaturePipe],
})
export class App {
  currentDate = new Date()
  currentTemperaturs = {
    berlin: 4.274_981_2,
    newYork: 18.1214,
    paris: 72.120_900_1,
    chicago: 65.077_523_8,
  }

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 18, 27, 33, 31, 9, 11, 5, -12, -5,
  ]

  constructor() {
    this.historicTemperatures.sort((a: number, b: number) => (a > b ? 1 : -1))
  }

  onReset(index: number) {
    this.historicTemperatures.splice(index, 1, 18)
  }
}
