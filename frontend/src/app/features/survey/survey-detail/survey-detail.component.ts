import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../../core/services/survey.service';
import { Survey } from '../../../core/models/survey.model';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.css']
})
export class SurveyDetailComponent implements OnInit {
  survey: Survey | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadSurvey(id);
      }
    });
  }

  /**
   * Load survey details
   */
  loadSurvey(id: number): void {
    this.loading = true;
    this.surveyService.getSurveyById(id).subscribe({
      next: (data) => {
        this.survey = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading survey:', error);
        this.errorMessage = 'Survey not found.';
        this.loading = false;
      }
    });
  }

  /**
   * Navigate to edit
   */
  editSurvey(): void {
    if (this.survey) {
      this.router.navigate(['/surveys', this.survey.id, 'edit']);
    }
  }

  /**
   * Delete survey
   */
  deleteSurvey(): void {
    if (!this.survey) return;

    if (!confirm('Are you sure you want to delete this survey?')) {
      return;
    }

    this.surveyService.deleteSurvey(this.survey.id).subscribe({
      next: () => {
        this.router.navigate(['/surveys']);
      },
      error: (error) => {
        console.error('Error deleting survey:', error);
        this.errorMessage = 'Failed to delete survey.';
      }
    });
  }

  /**
   * Format enum values for display
   */
  formatEnum(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Format date
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
