package edu.gmu.swe642.survey.service;

import edu.gmu.swe642.survey.dto.SurveyRequestDTO;
import edu.gmu.swe642.survey.dto.SurveyResponseDTO;
import edu.gmu.swe642.survey.exception.SurveyNotFoundException;
import edu.gmu.swe642.survey.model.Survey;
import edu.gmu.swe642.survey.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SurveyServiceImpl implements SurveyService {

    private final SurveyRepository surveyRepository;

    @Override
    @Transactional
    public SurveyResponseDTO createSurvey(SurveyRequestDTO requestDTO) {
        log.info("Creating new survey for email: {}", requestDTO.getEmail());

        Survey survey = mapToEntity(requestDTO);
        Survey savedSurvey = surveyRepository.save(survey);

        log.info("Survey created successfully with ID: {}", savedSurvey.getId());
        return mapToDTO(savedSurvey);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SurveyResponseDTO> getAllSurveys() {
        log.info("Fetching all surveys");

        List<Survey> surveys = surveyRepository.findAll();

        log.info("Found {} surveys", surveys.size());
        return surveys.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SurveyResponseDTO getSurveyById(Long id) {
        log.info("Fetching survey with ID: {}", id);

        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new SurveyNotFoundException("Survey not found with ID: " + id));

        return mapToDTO(survey);
    }

    @Override
    @Transactional
    public SurveyResponseDTO updateSurvey(Long id, SurveyRequestDTO requestDTO) {
        log.info("Updating survey with ID: {}", id);

        Survey existingSurvey = surveyRepository.findById(id)
                .orElseThrow(() -> new SurveyNotFoundException("Survey not found with ID: " + id));

        // Update fields
        existingSurvey.setFirstName(requestDTO.getFirstName());
        existingSurvey.setLastName(requestDTO.getLastName());
        existingSurvey.setEmail(requestDTO.getEmail());
        existingSurvey.setPhoneNumber(requestDTO.getPhoneNumber());
        existingSurvey.setStreetAddress(requestDTO.getStreetAddress());
        existingSurvey.setCity(requestDTO.getCity());
        existingSurvey.setState(requestDTO.getState());
        existingSurvey.setZipCode(requestDTO.getZipCode());
        existingSurvey.setSurveyDate(requestDTO.getSurveyDate());
        existingSurvey.setRecommendation(requestDTO.getRecommendation());
        existingSurvey.setCampusLiked(requestDTO.getCampusLiked());
        existingSurvey.setInterestSource(requestDTO.getInterestSource());
        existingSurvey.setComments(requestDTO.getComments());

        Survey updatedSurvey = surveyRepository.save(existingSurvey);

        log.info("Survey updated successfully with ID: {}", id);
        return mapToDTO(updatedSurvey);
    }

    @Override
    @Transactional
    public void deleteSurvey(Long id) {
        log.info("Deleting survey with ID: {}", id);

        if (!surveyRepository.existsById(id)) {
            throw new SurveyNotFoundException("Survey not found with ID: " + id);
        }

        surveyRepository.deleteById(id);
        log.info("Survey deleted successfully with ID: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public long getSurveyCount() {
        long count = surveyRepository.count();
        log.info("Total survey count: {}", count);
        return count;
    }

    // Helper Methods

    private Survey mapToEntity(SurveyRequestDTO dto) {
        Survey survey = new Survey();
        survey.setFirstName(dto.getFirstName());
        survey.setLastName(dto.getLastName());
        survey.setEmail(dto.getEmail());
        survey.setPhoneNumber(dto.getPhoneNumber());
        survey.setStreetAddress(dto.getStreetAddress());
        survey.setCity(dto.getCity());
        survey.setState(dto.getState());
        survey.setZipCode(dto.getZipCode());
        survey.setSurveyDate(dto.getSurveyDate());
        survey.setRecommendation(dto.getRecommendation());
        survey.setCampusLiked(dto.getCampusLiked());
        survey.setInterestSource(dto.getInterestSource());
        survey.setComments(dto.getComments());
        return survey;
    }

    private SurveyResponseDTO mapToDTO(Survey survey) {
        SurveyResponseDTO dto = new SurveyResponseDTO();
        dto.setId(survey.getId());
        dto.setFirstName(survey.getFirstName());
        dto.setLastName(survey.getLastName());
        dto.setEmail(survey.getEmail());
        dto.setPhoneNumber(survey.getPhoneNumber());
        dto.setStreetAddress(survey.getStreetAddress());
        dto.setCity(survey.getCity());
        dto.setState(survey.getState());
        dto.setZipCode(survey.getZipCode());
        dto.setSurveyDate(survey.getSurveyDate());
        dto.setRecommendation(survey.getRecommendation());
        dto.setCampusLiked(survey.getCampusLiked());
        dto.setInterestSource(survey.getInterestSource());
        dto.setComments(survey.getComments());
        dto.setCreatedAt(survey.getCreatedAt());
        dto.setUpdatedAt(survey.getUpdatedAt());
        return dto;
    }
}
