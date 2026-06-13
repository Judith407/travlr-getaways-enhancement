import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private authenticationService: Authentication,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
  }

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
  public deleteTrip(trip: Trip) {
  const confirmed = confirm('Are you sure you want to delete this trip?');

  if (!confirmed) {
    return;
  }

  this.tripService.deleteTrip(trip.code)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        window.location.reload();
      },
      error: (error: any) => {
        console.log('Error deleting trip: ' + error);
        alert('Trip could not be deleted. Please try again.');
      }
    });
}
}