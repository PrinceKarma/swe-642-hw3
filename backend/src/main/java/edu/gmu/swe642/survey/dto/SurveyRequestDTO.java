/**
 * DTO for survey create and update requests.
 */
package edu.gmu.swe642.survey.dto;

import edu.gmu.swe642.survey.model.CampusLiked;
import edu.gmu.swe642.survey.model.InterestSource;
import edu.gmu.swe642.survey.model.Recommendation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyRequestDTO {

    // Personal Information
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    private String phoneNumber;

    // Address Information
    @NotBlank(message = "Street address is required")
    private String streetAddress;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "ZIP code is required")
    @Pattern(regexp = "\\d{5}", message = "ZIP code must be 5 digits")
    private String zipCode;

    // Survey Details
    @NotNull(message = "Survey date is required")
    private LocalDate surveyDate;

    @NotNull(message = "Recommendation is required")
    private Recommendation recommendation;

    // Preferences
    @NotEmpty(message = "At least one campus feature must be selected")
    private List<CampusLiked> campusLiked;

    @NotNull(message = "Interest source is required")
    private InterestSource interestSource;

    // Additional
    private String comments;
}
