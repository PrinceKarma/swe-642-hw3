import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../../core/services/survey.service';
import { ZipCodeService } from '../../../core/services/zipcode.service';
import { CampusLiked, InterestSource, Recommendation, SurveyRequest } from '../../../core/models/survey.model';
import { minCheckboxValidator } from '../../../shared/validators/checkbox-min.validator';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  surveyForm!: FormGroup;
  isEditMode = false;
  surveyId: number | null = null;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  // Enum options for dropdowns and checkboxes
  campusLikedOptions = [
    { value: CampusLiked.STUDENTS, label: 'Students' },
    { value: CampusLiked.LOCATION, label: 'Location' },
    { value: CampusLiked.CAMPUS, label: 'Campus' },
    { value: CampusLiked.ATMOSPHERE, label: 'Atmosphere' },
    { value: CampusLiked.DORM_ROOMS, label: 'Dorm Rooms' },
    { value: CampusLiked.SPORTS, label: 'Sports' }
  ];

  interestSourceOptions = [
    { value: InterestSource.FRIENDS, label: 'Friends' },
    { value: InterestSource.TELEVISION, label: 'Television' },
    { value: InterestSource.INTERNET, label: 'Internet' },
    { value: InterestSource.OTHER, label: 'Other' }
  ];

  recommendationOptions = [
    { value: Recommendation.VERY_LIKELY, label: 'Very Likely' },
    { value: Recommendation.LIKELY, label: 'Likely' },
    { value: Recommendation.UNLIKELY, label: 'Unlikely' }
  ];

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private zipCodeService: ZipCodeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  /**
   * Initialize the reactive form with validators
   */
  private initializeForm(): void {
    this.surveyForm = this.fb.group({
      // Personal Information
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],

      // Address Information
      streetAddress: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', Validators.required],
      state: ['', Validators.required],

      // Survey Details
      surveyDate: ['', Validators.required],
      recommendation: ['', Validators.required],

      // Preferences (minimum 2 checkboxes required)
      campusLiked: [[], [Validators.required, minCheckboxValidator(2)]],

      // Interest Source
      interestSource: ['', Validators.required],

      // Comments
      comments: ['']
    });
  }

  /**
   * Check if we're in edit mode and load survey data
   */
  private checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.surveyId = +params['id'];
        this.loadSurvey(this.surveyId);
      }
    });
  }

  /**
   * Load survey data for editing
   */
  private loadSurvey(id: number): void {
    this.loading = true;
    this.surveyService.getSurveyById(id).subscribe({
      next: (survey) => {
        this.surveyForm.patchValue({
          firstName: survey.firstName,
          lastName: survey.lastName,
          email: survey.email,
          phoneNumber: survey.phoneNumber,
          streetAddress: survey.streetAddress,
          zipCode: survey.zipCode,
          city: survey.city,
          state: survey.state,
          surveyDate: survey.surveyDate,
          recommendation: survey.recommendation,
          campusLiked: survey.campusLiked,
          interestSource: survey.interestSource,
          comments: survey.comments
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading survey:', error);
        this.errorMessage = 'Failed to load survey data';
        this.loading = false;
      }
    });
  }


  onZipCodeBlur(): void {
      const zipCodeControl = this.surveyForm.get('zipCode');
      const zipCode = zipCodeControl?.value;
      
      // 1. Trim the input value immediately
      const trimmedZipCode = zipCode ? zipCode.trim() : '';

      // 2. Only look up if the trimmed input is exactly 5 digits long  
      if (trimmedZipCode.length === 5) {
          this.lookupZipCode(trimmedZipCode);
      } else {
          // Clear fields immediately for incomplete, empty, or invalid input
          this.surveyForm.patchValue({ city: '', state: '' });
      }
    }


  /**
   * Lookup city and state from ZIP code
   */
  private lookupZipCode(zipCode: string): void {
    this.zipCodeService.getZipCodeInfo(zipCode).subscribe({
      next: (info) => {
        if (info) {
          this.surveyForm.patchValue({
            city: info.city,
            state: info.state
          });
        } else {
          // Clear city and state if ZIP not found
          this.surveyForm.patchValue({
            city: '',
            state: ''
          });
        }
      },
      error: (error) => {
        console.error('Error looking up ZIP code:', error);
      }
    });
  }

  /**
   * Handle checkbox selection for campusLiked
   */
  onCheckboxChange(event: any, value: CampusLiked): void {
    const campusLikedArray: CampusLiked[] = this.surveyForm.get('campusLiked')?.value || [];

    if (event.target.checked) {
      campusLikedArray.push(value);
    } else {
      const index = campusLikedArray.indexOf(value);
      if (index > -1) {
        campusLikedArray.splice(index, 1);
      }
    }

    this.surveyForm.patchValue({ campusLiked: campusLikedArray });
  }

  /**
   * Check if a checkbox is selected
   */
  isCheckboxSelected(value: CampusLiked): boolean {
    const campusLikedArray: CampusLiked[] = this.surveyForm.get('campusLiked')?.value || [];
    return campusLikedArray.includes(value);
  }

  /**
   * Form submission
   */
  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Validate form
    if (this.surveyForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.markFormGroupTouched(this.surveyForm);
      return;
    }

    this.loading = true;
    const surveyData: SurveyRequest = this.surveyForm.value;

    if (this.isEditMode && this.surveyId) {
      // Update existing survey
      this.surveyService.updateSurvey(this.surveyId, surveyData).subscribe({
        next: (response) => {
          this.successMessage = 'Survey updated successfully!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/surveys']), 2000);
        },
        error: (error) => {
          console.error('Error updating survey:', error);
          this.errorMessage = 'Failed to update survey. Please try again.';
          this.loading = false;
        }
      });
    } else {
      // Create new survey
      this.surveyService.createSurvey(surveyData).subscribe({
        next: (response) => {
          this.successMessage = 'Survey submitted successfully! Thank you for your feedback.';
          this.loading = false;
          this.surveyForm.reset();
          this.submitted = false;
          setTimeout(() => this.router.navigate(['/surveys']), 2000);
        },
        error: (error) => {
          console.error('Error creating survey:', error);
          this.errorMessage = 'Failed to submit survey. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  /**
   * Reset form
   */
  onReset(): void {
    this.surveyForm.reset();
    this.submitted = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  /**
   * Helper to mark all fields as touched for validation display
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Helper to check if a field has an error
   */
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.surveyForm.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return field.hasError(errorType) && (field.touched || this.submitted);
    }

    return field.invalid && (field.touched || this.submitted);
  }

  /**
   * Get error message for a field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.surveyForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.hasError('required')) return 'This field is required';
    if (field.hasError('email')) return 'Please enter a valid email address';
    if (field.hasError('pattern')) {
      if (fieldName === 'firstName' || fieldName === 'lastName') {
        return 'Only letters and spaces are allowed';
      }
      if (fieldName === 'zipCode') {
        return 'ZIP code must be 5 digits';
      }
    }
    if (field.hasError('minCheckbox')) return field.errors['minCheckbox'];

    return 'Invalid value';
  }
}
