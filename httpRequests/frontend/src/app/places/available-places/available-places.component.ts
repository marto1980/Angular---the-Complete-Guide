import { HttpClient } from '@angular/common/http'
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { catchError, map, throwError } from 'rxjs'

import { Place } from '../place.model'
import { PlacesContainerComponent } from '../places-container/places-container.component'
import { PlacesComponent } from '../places.component'

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  isFetching = signal(false)
  error = signal('')
  places = signal<Place[] | undefined>([])
  httpClient = inject(HttpClient)
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.isFetching.set(true)
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(
        map((resData) => resData.places),
        catchError((err) => {
          console.log(err)

          return throwError(
            () =>
              new Error(
                'Something went wrong fetching the available places. Please try again later.',
              ),
          )
        }),
      )
      .subscribe({
        next: (places) => {
          this.places.set(places)
        },
        error: (error: Readonly<Error>) => {
          this.error.set(error.message)
        },
        complete: () => {
          this.isFetching.set(false)
        },
      })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }

  onSelectPlace(selectedPlace: Readonly<Place>) {
    this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: selectedPlace.id,
      })
      .pipe(takeUntilDestroyed(this.destroyRef)) // Auto-unsubsribes if component is destroyed
      .subscribe({
        next: (resData) => {
          console.log(resData)
        },
      })
  }
}
