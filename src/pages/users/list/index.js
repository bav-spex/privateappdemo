// ** React Imports
import { useEffect, useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'

import { useTranslation } from 'react-i18next'
import withRoot from '../../home/withRoot'
import { useTheme } from '@material-ui/core/styles'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** Vars
const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  user: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** renders client column
const renderClient = row => {
  if (row?.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const UserList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'fullName',
      headerName: t('User'),
      renderCell: ({ row }) => {
        const { fullName, username } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='body2'
                component={Link}
                href='/users/overview/view/UserViewPage'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: theme => theme.palette.primary.main }
                }}
              >
                {fullName}
              </Typography>
              <Typography noWrap variant='caption'>
                {`@${username}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'email',
      headerName: t('Email'),
      renderCell: ({ row }) => {
        return (
          <Typography variant='body2' noWrap>
            {row.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'role',
      minWidth: 150,
      headerName: t('Role'),
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: userRoleObj[row.role].color } }}>
            <Icon icon={userRoleObj[row.role].icon} fontSize={20} />
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.role}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: t('Status'),
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.status}
            color={userStatusObj[row.status]}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('Action'),
      renderCell: () => (
        <IconButton component={Link} href='/apps/user/view/overview/'>
          <Icon icon='mdi:eye-outline' />
        </IconButton>
      )
    }
  ]

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  const [userToggle, setUserToggle] = useState(false)

  useEffect(() => {
    dispatch(
      fetchData({
        role: '',
        q: value,
        status: '',
        currentPlan: plan
      })
    )
  }, [dispatch, plan, value, userToggle])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const saveUser = data => {
    const url = 'https://iac-rakshitah-dev.politeforest-c2818b6a.southeastasia.azurecontainerapps.io/iac/users/register'

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }

    axios
      .post(
        url,
        {
          ...data
        },
        config
      )
      .then(data => {
        toast.success('User is Added.')
        setUserToggle(!userToggle)
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  return (
    <Grid container spacing={6}>
      <ToastContainer />
      <Grid item xs={12}>
        <Card>
          <TableHeader
            plan={plan}
            value={value}
            saveUser={saveUser}
            handleFilter={handleFilter}
            handlePlanChange={handlePlanChange}
          />
          <DataGrid
            autoHeight
            rows={store.data}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
