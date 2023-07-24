// ** React Imports
import { useEffect, useState } from 'react'
import Spinner from 'src/@core/components/spinner'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { addRoleData, getClaimsData, getRolesData } from './roleService'
import { Radio, RadioGroup } from '@mui/material'
import { SettingsRemoteOutlined } from '@mui/icons-material'

const cardData = [
  { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  { totalUsers: 7, title: 'Manager', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
  { totalUsers: 5, title: 'Auditor', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
  { totalUsers: 3, title: 'IT', avatars: ['1.png', '2.png', '3.png'] },
  { totalUsers: 2, title: 'Restricted User', avatars: ['4.png', '5.png'] }
]

const rolesArr = [
  'Governance',
  'Risk Creation',
  'Risk Review',
  'Risk Mitigation',
  'Complaince',
  'Lookup',
  'User Management'
]

const demoRolePermission = [
  {
    type: 'dashboard',
    value: 'none'
  },
  {
    type: 'frameworks',
    value: 'none'
  },
  {
    type: 'controls',
    value: 'none'
  },
  {
    type: 'documents',
    value: 'none'
  },
  {
    type: 'risk',
    value: 'none'
  },
  {
    type: 'assesment',
    value: 'none'
  },
  {
    type: 'audits',
    value: 'none'
  },
  {
    type: 'lookups',
    value: 'none'
  },
  {
    type: 'roles',
    value: 'none'
  },
  {
    type: 'users',
    value: 'none'
  },
  {
    type: 'teams',
    value: 'none'
  }
]

const RolesCards = () => {
  // ** States
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')

  const [selectAll, setSelectAll] = useState(false)

  const [claimsData, setClaimsData] = useState()
  const [roleData, setRoleData] = useState()

  const [roleId, setRoleId] = useState()
  const [roleName, setRoleName] = useState('')
  const [selectedRolePermission, setSelectedRolePermission] = useState(demoRolePermission)

  useEffect(() => {
    getClaimsData(() => {}, setClaimsData)
    getRolesData(() => {}, setRoleData)
  }, [])

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setSelectAll(false)
    setSelectedRolePermission()
    setRoleName('')
    setRoleId(null)
  }

  const handlePermissionChange = (role, type, e) => {
    if (e.target.value !== 'write') {
      setSelectAll(false)
    }
    setSelectedRolePermission(prevState => {
      return prevState.map(claim => {
        if (claim.type === type) {
          return {
            ...claim,
            value: e.target.value
          }
        } else {
          return claim
        }
      })
    })
  }
  // console.log(selectedRolePermission)

  useEffect(() => {
    if (roleName && roleData && selectedRolePermission) {
      if (selectAll) {
        setSelectedRolePermission(prevState => {
          return prevState.map(claim => {
            return {
              ...claim,
              value: 'write'
            }
          })
        })
      }
    }
  }, [selectAll, roleName, roleData])

  const handleSave = () => {
    const payload = {
      role: roleName.toLowerCase(),
      roleCliams: selectedRolePermission
    }
    addRoleData(payload)
    setOpen(false)
    setSelectAll(false)
    setSelectedRolePermission()
    setRoleName('')
    setRoleId(null)
  }

  const SingleRoleCard = ({ item }) => (
    <Grid item xs={12} sm={6} lg={4} key={item.roleId}>
      <Card>
        <CardContent>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2'>{`Total 4 users`}</Typography>
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}>
              {[1, 2, 3, 4].map((img, index) => (
                <Avatar key={index} alt={img.title} src={`/images/avatars/${img}`} />
              ))}
            </AvatarGroup>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='h6'>{item.role.toUpperCase()}</Typography>
              <Typography
                href='/'
                variant='body2'
                component={Link}
                sx={{ color: 'primary.main' }}
                onClick={e => {
                  e.preventDefault()
                  handleClickOpen(item)
                  setDialogTitle('Edit')
                  setRoleName(item.role)
                  setSelectedRolePermission(item.roleCliams)
                  setRoleId(item.roleId)
                }}
              >
                Edit Role
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )

  if (roleData && roleData.length > 0) {
    return (
      <Grid container spacing={6} className='match-height'>
        {roleData.map(item => {
          return <SingleRoleCard key={item.roleId} item={item} />
        })}
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              handleClickOpen()
              setDialogTitle('Add')
            }}
          >
            <Grid container sx={{ height: '100%' }}>
              <Grid item xs={5}>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <img width={65} height={130} alt='add-role' src='/images/cards/pose_m1.png' />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <CardContent>
                  <Box sx={{ textAlign: 'right' }}>
                    <Button
                      variant='contained'
                      sx={{ mb: 3, whiteSpace: 'nowrap' }}
                      onClick={() => {
                        handleClickOpen()
                        setDialogTitle('Add')
                        setSelectedRolePermission(demoRolePermission)
                      }}
                    >
                      Add Role
                    </Button>
                    <Typography>Add role, if it doesn't exist.</Typography>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Typography variant='h5' component='span'>
              {`${dialogTitle} Role`}
            </Typography>
            <Typography variant='body2'>Set Role Permissions</Typography>
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>
                <TextField
                  label='Role Name'
                  placeholder='Enter Role Name'
                  value={roleName}
                  onChange={e => setRoleName(e.target.value)}
                />
              </FormControl>
            </Box>
            <Typography variant='h6'>Role Permissions</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: '10px !important' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                          '& svg': { ml: 1, cursor: 'pointer' }
                        }}
                      >
                        Administrator Access
                        <Tooltip placement='top' title='Allows a full access to the system'>
                          <Box sx={{ display: 'flex' }}>
                            <Icon icon='mdi:information-outline' fontSize='1rem' />
                          </Box>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={1}>
                      <FormControlLabel
                        label='Select All'
                        sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                        control={
                          <Checkbox
                            size='small'
                            onChange={() => {
                              setSelectAll(!selectAll)
                              // setSelectedRolePermission(roleData.filter(role => role.role === roleName)[0].roleCliams)
                            }}
                            checked={selectAll}
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {selectedRolePermission &&
                    claimsData.map(claim => {
                      const foundClaim = selectedRolePermission.find(roleClaim => roleClaim.type === claim.value)
                      if (foundClaim) {
                        return (
                          <TableRow
                            key={claim.value}
                            sx={{
                              borderBottom: '1px solid #eeeeee',
                              '& .MuiTableCell-root:first-of-type': { pl: '0 !important' }
                            }}
                          >
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                color: theme => `${theme.palette.text.primary} !important`,
                                border: 'none'
                              }}
                              colSpan={6}
                            >
                              {claim.name.toUpperCase()}
                            </TableCell>
                            <RadioGroup
                              aria-labelledby='demo-radio-buttons-group-label'
                              defaultValue='female'
                              name='radio-buttons-group'
                              sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
                              value={foundClaim.value}
                            >
                              <TableCell sx={{ border: 'none', width: '33%' }}>
                                <FormControlLabel value='read' control={<Radio />} label='Read' />
                              </TableCell>
                              <TableCell sx={{ border: 'none', width: '33%' }}>
                                <FormControlLabel value='write' control={<Radio />} label='Write' />
                              </TableCell>
                              <TableCell sx={{ border: 'none', width: '33%' }}>
                                <FormControlLabel value='create' control={<Radio />} label='Create' />
                              </TableCell>
                            </RadioGroup>
                          </TableRow>
                        )
                      }
                    })} */}

                  {/* // Simple One */}
                  {selectedRolePermission &&
                    selectedRolePermission.map(claim => {
                      return (
                        <TableRow
                          key={claim.type}
                          sx={{
                            borderBottom: '1px solid #eeeeee',
                            '& .MuiTableCell-root:first-of-type': { pl: '0 !important' }
                          }}
                        >
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                              color: theme => `${theme.palette.text.primary} !important`,
                              border: 'none'
                            }}
                            colSpan={6}
                          >
                            {claim.type.toUpperCase()}
                          </TableCell>
                          <RadioGroup
                            aria-labelledby='demo-radio-buttons-group-label'
                            defaultValue='none'
                            name='radio-buttons-group'
                            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                            value={claim.value}
                            onChange={e => handlePermissionChange(roleName, claim.type, e)}
                          >
                            <TableCell sx={{ border: 'none' }}>
                              <FormControlLabel value='none' control={<Radio />} label='No' />
                            </TableCell>
                            <TableCell sx={{ border: 'none' }}>
                              <FormControlLabel value='read' control={<Radio />} label='Read' />
                            </TableCell>
                            <TableCell sx={{ border: 'none' }}>
                              <FormControlLabel value='write' control={<Radio />} label='Write' />
                            </TableCell>
                          </RadioGroup>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
            <Box className='demo-space-x'>
              <Button size='large' type='submit' variant='contained' onClick={handleSave}>
                Submit
              </Button>
              <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Grid>
    )
  } else {
    return <Spinner></Spinner>
  }
}

export default RolesCards
