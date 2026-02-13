import { HttpClient } from '@angular/common/http'
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core'
import { map } from 'rxjs'

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
  places = signal<Place[] | undefined>([])
  httpClient = inject(HttpClient)
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.isFetching.set(true)
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map((resData) => resData.places))
      .subscribe({
        next: (places) => {
          this.places.set(places)
        },
        complete: () => {
          this.isFetching.set(false)
        },
      })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }
}
