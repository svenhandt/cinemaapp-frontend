import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { PresentationsOverviewComponent } from './presentations-overview/presentations-overview.component';
import { PresentationDetailsComponent } from './presentation-details/presentation-details.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { inject } from '@angular/core';

const hasBookingInfoCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router)
    const bookingInfo = localStorage.getItem('bookingInfo')
    if(bookingInfo) {
        return true
    }
    else {
        return new RedirectCommand(router.parseUrl(''))
    }

}

export const routes: Routes = [
    {
        path: '',
        component: PresentationsOverviewComponent
    },
    {
        path: 'presentation/:presentationId',
        component: PresentationDetailsComponent
    },
    {
        path: 'booking-form',
        component: BookingFormComponent,
        canMatch: [hasBookingInfoCanMatch]
    }
];
