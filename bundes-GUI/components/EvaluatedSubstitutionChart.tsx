import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(annotationPlugin, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function EvaluatedSubstitutionChart({
  positiveMetrics,
  negativeMetrics,
}) {
  let data = {
    datasets: [
      {
        label: "Positive",
        data: [], // Add positive metrics data here
        backgroundColor: "rgba(0, 0, 132, 1)",
      },
      {
        label: "Negative",
        data: [], // Add negative metrics data here
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  let options = {
    
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Substitution evaluation metrics"
      },
      annotation: {
        annotations: [
           {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 2,
          }]
        
      }
    },
    scales: {
      x: {
        display: false,
        suggestedMin: -2,
        suggestedMax: +10,
      },
      y: {
        beginAtZero: false,
        suggestedMin: -2,
        suggestedMax: +2,
        ticks: {
          stepSize: 0.5,
        },
      },
    },
  };

  useEffect(() => {
    const positiveData = positiveMetrics?.map((metric, index) => ({
      x: index + 1,
      y: metric,
    }));
    const negativeData = negativeMetrics?.map((metric, index) => ({
      x: index + 1,
      y: -metric,
    }));

    positiveMetrics?.forEach((metric, index)=> options.plugins.annotation.annotations.push({
      type: 'line',
      xMin:index+1,
      xMax:index+1,
      yMin:0,
      yMax:metric,
      borderColor: "rgba(0, 0, 132, 1)",
      borderWidth: 2,
    }));

    negativeMetrics?.forEach((metric, index)=> options.plugins.annotation.annotations.push({
      type: 'line',
      xMin:index+1,
      xMax:index+1,
      yMin:0,
      yMax:-metric,
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
    }));

    data.datasets[0].data = positiveData;
    data.datasets[1].data = negativeData;
  }, []);

  return <Scatter options={options} data={data} />;
}
