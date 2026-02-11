import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core'

import { MessagesService } from '../messages.service'

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  cdRef = inject(ChangeDetectorRef)
  private readonly messagesService = inject(MessagesService)
  messages$ = this.messagesService.messages$

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.')

    return 'MessagesList Component Debug Output'
  }
}
