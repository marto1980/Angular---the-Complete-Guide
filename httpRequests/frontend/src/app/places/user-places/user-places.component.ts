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
  placesService = inject(PlacesService)
  isFetching = signal(false)
  error = signal('')
  places = this.placesService.loadedUserPlaces
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.isFetching.set(true)
    const subscription = this.placesService.loadUserPlaces().subscribe({
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

  onRemovePlace(place: Readonly<Place>) {
    console.log('Removing place ' + place.title)
    this.placesService.removeUserPlace(place).subscribe({
      next: (value) => {
        console.log(value)
      },
    })
  }
}
