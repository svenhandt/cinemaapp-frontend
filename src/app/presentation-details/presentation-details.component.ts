import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { PresentationsService } from '../presentations.service';
import { Presentation } from '../models/presentation.model';
import { SeatRow } from '../models/seat-row.model';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Seat } from '../models/seat.model';

@Component({
  selector: 'app-presentation-details',
  imports: [CurrencyPipe],
  templateUrl: './presentation-details.component.html',
  styleUrl: './presentation-details.component.css'
})
export class PresentationDetailsComponent {

  presentationId = input.required<string>()
  
  private router = inject(Router)
  private presentationsService = inject(PresentationsService)
  private destroyRef = inject(DestroyRef)

  isFetching = signal(false)
  error = signal(false)
  presentation = signal<Presentation|null>(null)

  currentTotalPrice = signal<number>(0)
  private selectedSeats: Seat[] = []

  ngOnInit() {
    this.isFetching.set(true)
    const subscription = this.presentationsService.loadPresentationDetails(this.presentationId())
    .subscribe({
      next: (presentation) => {
        this.presentation.set(presentation)
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

  getSeatRows() {
    let result: SeatRow[] = []
    const room = this.presentation()?.room
    if(room && room.seatRows) {
      result = room.seatRows
    }
    return result
  }

  onChangeCheckbox(event: any, seat: Seat) {
    if(event.target.checked) {
      this.addSelectedSeatAndCalculate(seat)
    }
    else {
      this.removeSeatAndCalculate(seat)
    }
    console.log(this.selectedSeats)
  }

  onBackButtonClick() {
    this.router.navigateByUrl('')
  }

  onContinueButtonClick() {
    const bookingInfo = {
      presentationId: this.presentation()?.id,
      presentationInfo: this.getPresentationInfo(),
      totalPrice: this.currentTotalPrice(),
      seats: this.selectedSeats
    }
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo))
    this.router.navigateByUrl('/booking-form')
  }

  private addSelectedSeatAndCalculate(seat: Seat) {
    const presentationPrice = this.presentation()?.price
    if(presentationPrice) {
        const currentTotal = this.currentTotalPrice()
        this.currentTotalPrice.set(currentTotal + presentationPrice)
        this.selectedSeats.push(seat)
    }
  }

  private removeSeatAndCalculate(seat: Seat) {
    const presentationPrice = this.presentation()?.price
    if(presentationPrice) {
        const currentTotal = this.currentTotalPrice()
        this.currentTotalPrice.set(currentTotal - presentationPrice)
        this.selectedSeats = this.selectedSeats.filter(currentSeat => currentSeat.id !== seat.id)
    }
  }

}
