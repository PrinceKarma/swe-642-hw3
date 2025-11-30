// Enums
export enum Recommendation {
  VERY_LIKELY = 'VERY_LIKELY',
  LIKELY = 'LIKELY',
  UNLIKELY = 'UNLIKELY'
}

export enum CampusLiked {
  STUDENTS = 'STUDENTS',
  LOCATION = 'LOCATION',
  CAMPUS = 'CAMPUS',
  ATMOSPHERE = 'ATMOSPHERE',
  DORM_ROOMS = 'DORM_ROOMS',
  SPORTS = 'SPORTS'
}

export enum InterestSource {
  FRIENDS = 'FRIENDS',
  TELEVISION = 'TELEVISION',
  INTERNET = 'INTERNET',
  OTHER = 'OTHER'
}

// Survey Request DTO (for POST/PUT)
export interface SurveyRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  surveyDate: string; // ISO date string
  recommendation: Recommendation;
  campusLiked: CampusLiked[];
  interestSource: InterestSource;
  comments?: string;
}

// Survey Response DTO (from GET)
export interface Survey {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  surveyDate: string;
  recommendation: Recommendation;
  campusLiked: CampusLiked[];
  interestSource: InterestSource;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

// ZipCode Model
export interface ZipCodeInfo {
  zip: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
}
