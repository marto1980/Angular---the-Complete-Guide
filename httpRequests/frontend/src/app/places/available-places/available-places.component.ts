import { HttpClient } from '@angular/common/http'
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { Place } from '../place.model'
import { PlacesContainerComponent } from '../places-container/places-container.component'
import { PlacesComponent } from '../places.component'
import { PlacesService } from '../places.service'

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
  placesService = inject(PlacesService)

  ngOnInit(): void {
    this.isFetching.set(true)
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
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
    this.placesService
      .addPlaceToUserPlaces(selectedPlace)
      .pipe(takeUntilDestroyed(this.destroyRef)) // Auto-unsubcribes if component is destroyed
      .subscribe({
        next: (resData) => {
          console.log(resData)
        },
      })
  }
}
