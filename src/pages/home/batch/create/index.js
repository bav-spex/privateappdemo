// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const steps = [
  {
    title: 'Schedule',
    subtitle: 'Schedule Training course and date.'
  },
  {
    title: 'Coordinator',
    subtitle: 'Select Coordinator Information'
  },
  {
    title: 'Facilitator',
    subtitle: 'Select Facilitator Information'
  },
  {
    title: 'Attendees',
    subtitle: 'Select Attendees'
  }
]

const BatchCreate = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title=''></CardHeader>
          <CardContent>{/* <CreateBatch steps={steps} /> */}</CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BatchCreate
