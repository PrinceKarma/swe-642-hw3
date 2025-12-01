/**
 * Service interface for survey CRUD operations.
 */
package edu.gmu.swe642.survey.service;

import edu.gmu.swe642.survey.dto.SurveyRequestDTO;
import edu.gmu.swe642.survey.dto.SurveyResponseDTO;

import java.util.List;

public interface SurveyService {

    /**
     * Create a new survey
     */
    SurveyResponseDTO createSurvey(SurveyRequestDTO requestDTO);

    /**
     * Get all surveys
     */
    List<SurveyResponseDTO> getAllSurveys();

    /**
     * Get survey by ID
     */
    SurveyResponseDTO getSurveyById(Long id);

    /**
     * Update existing survey
     */
    SurveyResponseDTO updateSurvey(Long id, SurveyRequestDTO requestDTO);

    /**
     * Delete survey
     */
    void deleteSurvey(Long id);

    /**
     * Get total count of surveys
     */
    long getSurveyCount();
}
