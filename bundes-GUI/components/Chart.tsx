import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useTeamId } from "@/context APIs/TeamIdContext";
import { useSeason } from "@/context APIs/SeasonHomePageContext";
import { getEventsDistribution } from "@/data_fetchers/home_page_fetchers/event_fetcher";
import { useEventType } from "@/context APIs/EventTypeContext";
import { useOpponents } from "@/context APIs/OpponentsContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const labels = ["1-15", "16-30", "31-45", "46-60", "61-75", "76-90"];

export function Chart() {
  const { teamId, setTeamId } = useTeamId();
  const { seasons, setSeasons } = useSeason();
  const { eventType, setEventType} = useEventType();
  const [data, setData] = useState({labels:[], datasets:[]});
  const {opponents, setOpponents} = useOpponents();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${eventType.includes("Goal")?"Goals distribution":eventType.includes("Yellow card")?"Fouls distribution":"Substitutions distribution"}`,
      },
    },
  };
  useEffect(() => {
    getEventsDistribution(teamId, seasons, eventType, opponents)
      .then((res) => res.json())
      .then((resData) => {
        setData({
          labels: labels,
          datasets: [
            {
              label: "Team",
              data: resData.byEventsDistribution,
              borderColor: "rgba(10, 143, 4, 1)",
              backgroundColor: "rgba(169, 160, 160, 1)",
            },
            {
              label: "Opponents",
              data: resData.onEventsDistribution,
              borderColor: "rgba(201, 5, 5, 1)",
              backgroundColor: "rgba(169, 160, 160, 1)",
            },
          ],
        });
      });
  }, [teamId, seasons, eventType, opponents]);
  if (!data) return;
  if (data) return <Line data={data} options={options} />;
}

export default Chart;
