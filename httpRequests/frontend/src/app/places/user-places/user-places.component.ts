import { HttpClient } from '@angular/common/http'
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core'
import { catchError, map, throwError } from 'rxjs'

import { Place } from '../place.model'
import { PlacesContainerComponent } from '../places-container/places-container.component'
import { PlacesComponent } from '../places.component'

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal(false)
  error = signal('')
  places = signal<Place[] | undefined>([])
  httpClient = inject(HttpClient)
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.isFetching.set(true)
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/user-places')
      .pipe(
        map((resData) => {
          console.log(resData)

          return resData.places
        }),
        catchError((err) => {
          console.log(err)

          return throwError(
            () =>
              new Error(
                'Something went wrong fetching your favourite places. Please try again later.',
              ),
          )
        }),
      )
      .subscribe({
        next: (places) => {
          this.places.set(places)
        },
        complete: () => {
          this.isFetching.set(false)
        },
        error: (err: Readonly<Error>) => {
          this.error.set(err.message)
        },
      })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }
}
