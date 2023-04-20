// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import Google_Chart from './google_chart'

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title
} from '@devexpress/dx-react-chart-material-ui';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };



const BatchList = () => {
  // ** State

  
  const data1 = [
    { argument:'Monday', value:10 },
    { argument:'Tuesday', value:40 },
    { argument:'Wednesday', value:10 },
    { argument:'Thursday', value:20 },
    { argument:'Friday', value:20 },
  ];

   const data3 = [
    ["Pizza", "Popularity"],
    ["Pepperoni", 33],
    ["Hawaiian", 26],
    ["Mushroom", 22],
    ["Sausage", 10], // Below limit.
    ["Anchovies", 9], // Below limit.
  ];
  
 const options = {
    title: "Popularity of Types of Pizza",
    sliceVisibilityThreshold: 0.2, // 20%
  };
  
   

  return (
    <>
        <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '50%'}}>
        <Pie data={data} />
        </div>
        <div style={{width: '50%'}}>
    <Chart
      data={data1}
    >
      <PieSeries valueField="value" argumentField="argument" />
      <Title text="Studies per day"/>
    </Chart>
        </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '50%'}}>
        <Google_Chart />
        </div>
        </div>
        </div>
    </>
  )
}

export default BatchList
