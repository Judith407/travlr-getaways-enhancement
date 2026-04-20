import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { EditTrip} from './edit-trip/edit-trip';
import {Login} from './login/login';

export const routes: Routes = [
  { path: 'add-trip', component: AddTripComponent },
  { path: 'edit-trip', component: EditTrip },
  { path: 'login', component: Login},
  { path: '', component: TripListingComponent, pathMatch: 'full' }
];