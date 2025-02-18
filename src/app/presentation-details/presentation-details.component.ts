import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { PresentationsService } from '../presentations.service';
import { Presentation } from '../models/presentation.model';
import { SeatRow } from '../models/seat-row.model';

@Component({
  selector: 'app-presentation-details',
  imports: [],
  templateUrl: './presentation-details.component.html',
  styleUrl: './presentation-details.component.css'
})
export class PresentationDetailsComponent {

  presentationId = input.required<string>()
  
  private presentationsService = inject(PresentationsService)
  private destroyRef = inject(DestroyRef)

  isFetching = signal(false)
  error = signal(false)
  presentation = signal<Presentation|null>(null)

  ngOnInit() {
    this.isFetching.set(true)
    const subscription = this.presentationsService.loadPresentationDetails(this.presentationId())
    .subscribe({
      next: (presentation) => {
        this.presentation.set(presentation)
        this.isFetching.set(false)
        console.log(presentation)
      },
      error: (error) => {
        this.error.set(true)
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }

  getPresentationInfo() {
    let result = ''
    const filmName = this.presentation()?.filmName
    const room = this.presentation()?.room
    const roomName = room?.name
    const startTime = this.presentation()?.startTime
    if(filmName && roomName && startTime) {
      result = `${filmName}, ${roomName}, ${startTime}`
    }
    return result
  }

  getSeats() {
    let result: SeatRow[] = []
    const room = this.presentation()?.room
    if(room && room.seatRows) {
      result = room.seatRows
    }
    return result
  }

}
