// // ** React Imports
import { useState, useEffect, useCallback, Fragment, useMemo } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, CircularProgress, Typography, Tab, Tabs } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import {
  getArtifactsByControlId,
  getSingleControl
} from 'src/store/apps/governance/framework/requirenmentsSections/ControlsServices'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const LabelAndValue = ({ label, value }) => {
  return (
    <Grid marginBottom={'10px'} item xs={4}>
      <Typography fontWeight={600}>{label}</Typography>
      <Typography>{value}</Typography>
    </Grid>
  )
}

const SingleControl = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const classes = useStyles()
  const [loading, setLoading] = useState(true)

  const [tab, setTab] = useState(0)
  const [controlData, setControlData] = useState([])
  const [controlArtifacts, setControlArtifacts] = useState([])
  const [artifacts, setArtifacts] = useState([])
  useEffect(() => {
    getArtifactsByControlId(router.query.controlId, setControlArtifacts)
    getSingleControl(router.query.controlId, setControlData, setLoading)
  }, [router.query.controlId])

  useEffect(() => {
    const newArray = []
    Object.keys(controlArtifacts).map((key, index) => {
      controlArtifacts[key].map(obj => {
        newArray.push({ id: newArray.length, dataId: obj.id, name: obj.name, artifactType: key })
      })
      setArtifacts(newArray)
    })
  }, [controlArtifacts])

  const ArtifactColumns = useMemo(() => {
    return [
      {
        flex: 0.1,
        field: 'id',
        headerName: t('ID')
      },
      {
        flex: 0.4,
        field: 'name',
        headerName: t('Name')
      },
      {
        flex: 0.5,
        field: 'artifactType',
        headerName: t('artifactType'),
        valueGetter: params => `${params.row.name || ''}`,
        renderCell: ({ row }) => {
          return (
            <Typography
              color={'#060056'}
              border={'1px solid #a3a0c9'}
              backgroundColor={'#f4fcff'}
              padding={'2px 10px'}
              borderRadius={'20px'}
              fontSize={'12px'}
              lineHeight={'16px'}
            >
              {row.artifactType.toUpperCase()}
            </Typography>
          )
        }
      }
    ]
  }, [controlArtifacts, artifacts])

  return (
    <>
      {' '}
      {loading && !artifacts ? (
        <Box
          sx={{
            height: '20vh',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <CircularProgress disableShrink sx={{ mt: 6, color: '#060056' }} />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontWeight={600} fontSize={'24px'}>
                {controlData.shortname}
              </Typography>
            </Box>
            <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
              <Button
                size='medium'
                variant='contained'
                onClick={() =>
                  router.push(
                    `/home/governance/framework/${router.query.frameworkId}/automation/requirement/${router.query.requirementId}`
                  )
                }
              >
                {t('Back')}
              </Button>
              <Button
                size='medium'
                variant='contained'
                sx={{ marginLeft: '10px' }}
                onClick={() => console.log('Redirected To Edit Control Page')}
              >
                {t('Edit')}
              </Button>
            </Grid>
          </Box>

          <Divider />
          <Box mt='20px'>
            <Grid container spacing={2}>
              <LabelAndValue label='Short Name' value={controlData.shortname} />
              <LabelAndValue label='Long Name' value={controlData.long_name} />
              <LabelAndValue label='Control Description' value={controlData.desc} />
              <LabelAndValue label='Supplemental Guidance' value={controlData.supplementalguidance} />
              <LabelAndValue label='Last Audit Date' value={moment(controlData.last_audit_date).format('YYYY-MM-DD')} />
              <LabelAndValue label='Last Audit Date' value={moment(controlData.next_audit_date).format('YYYY-MM-DD')} />
              <LabelAndValue label='Control Class' value={controlData.class} />
              <LabelAndValue label='Control Phase' value={controlData.phase} />
              <LabelAndValue label='Control Number' value={controlData.number} />
              <LabelAndValue label='Desired Frequency' value={controlData.desired_frequency} />
              <LabelAndValue label='Current Maturity' value={controlData.currentmaturity} />
              <LabelAndValue label='Desired Maturity' value={controlData.desiredmaturity} />
              <LabelAndValue label='Control Priority' value={controlData.priority} />
              <LabelAndValue label='Control Family' value={controlData.family} />
              <LabelAndValue label='Control Type' value={controlData.controltype} />
              <LabelAndValue label='Status' value={controlData.status} />
              <LabelAndValue label='Control Owner' value={controlData.owner} />
            </Grid>
            <Divider />
            <Box mt='20px'>
              <Tabs
                value={tab}
                onChange={(e, value) => setTab(value)}
                textColor='#060056'
                indicatorColor='yellow'
                sx={{ borderBottom: '1px solid #e1e1e1' }}
              >
                <Tab
                  sx={{ fontWeight: '400', borderBottom: tab == 0 ? '2px solid #060056' : '2px solid #f4f5fa' }}
                  label='CONTROL ARTIFACTS'
                />
                <Tab
                  sx={{ fontWeight: '400', borderBottom: tab == 1 ? '2px solid #060056' : '2px solid #f4f5fa' }}
                  label='LINKED REQUIREMENTS'
                />
              </Tabs>
            </Box>
            <Box hidden={tab !== 0} p='10px'>
              <Box display={'flex'}>
                <Typography color={'#060056'} m='10px 20px 20px 0px' fontWeight={500}>
                  Linked Artifacts
                  <span
                    style={{
                      color: '#ffffff',
                      backgroundColor: '#060056',
                      padding: '2px 5px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      marginLeft: '10px'
                    }}
                  >
                    {artifacts.length}
                  </span>
                </Typography>
                <Typography color={'#060056'} m='10px 20px 20px 0px' fontWeight={500}>
                  Frameworks
                </Typography>
              </Box>
              <Box height={'400px'}>
                <DataGrid rows={artifacts} columns={ArtifactColumns} rowsPerPageOptions={[10, 25, 50]} />
              </Box>
            </Box>

            {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='outlined-basic'
                    label={t('Control Short Name')}
                    variant='outlined'
                    value={controlData.shortname}
                  />
                </FormControl>
              </div>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='outlined-basic'
                    label={t('Control Long Name')}
                    variant='outlined'
                    value={controlData.long_name}
                  />
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='outlined-basic'
                    label={t('Control Description')}
                    variant='outlined'
                    value={controlData.desc}
                  />
                </FormControl>
              </div>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='outlined-basic'
                    label={t('Supplemental Guidance')}
                    variant='outlined'
                    value={controlData.supplementalguidance}
                  />
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    type='date'
                    variant='outlined'
                    label={t('Audit Date')}
                    name='auditDate'
                    value={moment(controlData.last_audit_date).format('YYYY-MM-DD')}
                  />
                </FormControl>
              </div>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    type='date'
                    variant='outlined'
                    label={t('Audit Date')}
                    name='auditDate'
                    value={moment(controlData.next_audit_date).format('YYYY-MM-DD')}
                  />
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField id='demo-simple-select' value={controlData.class} label={t('Control Class')}></TextField>
                </FormControl>
              </div>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField id='demo-simple-select' value={controlData.phase} label={t('Control Phase')}></TextField>
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='outlined-basic'
                    label={t('Control Number')}
                    variant='outlined'
                    value={controlData.number}
                  />
                </FormControl>
              </div>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='outlined-basic'
                    label={t('Desired Frequency')}
                    variant='outlined'
                    value={controlData.desired_frequency}
                  />
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='demo-simple-select'
                    value={controlData.currentmaturity}
                    label={t('Current Maturity')}
                  ></TextField>
                </FormControl>
              </div>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='demo-simple-select'
                    value={controlData.desiredmaturity}
                    label={t('Desired Maturity')}
                  ></TextField>
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='demo-simple-select'
                    value={controlData.priority}
                    label={t('Control Priority')}
                  ></TextField>
                </FormControl>
              </div>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField id='demo-simple-select' value={controlData.family} label={t('Control Family')}></TextField>
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField
                    id='demo-simple-select'
                    value={controlData.controltype}
                    label={t('Control Type')}
                  ></TextField>
                </FormControl>
              </div>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField id='demo-simple-select' value={controlData.status} label={t('Control Phase')}></TextField>
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <TextField id='demo-simple-select' value={controlData.owner} label={t('Control Owner')}></TextField>
                </FormControl>
              </div>
              <div style={{ width: '40%' }}>
                <FormControl fullWidth>
                  <Select
                    multiple
                    id='demo-simple-select'
                    value={framework}
                    label={t('Control Framework')}
                    onChange={e => setFramework(e.target.value)}
                  >
                    {frameworkList.map(item =>
                      item !== null ? <MenuItem value={item.id}>{item.framework_Name}</MenuItem> : ''
                    )}
                  </Select>
                </FormControl>
              </div>
            </div> */}
          </Box>
        </>
      )}
    </>
  )
}

export default SingleControl
