import { useState, useEffect, useCallback } from 'react'

import Grid from '@mui/material/Grid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import authConfig from 'src/configs/auth'
import { Button } from '@mui/material'

// ** Next Import
import { useRouter } from 'next/router'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import SimpleDialog from './add_comment_popup'

import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import { getAssessmentInfoById } from 'src/pages/home/complaince/test/complaince_service';
import { convertDateFormat } from 'src/util/common';

const AddComment = () => {
  const router = useRouter()

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const [assessment_id, setAssessmentId] = useState(0)
  const [comment_list, set_comment_list] = useState([])

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

  const fetch_comment_list = async id => {
    let successCallback = response => {
      set_comment_list(response.data)
    }
    let errorCallback = response => {
      toast.error('Something went wrong')
    }
    getAssessmentInfoById(id, 'comments', errorCallback, successCallback);
  };

  useEffect(() => {
    let assessment_id = router.query.keyword
    setAssessmentId(assessment_id)
    fetch_comment_list(assessment_id)
  }, [])

  return (
    <>
      <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{t('Add Comment')}</h1>

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
            <Button xs={2} variant='contained' size='medium' onClick={handleClickOpen}>
              {t('New Comment')}
            </Button>
            <SimpleDialog
              open={open}
              onClose={handleClose}
              assessment_id={assessment_id}
              set_comment_list_state={set_comment_list}
            />
          </Grid>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{t('Comment')}</StyledTableCell>
                <StyledTableCell align="right">{t('Comment Date')}</StyledTableCell>
                <StyledTableCell align="right">{t('Comment User')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {comment_list.map((row) => (
                <StyledTableRow>
                  <StyledTableCell>
                    {row.comment}
                  </StyledTableCell>
                  <StyledTableCell align="right">{ (row.commentDate) ? convertDateFormat(row.commentDate) : '-' }</StyledTableCell>
                  <StyledTableCell align="right">{ row.userId }</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>   
      </div>
    </>
  )
}

export default AddComment
