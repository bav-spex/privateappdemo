import { useState, useEffect } from 'react'

import { useTheme } from '@material-ui/core/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Grid, TableBody, TableHead } from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useRouter } from 'next/router'
// ** Icon Imports
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import auth from 'src/configs/auth'
import 'react-toastify/dist/ReactToastify.css'
// ** Actions Imports
import { getAssessmentInfoById } from 'src/pages/home/complaince/test/complaince_service'
// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'

import SimpleDialog from './existing_risk'

const emails = ['username@gmail.com', 'user02@gmail.com']

const AddRisk = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const test_assessment_id = router.query.keyword
  const [risk_list, set_risk_list] = useState([])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.grey,
      color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }))

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
  }

  const new_risk = () => {
    router.push({
      pathname: '/home/complaince/test/new_risk',
      query: { keyword: test_assessment_id }
    })
  }

  const fetch_risk_list = async () => {
    let successCallback = response => {
      let risks = response.data || []
      console.log('RISK_LIST:', risks)
      set_risk_list(risks)
      for (let i = 0; i < risks.length; i++) {
        risk_list_id.push(data.data.risks[i].id)
      }
    }

    let errorCallback = response => {
      toast.error('Something went wrong')
    }
    getAssessmentInfoById(router.query.keyword, 'risks', errorCallback, successCallback)
  }

  useEffect(() => {
    fetch_risk_list()
  }, [])

  return (
    <>
      <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{t('Add Risk')}</h1>

          <ToastContainer />
          <Grid
            item
            sx={{
              marginLeft: 'auto',
              '@media screen and (max-width:600px)': {
                flexDirection: 'row',
                marginLeft: 0
              }
            }}
            xs={12}
            md={4}
            style={{ display: 'flex', justifyContent: 'right', marginBottom: 20 }}
          >
            <Button xs={2} variant='contained' size='medium' onClick={new_risk}>
              {t('New Risk')}
            </Button>
            <Button
              type='submit '
              size='medium'
              variant='contained'
              style={{ marginLeft: '10px' }}
              onClick={handleClickOpen}
            >
              {t('Existing risk')}
            </Button>
            <SimpleDialog open={open} onClose={handleClose} test_assessment_id={router.query.keyword} />
          </Grid>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>{t('ID')}</StyledTableCell>
                <StyledTableCell align='right'>{t('Subject')}</StyledTableCell>
                <StyledTableCell align='right'>{t('Action')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {risk_list.map(row => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell align='right'>{row.name}</StyledTableCell>
                  <StyledTableCell align='right'>
                    <DeleteIcon />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default AddRisk
