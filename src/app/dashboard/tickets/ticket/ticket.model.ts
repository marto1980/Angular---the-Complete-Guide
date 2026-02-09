type TicketStatus = 'open' | 'closed'

type TicketModel = {
  id: string
  title: string
  request: string
  status: TicketStatus
}

export type { TicketModel }
