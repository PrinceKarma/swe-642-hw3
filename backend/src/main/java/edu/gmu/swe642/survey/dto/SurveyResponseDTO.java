package edu.gmu.swe642.survey.dto;

import edu.gmu.swe642.survey.model.CampusLiked;
import edu.gmu.swe642.survey.model.InterestSource;
import edu.gmu.swe642.survey.model.Recommendation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyResponseDTO {

    private Long id;

    // Personal Information
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;

    // Address Information
    private String streetAddress;
    private String city;
    private String state;
    private String zipCode;

    // Survey Details
    private LocalDate surveyDate;
    private Recommendation recommendation;

    // Preferences
    private List<CampusLiked> campusLiked;
    private InterestSource interestSource;

    // Additional
    private String comments;

    // Metadata
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
