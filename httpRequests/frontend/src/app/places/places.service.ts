import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { catchError, map, tap, throwError } from 'rxjs'

import { Place } from './place.model'

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly httpClient = inject(HttpClient)

  private fetchPlaces(url: string, message: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((err) => {
        console.log(err)

        return throwError(() => new Error(message))
      }),
    )
  }

  private readonly userPlaces = signal<Readonly<Place>[]>([])

  loadedUserPlaces = this.userPlaces.asReadonly()

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching the available places. Please try again later.',
    )
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favourite places. Please try again later.',
    ).pipe(
      tap({
        next: (places) => {
          this.userPlaces.set(places)
        },
      }),
    )
  }

  addPlaceToUserPlaces(place: Readonly<Place>) {
    this.userPlaces.update((prevPlaces) => [...prevPlaces, place])

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  removeUserPlace(place: Readonly<Place>) {}
}
