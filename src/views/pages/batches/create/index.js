// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import Schedule from '../../training/schedule'
import FacilitatorList from '../../training/facilitate'
import AttendeesList from '../../training/attendees'
import CoordinatorList from '../../training/coordinator'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Store Imports
import { useSelector } from 'react-redux'

const CreateBatch = props => {
  const { steps } = props

  const store = useSelector(state => state.schedule)

  // ** States
  const [activeStep, setActiveStep] = useState(0)

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Batch is Submitted')
    }
  }

  const handleReset = () => {
    setSchedule({})
    setFacilitator([])
    setCoordinator([])
    setAttendees([])
    setActiveStep(0)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <Schedule handleBack={handleBack} handleNext={handleNext} />
      case 1:
        return <CoordinatorList handleBack={handleBack} handleNext={handleNext} />
      case 2:
        return <FacilitatorList handleBack={handleBack} handleNext={handleNext} />

      case 3:
        return <AttendeesList handleBack={handleBack} handleNext={handleNext} />
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>Batch is Created!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return (
        <Grid container spacing={5}>
          {}
          {/* {JSON.stringify(attendees)} */}
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
              {steps[activeStep].title}
            </Typography>
            <Typography variant='caption' component='p'>
              {steps[activeStep].subtitle}
            </Typography>
          </Grid>
          {getStepContent(activeStep)}
        </Grid>
      )
    }
  }

  return (
    <Fragment>
      {/* {JSON.stringify(store)} */}
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <div sx={{ ml: 2, mt: 4 }}>
        <CardContent>{renderContent()}</CardContent>
      </div>
    </Fragment>
  )
}

export default CreateBatch
