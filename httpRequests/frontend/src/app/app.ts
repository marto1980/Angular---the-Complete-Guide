import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { AvailablePlacesComponent } from './places/available-places/available-places.component'
import { UserPlacesComponent } from './places/user-places/user-places.component'

@Component({
  selector: 'app-root',
  imports: [AvailablePlacesComponent, RouterOutlet, UserPlacesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
