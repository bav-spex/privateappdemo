// ** MUI Imports
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


const TableHeader = props => {
  // ** Props
  const { plan, handlePlanChange, handleFilter, value } = props;

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  
    setState({ ...state, [anchor]: open });
  };
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
    <h2 style={{textAlign: 'center'}}>Add User Details</h2>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginTop: 40, marginLeft: 20, marginRight: 20}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Full Name" variant="outlined" />
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Username" variant="outlined" />
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Role"
        >
        </Select>
      </FormControl>
      </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Contact" variant="outlined" />
      </FormControl>
    </div>

    

      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Address" variant="outlined" />
      </FormControl>
      </div>
    </Box>
  );


  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button sx={{ mr: 4, mb: 2 }} color='secondary' variant='outlined' startIcon={<Icon icon='mdi:export-variant' />}>
        Export
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search User'
          sx={{ mr: 4, mb: 2 }}
          onChange={e => handleFilter(e.target.value)}
        />
        <FormControl size='small' sx={{ mb: 2 }}>
        <Button variant='contained' onClick={toggleDrawer('right', true)}>Add User</Button>
        <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                {list('right')}
        </Drawer>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableHeader
