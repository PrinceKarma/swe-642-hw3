import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey, SurveyRequest } from '../models/survey.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = `${environment.apiUrl}/api/surveys`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Create a new survey
   */
  createSurvey(survey: SurveyRequest): Observable<Survey> {
    return this.http.post<Survey>(this.apiUrl, survey, this.httpOptions);
  }

  /**
   * Get all surveys
   */
  getAllSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  /**
   * Get survey by ID
   */
  getSurveyById(id: number): Observable<Survey> {
    return this.http.get<Survey>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update existing survey
   */
  updateSurvey(id: number, survey: SurveyRequest): Observable<Survey> {
    return this.http.put<Survey>(`${this.apiUrl}/${id}`, survey, this.httpOptions);
  }

  /**
   * Delete survey
   */
  deleteSurvey(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get total survey count
   */
  getSurveyCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
