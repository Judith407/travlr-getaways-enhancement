// Import Angular core functionality and required modules/components
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card';
import {FormsModule} from '@angular/forms';

// Import services and models used for retrieving trip data and authentication
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,

  // Components/modules used inside this component
  imports: [CommonModule, TripCardComponent, FormsModule],

  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',

  // Service provider for retrieving trip data
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {

  // Stores all retrieved trips from the database
  trips: Trip[] = [];

  // Stores messages shown to the user
  message: string = '';

  //search text from user
  searchText: string = '';

  //filter trip
  get filteredTrips(): Trip[] {
    if (!this.searchText) {
      return this.trips;
    }

    return this.trips.filter(trip=>
      trip.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      trip.resort.toLowerCase().includes(this.searchText.toLowerCase()) ||
      trip.code.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  constructor(
    private tripDataService: TripDataService,
    private authenticationService: Authentication,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    console.log('trip-listing constructor');
  }

  // Checks if the current user is logged in
  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  // Navigates user to the add-trip page
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Retrieves trip data from the backend API
  private getStuff(): void {

    // Subscribe to the observable returned from the service
    this.tripDataService.getTrips().subscribe({

      // Runs when trip data is successfully retrieved
      next: (value: Trip[]) => {
        console.log('API value:', value);

        // Store returned trips inside the trips array
        this.trips = [...value];

        // Display message depending on returned results
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database';
        }

        // Force UI update if needed
        this.cdr.detectChanges();
      },

      // Runs if an error occurs during API retrieval
      error: (err: any) => {
        console.log('Error: ' + err);
      }
    });
  }

  // Automatically runs when component loads
  ngOnInit(): void {
    this.getStuff();
  }
}