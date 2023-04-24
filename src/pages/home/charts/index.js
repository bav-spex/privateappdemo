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
import Line_Chart from './line_chart'
import Doughnut_Chart from './doughnut_chart'
import Speedometer from './speedometer'

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


const BatchList = () => {
  // ** State

  return (
    <>
        <div>
        {/* <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
        </div> */}
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '45%'}}>
        <Google_Chart />
        </div>
        <div style={{width: '45%'}}>
        <Line_Chart />
        </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',  marginTop: '10vh'}}>
        <div style={{width: '45%'}}>
        <Doughnut_Chart />
        </div>
        <div style={{width: '45%'}}>
        <Speedometer />
        </div>
        </div>
        </div>
    </>
  )
}

export default BatchList
