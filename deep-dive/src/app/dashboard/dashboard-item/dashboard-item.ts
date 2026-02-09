import { Component, input } from '@angular/core'

import { Image } from './dashboard-item.model'

@Component({
  selector: 'app-dashboard-item',
  imports: [],
  templateUrl: './dashboard-item.html',
  styleUrl: './dashboard-item.scss',
})
export class DashboardItem {
  image = input.required<Image>()
  title = input.required<string>()
}
