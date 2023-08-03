package com.api.bundes.dto;

import com.api.bundes.Entity.Event;

import java.util.List;

public class SubstitutionEvaluation {
    private Event event;
    private Double evaluationScore;


    private List<Double> positiveMetrics;
    private List<Double> negativeMetrics;

    public SubstitutionEvaluation(Event event, Double evaluationScore,
                                  List<Double> positiveMetrics, List<Double> negativeMetrics) {
        this.event = event;
        this.evaluationScore = evaluationScore;
        this.positiveMetrics = positiveMetrics;
        this.negativeMetrics = negativeMetrics;
    }

    public Event getEvent() {
        return event;
    }

    public Double getEvaluationScore() {
        return evaluationScore;
    }

    public List<Double> getPositiveMetrics() {
        return positiveMetrics;
    }

    public void setPositiveMetrics(List<Double> positiveMetrics) {
        this.positiveMetrics = positiveMetrics;
    }

    public List<Double> getNegativeMetrics() {
        return negativeMetrics;
    }

    public void setNegativeMetrics(List<Double> negativeMetrics) {
        this.negativeMetrics = negativeMetrics;
    }
}
