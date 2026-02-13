import { HttpClient } from '@angular/common/http'
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core'

import { Place } from '../place.model'
import { PlacesContainerComponent } from '../places-container/places-container.component'
import { PlacesComponent } from '../places.component'
import { PlacesService } from '../places.service'

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
  placesService = inject(PlacesService)

  ngOnInit(): void {
    this.isFetching.set(true)
    const subscription = this.placesService.loadUserPlaces().subscribe({
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
