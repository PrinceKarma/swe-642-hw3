/**
 * REST controller for survey endpoints at /api/surveys.
 */
package edu.gmu.swe642.survey.controller;

import edu.gmu.swe642.survey.dto.SurveyRequestDTO;
import edu.gmu.swe642.survey.dto.SurveyResponseDTO;
import edu.gmu.swe642.survey.service.SurveyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
public class SurveyController {

    private final SurveyService surveyService;

    /**
     * CREATE - Add a new survey
     * POST /api/surveys
     */
    @PostMapping
    public ResponseEntity<SurveyResponseDTO> createSurvey(@Valid @RequestBody SurveyRequestDTO requestDTO) {
        log.info("POST /api/surveys - Creating new survey");
        SurveyResponseDTO response = surveyService.createSurvey(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * READ - Get all surveys
     * GET /api/surveys
     */
    @GetMapping
    public ResponseEntity<List<SurveyResponseDTO>> getAllSurveys() {
        log.info("GET /api/surveys - Fetching all surveys");
        List<SurveyResponseDTO> surveys = surveyService.getAllSurveys();
        return ResponseEntity.ok(surveys);
    }

    /**
     * READ - Get survey by ID
     * GET /api/surveys/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<SurveyResponseDTO> getSurveyById(@PathVariable Long id) {
        log.info("GET /api/surveys/{} - Fetching survey by ID", id);
        SurveyResponseDTO survey = surveyService.getSurveyById(id);
        return ResponseEntity.ok(survey);
    }

    /**
     * UPDATE - Update existing survey
     * PUT /api/surveys/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<SurveyResponseDTO> updateSurvey(
            @PathVariable Long id,
            @Valid @RequestBody SurveyRequestDTO requestDTO) {
        log.info("PUT /api/surveys/{} - Updating survey", id);
        SurveyResponseDTO response = surveyService.updateSurvey(id, requestDTO);
        return ResponseEntity.ok(response);
    }

    /**
     * DELETE - Delete survey
     * DELETE /api/surveys/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable Long id) {
        log.info("DELETE /api/surveys/{} - Deleting survey", id);
        surveyService.deleteSurvey(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * COUNT - Get total survey count
     * GET /api/surveys/count
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getSurveyCount() {
        log.info("GET /api/surveys/count - Getting survey count");
        long count = surveyService.getSurveyCount();
        return ResponseEntity.ok(count);
    }
}
