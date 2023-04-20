// // ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// // ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import PieCharts from './TotalRisk'
import Category from './cat'
const TotakRisk = () => {
  return (
    <>
      <Container>
        <Grid container spacing={8}>
          <Grid item xs={12} md={4} style={{ marginLeft: '10%' }}>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <h1>Risks</h1>
              <PieCharts />
              {/* <Dough /> */}
            </Card>
          </Grid>
          <Grid item xs={12} md={4} style={{ marginLeft: '15%' }}>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <h1>Category</h1>
              <Category />
            </Card>
          </Grid>
          <Grid item xs={12} md={4} style={{ marginLeft: '10%' }}>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <h1>Controls</h1>
              <Category />
            </Card>
          </Grid>
          <Grid item xs={12} md={4} style={{ marginLeft: '15%' }}>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <h1>RiskSource</h1>
              <Category />
            </Card>
          </Grid>
          <Grid item xs={12} md={4} style={{ marginLeft: '10%' }}>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <h1>Status</h1>
              <Category />
            </Card>
          </Grid>
          <Grid item xs={12} md={4} style={{ marginLeft: '15%' }}>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <h1>SiteLocation</h1>
              <Category />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default TotakRisk
