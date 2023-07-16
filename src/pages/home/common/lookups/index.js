import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import auth from 'src/configs/auth'
// import './edit_control.css'
import {
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Button
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import SimpleDialog from './add_lookup'
import EditIcon from '@mui/icons-material/Edit'
import SimpleDialog2 from './edit_lookup'

import { useTranslation } from 'react-i18next'
import withRoot from '../../withRoot'
import { useTheme } from '@material-ui/core/styles'

const LookUps = () => {
  const router = useRouter()

  const { t, i18n } = useTranslation()
  const theme = useTheme()
  // document.body.dir = i18n.dir();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    //   document.body.dir = i18n.dir();
    //   theme.direction = i18n.dir();
  }

  const [look_ups, set_look_ups] = useState([])

  const [look_ups_list, set_look_ups_list] = useState([])

  const [look_ups_dropdown, set_look_ups_dropdown] = useState([])

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  const user_data = JSON.parse(localStorage.getItem('userData'))
  console.log('userdata is', user_data)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
  }

  const handleClickOpen2 = para => {
    setOpen2(para)
    console.log('edit clicked')
  }

  const handleClose2 = value => {
    setOpen2('')
  }

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
    // hide last border
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }))

  const fetch_look_up_list = async () => {
    const res = await fetch(`${auth.category_list}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log('look up dropdown list is', data)
    set_look_ups_dropdown(data)
  }

  const display_look_up = async e => {
    set_look_ups(e)
    const res = await fetch(`${auth.display_lookup}/${e}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()

    console.log('look up list is', data)
    set_look_ups_list(data)
  }

  useEffect(() => {
    fetch_look_up_list()
  }, [])

  return (
    <>
      <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{t('Look Ups')}</h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Category</InputLabel>
            <Select
              value={look_ups}
              onChange={e => display_look_up(e.target.value)}
              labelId='demo-simple-select-label'
              label='Category'
              inputProps={{
                name: 'selectedValues',
                id: 'selected-values'
              }}
            >
              {look_ups_dropdown.map(item =>
                item !== null ? <MenuItem value={item.id}>{item.lookupCategoryName}</MenuItem> : ''
              )}
            </Select>
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '5vh' }}>
          {user_data.role == 'admin' ? (
            <Button
              variant='contained'
              onClick={() => {
                handleClickOpen()
              }}
            >
              {t('Add Value')}
            </Button>
          ) : (
            ''
          )}
          <SimpleDialog open={open} onClose={handleClose} category_id={look_ups} />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>{t('ID')}</StyledTableCell>
                <StyledTableCell align='center'>{t('Lookup Name')}</StyledTableCell>
                <StyledTableCell align='center'>{t('Action')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {look_ups_list.map(row => (
                <StyledTableRow key={row.lookupId}>
                  <StyledTableCell>{row.lookupId}</StyledTableCell>
                  <StyledTableCell align='center'>{row.lookupName}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {user_data.role == 'admin' ? (
                      <>
                        <IconButton sx={{ color: 'blue' }} onClick={() => handleClickOpen2(row.lookupId)}>
                          <EditIcon titleAccess='Edit Control' />
                        </IconButton>
                        <SimpleDialog2
                          open={row.lookupId == open2}
                          onClose={handleClose2}
                          category_id={look_ups}
                          row={row}
                          fun={display_look_up}
                        />
                        <IconButton sx={{ color: 'red' }}>
                          <DeleteIcon titleAccess='Delete Control' />
                        </IconButton>
                      </>
                    ) : (
                      ''
                    )}
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

export default LookUps
