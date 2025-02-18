import { Routes } from '@angular/router';
import { PresentationsOverviewComponent } from './presentations-overview/presentations-overview.component';
import { PresentationDetailsComponent } from './presentation-details/presentation-details.component';

export const routes: Routes = [
    {
        path: '',
        component: PresentationsOverviewComponent
    },
    {
        path: 'presentation/:presentationId',
        component: PresentationDetailsComponent
    }
];
