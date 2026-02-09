import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  ViewChild,
} from '@angular/core'
import { FormsModule } from '@angular/forms'

import { Button } from '../../../shared/button/button'
import { Control } from '../../../shared/control/control'
import { TicketData } from './new-ticket.model'

@Component({
  selector: 'app-new-ticket',
  imports: [Button, Control, FormsModule],
  templateUrl: './new-ticket.html',
  styleUrl: './new-ticket.scss',
})
export class NewTicket implements OnInit, AfterViewInit {
  @ViewChild('form') form?: ElementRef<HTMLFormElement>
  add = output<TicketData>()
  enteredTitle = ''
  enteredText = ''
  ngOnInit() {
    console.log('ON INIT')
    console.log(this.form?.nativeElement)
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT')
    console.log(this.form?.nativeElement)
  }

  onSubmit() {
    const ticketData: TicketData = {
      title: this.enteredTitle,
      request: this.enteredText,
    }
    this.add.emit(ticketData)
    this.enteredTitle = ''
    this.enteredText = ''
    console.log('title', this.enteredTitle)
    console.log('ticketText', this.enteredText)
  }
}
