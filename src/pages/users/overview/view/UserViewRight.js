// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import TabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Icon } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

import Overview_tab from './overview_tab'
// ** Demo Components Imports
import UserViewBilling from './UserViewBilling'
import UserViewConnection from './UserViewConnection'
import UserViewNotification from './UserViewNotification'
import UserViewOverview from './UserViewOverview'
import UserViewSecurity from './UserViewSecurity'

// ** Styled Tab component
const TabList = styled(MuiTabList)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    }
  }
}))

const UserViewRight = ({ tab, invoiceData }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)
  const [isLoading, setIsLoading] = useState(true)

  // const [state, setState] = useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };

  // const list = (anchor) => (
  //   <Box
  //     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  // ** Hooks
  const router = useRouter()

  const handleChange = (event, value) => {
    setIsLoading(true)
    setActiveTab(value)
    setIsLoading(false)
    // router
    //   .push({
    //     pathname: `/users/overview/view/${value}`
    //   })
    //   .then(() => setIsLoading(false))
  }
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])
  useEffect(() => {
    if (invoiceData) {
      setIsLoading(false)
    }
  }, [invoiceData])

  return (
    <>
      <TabContext value={activeTab}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='forced scroll tabs example'
        >
          <Tab
            value='overview_tab'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                <Icon fontSize={20} icon='mdi:account-outline' />
                Overview
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                <Icon fontSize={20} icon='mdi:lock-outline' />
                Security
              </Box>
            }
          />
          <Tab
            value='billing-plan'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                <Icon fontSize={20} icon='mdi:bookmark-outline' />
                Billing & Plan
              </Box>
            }
          />
          <Tab
            value='notification'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                <Icon fontSize={20} icon='mdi:bell-outline' />
                Notification
              </Box>
            }
          />
          <Tab
            value='connection'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                <Icon fontSize={20} icon='mdi:link' />
                Connection
              </Box>
            }
          />
        </TabList>
        <Box sx={{ mt: 4 }}>
          {/* {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : ( */}
          <>
            <TabPanel sx={{ p: 0 }} value='overview_tab'>
              {/* <UserViewOverview invoiceData={invoiceData} /> */}
              <Overview_tab />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='security'>
              <UserViewSecurity />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='billing-plan'>
              <UserViewBilling />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='notification'>
              <UserViewNotification />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='connection'>
              <UserViewConnection />
            </TabPanel>
          </>
          {/* )} */}
        </Box>
      </TabContext>
    </>
  )
}

export default UserViewRight
