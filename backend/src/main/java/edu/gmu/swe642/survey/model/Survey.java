/**
 * JPA entity for student survey data with validation and timestamps.
 */
package edu.gmu.swe642.survey.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "surveys")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Personal Information
    @NotBlank(message = "First name is required")
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Column(nullable = false, length = 255)
    private String email;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    // Address Information
    @NotBlank(message = "Street address is required")
    @Column(name = "street_address", nullable = false)
    private String streetAddress;

    @NotBlank(message = "City is required")
    @Column(nullable = false, length = 100)
    private String city;

    @NotBlank(message = "State is required")
    @Column(nullable = false, length = 50)
    private String state;

    @NotBlank(message = "ZIP code is required")
    @Pattern(regexp = "\\d{5}", message = "ZIP code must be 5 digits")
    @Column(name = "zip_code", nullable = false, length = 10)
    private String zipCode;

    // Survey Details
    @NotNull(message = "Survey date is required")
    @Column(name = "survey_date", nullable = false)
    private LocalDate surveyDate;

    @NotNull(message = "Recommendation is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Recommendation recommendation;

    // Preferences - What they liked most about campus
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "survey_campus_liked",
        joinColumns = @JoinColumn(name = "survey_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "campus_liked")
    private List<CampusLiked> campusLiked;

    // Interest Source - How they became interested
    @NotNull(message = "Interest source is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "interest_source", nullable = false, length = 20)
    private InterestSource interestSource;

    // Additional Information
    @Column(columnDefinition = "TEXT")
    private String comments;

    // Metadata
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
