import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PresentationsService } from '../presentations.service';
import { Film } from '../models/film.model';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-presentations-overview',
  imports: [RouterLink, FormsModule],
  templateUrl: './presentations-overview.component.html',
  styleUrl: './presentations-overview.component.css'
})
export class PresentationsOverviewComponent {

  private presentationsService = inject(PresentationsService)
  private destroyRef = inject(DestroyRef)
  
  isFetching = signal(false)
  error = signal(false)
  loadedFilms = signal<Film[]>([])

  ngOnInit() {
    this.isFetching.set(true)
    const subscription = this.presentationsService.loadFilms()
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
