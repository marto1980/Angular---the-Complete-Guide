import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { catchError, map, tap, throwError } from 'rxjs'

import { ErrorService } from '../shared/error.service'
import { Place } from './place.model'

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly httpClient = inject(HttpClient)
  private readonly errorService = inject(ErrorService)

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
    const prevPlaces = this.userPlaces()

    if (!prevPlaces.some((prevPlace) => prevPlace.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place])
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError(() => {
          this.userPlaces.set(prevPlaces)
          this.errorService.showError('Failed to store selected place.')

          return throwError(() => new Error('Failed to store selected place.'))
        }),
      )
  }

  removeUserPlace(place: Readonly<Place>) {
    const prevPlaces = this.userPlaces()
    this.userPlaces.set(prevPlaces.filter((prevPlace) => prevPlace.id !== place.id))

    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
      catchError((err) => {
        console.log(err)

        this.userPlaces.set(prevPlaces)
        this.errorService.showError(`Error removing ${place.title}.`)

        return throwError(() => new Error(`Error removing ${place.title}.`))
      }),
    )
  }
}
