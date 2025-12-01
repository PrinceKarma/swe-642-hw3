/**
 * Component for displaying survey list.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../../core/services/survey.service';
import { Survey } from '../../../core/models/survey.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  surveys: Survey[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  totalCount = 0;

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
    this.loadSurveyCount();
  }

  /**
   * Load all surveys from the backend
   */
  loadSurveys(): void {
    this.loading = true;
    this.errorMessage = '';

    this.surveyService.getAllSurveys().subscribe({
      next: (data) => {
        this.surveys = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading surveys:', error);
        this.errorMessage = 'Failed to load surveys. Please try again.';
        this.loading = false;
      }
    });
  }

  /**
   * Load total survey count
   */
  loadSurveyCount(): void {
    this.surveyService.getSurveyCount().subscribe({
      next: (count) => {
        this.totalCount = count;
      },
      error: (error) => {
        console.error('Error loading survey count:', error);
      }
    });
  }

  /**
   * Navigate to create new survey
   */
  createNewSurvey(): void {
    this.router.navigate(['/surveys/new']);
  }

  /**
   * Navigate to view survey details
   */
  viewSurvey(id: number): void {
    this.router.navigate(['/surveys', id]);
  }

  /**
   * Navigate to edit survey
   */
  editSurvey(id: number): void {
    this.router.navigate(['/surveys', id, 'edit']);
  }

  /**
   * Delete a survey
   */
  deleteSurvey(id: number, event: Event): void {
    event.stopPropagation();

    if (!confirm('Are you sure you want to delete this survey? This action cannot be undone.')) {
      return;
    }

    this.loading = true;
    this.surveyService.deleteSurvey(id).subscribe({
      next: () => {
        this.successMessage = 'Survey deleted successfully!';
        this.loadSurveys();
        this.loadSurveyCount();

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error deleting survey:', error);
        this.errorMessage = 'Failed to delete survey. Please try again.';
        this.loading = false;
      }
    });
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Format recommendation enum for display
   */
  formatRecommendation(recommendation: string): string {
    switch (recommendation) {
      case 'VERY_LIKELY':
        return 'Very Likely';
      case 'LIKELY':
        return 'Likely';
      case 'UNLIKELY':
        return 'Unlikely';
      default:
        return recommendation;
    }
  }

  /**
   * Get badge class for recommendation
   */
  getRecommendationBadgeClass(recommendation: string): string {
    switch (recommendation) {
      case 'VERY_LIKELY':
        return 'badge bg-success';
      case 'LIKELY':
        return 'badge bg-primary';
      case 'UNLIKELY':
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  }
}
