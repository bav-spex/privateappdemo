import { useState, useEffect, useCallback, Fragment } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import auth from 'src/configs/auth'
import AddCommentIcon from '@mui/icons-material/AddComment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import auth from 'src/configs/auth';

import Grid from '@mui/material/Grid'
import { Button } from '@mui/material'

import { useRouter } from 'next/router'

import { useTranslation } from 'react-i18next'
import withRoot from '../../withRoot'
import { useTheme } from '@material-ui/core/styles'
import { createAssessment, getTestAssessments, getTests } from 'src/pages/home/compliance/test/complaince_service'
import { getUsers, getTeams } from 'src/pages/home/Document/DocService'

function createData(
  id,
  test_name,
  additional_stakeholders,
  tags,
  test_frequency,
  last_test_date,
  next_test_date,
  approximate_time
) {
  return {
    id,
    test_name,
    additional_stakeholders,
    tags,
    test_frequency,
    last_test_date,
    next_test_date,
    approximate_time,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1
      }
    ]
  }
}

function Row(props) {
  const { row, team_dict, user_dict } = props
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const user_data = JSON.parse(localStorage.getItem('userData'))

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    //   document.body.dir = i18n.dir();
    //   theme.direction = i18n.dir();
  }

  const [audit_data, set_audit_data] = useState([])

  const open_assessments = async id => {
    if (!open) {
      let successCallback = response => {
        set_audit_data(response.data)
      }

      let errorCallback = response => {
        toast.error('Something went wrong')
      }
      getTestAssessments(id, errorCallback, successCallback)
    }
    setOpen(!open)
  }

  const handleEditTest = id => {
    router.push({
      pathname: '/home/compliance/test/save_test',
      query: { keyword: id }
    })
  }

  const createAudit = id => {
    let request_data = JSON.stringify({
      test_id: id
    })

    let successCallback = response => {
      open_assessments(id)
      toast.success('Audit added successfully')
    }

    let errorCallback = response => {
      toast.error('Something went wrong.')
    }
    createAssessment(request_data, errorCallback, successCallback)
  }

  const handleEditAudit = async id => {
    router.push({
      pathname: '/home/compliance/test/edit_assessment',
      query: { keyword: id }
    })
  }

  const handleAddRisk = async id => {
    router.push({
      pathname: '/home/compliance/test/add_risk',
      query: { keyword: id }
    })
  }

  const handleAddComments = async id => {
    router.push({
      pathname: '/home/compliance/test/add_comment',
      query: { keyword: id }
    })
  }

  function handleRowClick(id) {
    // Redirect the user to the desired page
    router.push({
      pathname: '/home/compliance/test/Audit_info',
      query: { keyword: id }
    })
  }

  function handleRowClick2(id) {
    // Redirect the user to the desired page
    router.push({
      pathname: '/home/compliance/test/Test_info',
      query: { keyword: id }
    })
  }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => open_assessments(row.testid)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          onClick={() => {
            handleRowClick2(row.testid)
          }}
        >
          {row.testid}
        </TableCell>
        <TableCell align='right'>{row.testname}</TableCell>
        <TableCell align='right'>{row.testers.map(row => user_dict[row])}</TableCell>
        <TableCell align='right'>{row.additionalstakeholders.map(row => user_dict[row])}</TableCell>
        <TableCell align='right'>{row.tags}</TableCell>
        <TableCell align='right'>{row.testfrequency}</TableCell>
        <TableCell align='right'>{row.lasttestdate}</TableCell>
        <TableCell align='right'>{row.next_test_date}</TableCell>
        <TableCell align='right'>{row.approximatetime}</TableCell>
        <TableCell align='right'>
          {user_data.role == 'admin' ? (
            <>
              <IconButton onClick={() => handleEditTest(row.testid)} sx={{ color: 'green' }}>
                <EditIcon titleAccess='Edit Test' />
              </IconButton>
              <IconButton onClick={() => handleEditClick(r.testid)} sx={{ color: 'red' }}>
                <DeleteIcon titleAccess='Delete Test' />
              </IconButton>
              <IconButton onClick={() => createAudit(row.testid)} sx={{ color: 'blue' }}>
                <AddIcon titleAccess='Add Assesment' />
              </IconButton>
            </>
          ) : (
            ''
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                {t('Assesments')}
              </Typography>
              <Table size='medium' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('Assesment Id')}</TableCell>
                    <TableCell>{t('Additional Stakeholders')}</TableCell>
                    <TableCell align='right'>{t('Framework')}</TableCell>
                    <TableCell align='right'>{t('Test Name')}</TableCell>
                    <TableCell align='right'>{t('Teams')}</TableCell>
                    <TableCell align='right'>{t('Test Date')}</TableCell>
                    <TableCell align='right'>{t('Action')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {audit_data.map(item => (
                    <TableRow key={item.assessmentid}>
                      <TableCell
                        component='th'
                        scope='row'
                        onClick={() => {
                          handleRowClick(item.assessmentid)
                        }}
                      >
                        {item.assessmentid}
                      </TableCell>
                      <TableCell>{item.additionalstakeholders.map(row => user_dict[row])}</TableCell>
                      <TableCell align='right'>{item.framework}</TableCell>
                      <TableCell align='right'>{item.testname}</TableCell>
                      <TableCell align='right'>{item.teams.map(row => team_dict[row])}</TableCell>
                      <TableCell align='right'>{item.testdate}</TableCell>
                      <TableCell align='right'>
                        <IconButton sx={{ color: 'green' }}>
                          <EditIcon titleAccess='Edit Audit' onClick={() => handleEditAudit(item.assessmentid)} />
                        </IconButton>
                        <IconButton sx={{ color: 'blue' }}>
                          <AddCommentIcon
                            titleAccess='Add comment'
                            onClick={() => handleAddComments(item.assessmentid)}
                          />
                        </IconButton>
                        <IconButton sx={{ color: 'green' }}>
                          <AddIcon titleAccess='Add Risk' onClick={() => handleAddRisk(item.assessmentid)} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired
  }).isRequired
}

const rows = [
  createData('1', 'Test 1', 'Admin', 'ok2', '80 days', '03/01/2023', '03/01/2023', '0 min'),
  createData('2', 'Test 2', 'Admin', 'ok2', '80 days', '03/01/2023', '03/01/2023', '0 min'),
  createData('3', 'Test 3', 'Admin', 'ok2', '80 days', '03/01/2023', '03/01/2023', '0 min'),
  createData('4', 'Test 4', 'Admin', 'ok2', '80 days', '03/01/2023', '03/01/2023', '0 min'),
  createData('5', 'Test 5', 'Admin', 'ok2', '80 days', '03/01/2023', '03/01/2023', '0 min')
]

export default function CollapsibleTable() {
  const [test_list, set_test_list] = useState([])
  const [user_dict, setUserDict] = useState([])
  const [team_dict, setTeamDict] = useState([])
  const router = useRouter()

  const user_data = JSON.parse(localStorage.getItem('userData'))

  const { t, i18n } = useTranslation()
  const theme = useTheme()
  // document.body.dir = i18n.dir();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    //   document.body.dir = i18n.dir();
    //   theme.direction = i18n.dir();
  }

  const saveTest = () => {
    router.push('/home/complaince/test/save_test')
  }

  const fetch_test_list = () => {
    let successCallback = response => {
      set_test_list(response)
    }

    let errorCallback = response => {
      toast.error('Something went wrong.')
    }
    getTests(errorCallback, successCallback)
  }

  useEffect(() => {
    fetch_test_list()

    let successCallback = response => {
      let userdict = {}
      response.data.users.map(row => {
        userdict[row.id] = row.name
      })
      setUserDict(userdict)
    }
    getUsers(() => {}, successCallback)

    let getTeamsSuccessCallback = response => {
      let d = {}
      response.data.users.map(row => {
        d[row.id] = row.name
      })
      setTeamDict(d)
    }
    getTeams(() => {}, getTeamsSuccessCallback)
  }, [])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ display: 'inline', fontSize: '1.5em', marginTop: '10px', marginBottom: '10px' }}>
          {t('Tests')}
        </Typography>
        <div>
          <ToastContainer />
          {user_data.role == 'admin' ? (
            <Button
              variant='contained'
              onClick={saveTest}
              sx={{ display: 'inline', float: 'right', marginTop: '10px', marginBottom: '10px' }}
            >
              {t('Add Test')}
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              />
              <TableCell
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('ID')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('Test Name')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('Tester')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('Additional Stakeholders')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('Tags')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('Test Frequency')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('Last Test Date')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('Next Test Date')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('Approximate Time')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  borderLeft: '0px solid black',
                  borderRight: '0px solid black'
                }}
              >
                {t('Action')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {test_list.map((row, i) => (
              <Row key={i} row={row} team_dict={team_dict} user_dict={user_dict} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
