import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [barChartData, setBarChartData] = useState({
    datasets:[]
  })

const [chartOptions, setChartOptions] = useState({})

useEffect(()=>{
  setBarChartData({
    labels:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets:[
      {
        label:"Sales $",
        data:[18201, 20234, 18201, 20234, 18201, 20234, 18201],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgb(53, 162, 235, 0.4)'
      },
    ]
  });
  setChartOptions({
    plugins:{
      legend:{
        position: 'top'
      },
      title:{
        display: true,
        text: 'Daily Revenue'
      }
    },
    maintainAspectRatio: false,
    responsive: true
  })
},[])


  return (
    <div>
      <div className='w-full relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
        <Bar data={barChartData} options={chartOptions}></Bar>
      </div>
    </div>
  )
} 

export default BarChart