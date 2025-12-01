/**
 * Service for ZIP code lookup and auto-fill.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ZipCodeInfo } from '../models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  private zipCodesData: any[] = [];
  private dataLoaded = false;

  constructor(private http: HttpClient) {
    this.loadZipCodes();
  }

  /**
   * Load zipcodes.json file on service initialization
   */
  private loadZipCodes(): void {
    this.http.get<any[]>('assets/zipcodes.json')
      .pipe(
        tap(data => {
          this.zipCodesData = data;
          this.dataLoaded = true;
          console.log('ZIP codes loaded successfully:', data.length, 'entries');
        }),
        catchError(error => {
          console.error('Error loading ZIP codes:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  /**
   * Get city and state for a given ZIP code
   */
getZipCodeInfo(zipCode: string): Observable<ZipCodeInfo | null> {
    const trimmedZipCode = zipCode ? zipCode.trim() : '';
    
    // 2. Enforce 5-digit requirement using the trimmed value.
    if (!this.dataLoaded || trimmedZipCode.length !== 5) {
      return of(null); 
    }

    // Convert trimmedZipCode to number for comparison since JSON has numeric zip_code
    const zipCodeNum = parseInt(trimmedZipCode, 10);
    
    // 3. Add safety check for non-numeric input.
    if (isNaN(zipCodeNum)) {
        return of(null); 
    }

    // Lookup: This performs a strict numeric comparison (number === number)
    const zipData = this.zipCodesData.find(item => item.zip_code === zipCodeNum);

    if (zipData) {
      const info: ZipCodeInfo = {
        zip: zipData.zip_code.toString(),
        city: zipData.city,
        state: zipData.state,
        latitude: zipData.latitude,
        longitude: zipData.longitude
      };
      return of(info);
    }

    return of(null);
  }

  /**
   * Check if ZIP codes data is loaded
   */
  isDataLoaded(): boolean {
    return this.dataLoaded;
  }
}
