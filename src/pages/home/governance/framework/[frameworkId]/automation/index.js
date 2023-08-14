// // ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { getRequirenmentSectionsByFrameworkId } from 'src/store/apps/governance/framework/requirenmentsSections/RequirementsSectionServices'

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: 'white' // Replace with your desired background color
  }
})

const Automation = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()

  const [loading, setLoading] = useState(true)

  const [requirementSection, setRequirementSection] = useState([])

  useEffect(() => {
    getRequirenmentSectionsByFrameworkId(router.query.frameworkId, setRequirementSection, setLoading)
  }, [])

  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{t('Requirements')}</h2>
          <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
            <Button size='medium' variant='contained' onClick={() => router.push('/home/governance/framework')}>
              {t('Back')}
            </Button>
          </Grid>
        </div>

        <Divider />
        {loading ? (
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
          <Box className='scrollDiv' sx={{ height: '75vh', overflowY: 'scroll', scroll: 'smooth' }}>
            {requirementSection.map(section => {
              return (
                <div key={section.id} style={{ marginBottom: '10px' }}>
                  <Typography variant='h6' style={{ marginBottom: '10px' }}>
                    {section.sectionName}
                  </Typography>
                  <div
                    style={{
                      padding: '10px 20px 10px',
                      border: '1px solid #eeeeee',
                      backgroundColor: '#ffffff',
                      borderRadius: '5px'
                    }}
                  >
                    {section.requirementDtoList.map(requirenment => {
                      return (
                        <div key={requirenment.id} style={{ marginBottom: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p>{requirenment.code}</p>
                            <IconButton
                              sx={{ color: 'black', transform: 'scale(0.8)' }}
                              size='small'
                              onClick={() =>
                                router.push(
                                  `/home/governance/framework/${router.query.frameworkId}/automation/requirement/${requirenment.id}`
                                )
                              }
                            >
                              <MoreVertIcon titleAccess='Edit Audit' />
                            </IconButton>
                          </div>
                          <p>{requirenment.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </Box>
        )}
      </div>
    </>
  )
}

export default Automation
