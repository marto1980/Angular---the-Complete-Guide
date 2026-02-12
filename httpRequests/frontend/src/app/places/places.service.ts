import { Injectable, signal } from '@angular/core'

import { Place } from './place.model'

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly userPlaces = signal<Readonly<Place>[]>([])

  loadedUserPlaces = this.userPlaces.asReadonly()

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loadAvailablePlaces() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loadUserPlaces() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  addPlaceToUserPlaces(place: Readonly<Place>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  removeUserPlace(place: Readonly<Place>) {}
}
