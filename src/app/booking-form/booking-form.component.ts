import { Component, signal } from '@angular/core';
import { Seat } from '../models/seat.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  imports: [CurrencyPipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {

  presentationInfo = signal<string>('')
  selectedSeats = signal<Seat[]>([])
  totalPrice = signal<number>(-1)
  private presentationId: number = -1
  
  ngOnInit() {
    const bookingInfoStr = localStorage.getItem('bookingInfo')
    if(bookingInfoStr) {
      const bookingInfo = JSON.parse(bookingInfoStr)
      this.presentationInfo.set(bookingInfo.presentationInfo)
      this.selectedSeats.set([...bookingInfo.seats])
      this.totalPrice.set(bookingInfo.totalPrice)
      this.presentationId = bookingInfo.presentationId
    }
  }

}
