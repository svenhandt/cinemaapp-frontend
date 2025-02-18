import { Injectable, signal } from '@angular/core';
import { Film } from './models/film.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Presentation } from './models/presentation.model';

@Injectable({
  providedIn: 'root'
})
export class PresentationsService {

  constructor(private httpClient: HttpClient) { }

  loadFilms() {
    const url = environment.backendUrl + '/presentations'
    return this.httpClient
          .get<Film[]>(url, {})
  }

  loadPresentationDetails(id: string) {
    const url = environment.backendUrl + `/presentations/${id}`
    return this.httpClient
          .get<Presentation>(url, {})
  }

}
