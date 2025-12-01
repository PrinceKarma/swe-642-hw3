/**
 * Exception for when a survey is not found.
 */
package edu.gmu.swe642.survey.exception;

public class SurveyNotFoundException extends RuntimeException {
    public SurveyNotFoundException(String message) {
        super(message);
    }
}
