import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms"; 

import { Router } from "@angular/router"; 
import { TripDataService } from '../services/trip-data.service'; 
 
@Component({ 
  selector: 'app-add-trip', 
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './add-trip.html', 
  styleUrl: './add-trip.css' 
}) 
 
export class AddTripComponent implements OnInit { 
 addForm!: FormGroup; 
 submitted = false; 
 //show feedback message to the admin
 message: string = '';
 
 constructor( 
   private formBuilder: FormBuilder, 
   private router: Router, 
   private tripService: TripDataService 
 ) { } 
 
 ngOnInit() { 
   // creates edit form with req validations
   this.addForm = this.formBuilder.group({ 
     _id: [], 
     code: ['', Validators.required], 
     name: ['', Validators.required], 
     length: ['', Validators.required], 
     start: ['', Validators.required], 
     resort: ['', Validators.required], 
     perPerson: ['', Validators.required], 
     image: ['', Validators.required], 
     description: ['', Validators.required], 
     // shows validation
   }) 
 } 
 
 // shows that the form must be valid before submitting
public onSubmit() {
  this.submitted = true;

  //does not save when a req is missing
  if (this.addForm.invalid) {
    this.message = 'Please complete all required fields before saving.';
    //highlights invalid fields for better visuals
    this.addForm.markAllAsTouched();
    return;
  }

  //confirm saving before submitting
  const confirmed = confirm('Are you sure you want to save this trip?');

  if (!confirmed) {
    return;
  }

  // sends data to backend API
  this.tripService.addTrip(this.addForm.value)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.message = 'Trip was saved successfully.';
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
        this.message = 'Trip could not be saved. Please try again.';
      }
    });
}
// get the form short name to access the form fields 
get f() { return this.addForm.controls; } 
}