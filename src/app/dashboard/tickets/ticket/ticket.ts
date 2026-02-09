import { Component, input, output, signal } from '@angular/core'

import { TicketModel } from './ticket.model'

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.html',
  styleUrl: './ticket.scss',
})
export class Ticket {
  data = input.required<TicketModel>()
  closeTicket = output()
  isDetailsVisible = signal(false)
  onToggleDetails() {
    this.isDetailsVisible.update((wasClosed: boolean) => !wasClosed)
  }

  onMarkAsCompleted() {
    this.closeTicket.emit()
  }
}
