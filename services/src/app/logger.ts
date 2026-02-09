import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class Logger {
  log(message: string) {
    const now = new Date()
    console.log(`${now.toLocaleDateString()}: ${message}`)
  }
}
