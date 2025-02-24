import { Component, inject, signal } from '@angular/core';
import { Seat } from '../models/seat.model';
import { CurrencyPipe } from '@angular/common';
import { range } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {

  presentationInfo = signal<string>('')
  selectedSeats = signal<Seat[]>([])
  totalPrice = signal<number>(-1)
  expiryMonthList = signal<number[]>([])
  expiryYearList = signal<number[]>([])
  private presentationId: number = -1

  private router = inject(Router)
  
  ngOnInit() {
    const bookingInfoStr = localStorage.getItem('bookingInfo')
    if(bookingInfoStr) {
      const bookingInfo = JSON.parse(bookingInfoStr)
      this.presentationInfo.set(bookingInfo.presentationInfo)
      this.selectedSeats.set([...bookingInfo.seats])
      this.totalPrice.set(bookingInfo.totalPrice)
      this.presentationId = bookingInfo.presentationId
      this.initExpiryMonths()
      this.initExpiryYears()
    }
  }

  private initExpiryMonths() {
    const expiryMonths: number[] = []
    range(1, 12).forEach((val) => expiryMonths.push(val))
    this.expiryMonthList.set(expiryMonths)
  }

  private initExpiryYears() {
    const currentYear = new Date().getFullYear()
    const expiryYears: number[] = []
    range(currentYear, 6).forEach(val => expiryYears.push(val))
    this.expiryYearList.set(expiryYears)
  }

  onNavigateBack() {
    this.router.navigate(['/presentation', this.presentationId])
  }

  onCompleteBooking(formData: NgForm) {
    console.log(formData)
    
  }

}
