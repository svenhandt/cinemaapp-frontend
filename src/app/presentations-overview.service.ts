import { Injectable, signal } from '@angular/core';
import { Film } from './models/film.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentationsOverviewService {

  private loadedFilms = signal<Film[]>([])

  constructor(private httpClient: HttpClient) { }

  loadFilms() {
    const url = environment.backendUrl + '/presentations'
    return this.httpClient
          .get<Film[]>(url, {})
          .pipe(
              tap({
                next: (loadedFilms) => this.loadedFilms.set(loadedFilms)
              }) 
          )
  }

}
