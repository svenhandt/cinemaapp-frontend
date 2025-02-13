import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PresentationsOverviewService } from '../presentations-overview.service';
import { Film } from '../models/film.model';

@Component({
  selector: 'app-presentations-overview',
  imports: [],
  templateUrl: './presentations-overview.component.html',
  styleUrl: './presentations-overview.component.css'
})
export class PresentationsOverviewComponent {

  private presentationsOverviewService = inject(PresentationsOverviewService)
  private destroyRef = inject(DestroyRef)
  
  isFetching = signal(false)
  error = signal(false)
  loadedFilms = signal<Film[]>([])

  ngOnInit() {
    this.isFetching.set(true)
    const subscription = this.presentationsOverviewService.loadFilms()
      .subscribe({
        next: (loadedFilms) => {
          this.loadedFilms.set(loadedFilms)
          this.isFetching.set(false)
        },
        error: (error) => {
          this.error.set(true)
        }
      })

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe()
      })
  }

}
