import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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
    this.placesService
      .loadUserPlaces()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.isFetching.set(false)
        },
        error: (err: Readonly<Error>) => {
          this.error.set(err.message)
        },
      })
  }

  onRemovePlace(place: Readonly<Place>) {
    this.placesService
      .removeUserPlace(place)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          console.log(value)
        },
      })
  }
}
