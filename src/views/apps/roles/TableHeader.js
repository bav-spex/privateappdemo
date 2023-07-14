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

import { useTranslation } from 'react-i18next';
import withRoot from '../../../pages/home/withRoot'
import { useTheme } from '@material-ui/core/styles';


const TableHeader = props => {
  // ** Props
  const { plan, handlePlanChange, handleFilter, value, saveUser } = props;

  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const [full_name, set_full_name] = useState('');
  const [username, set_username] = useState('');
  const [email, set_email] = useState('');
  const [password, setPass] = useState('');

  const [role, set_role] = useState('');
  const [contact, set_contact] = useState('');
  const [address, set_address] = useState('');

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const collectData = () => {
    let data = {
      'fullName': full_name,
      'username': username,
      'email': email,
      'role': role,
      'address': address,
      'password': password,

      "teams": [
        0
      ]
    }

    saveUser(data);
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <Box
      sx={ { width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 } }
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 style={ { textAlign: 'center' } }>{ t('Add User Details') }</h2>
      <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginTop: 40, marginLeft: 20, marginRight: 20 } }>
        <FormControl fullWidth>
          <TextField id="outlined-basic" label={ t('Full Name') } value={ full_name } onChange={ (e) => set_full_name(e.target.value) } variant="outlined" />
        </FormControl>
      </div>

      <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20 } }>
        <FormControl fullWidth>
          <TextField id="outlined-basic" label={ t('Username') } value={ username } onChange={ (e) => set_username(e.target.value) } variant="outlined" />
        </FormControl>
      </div>

      <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20 } }>
        <FormControl fullWidth>
          <TextField id="outlined-basic" label={ t('Email') } value={ email } onChange={ (e) => set_email(e.target.value) } variant="outlined" />
        </FormControl>
      </div>

      <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20 } }>
        <FormControl fullWidth>
          <TextField id="outlined-basic" label={ t('Password') } value={ password } onChange={ (e) => setPass(e.target.value) } variant="outlined" />
        </FormControl>
      </div>

      <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20 } }>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{ t('Select Role') }</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={ t('Select Role') }
            value={ role } onChange={ (e) => set_role(e.target.value) }
          >
            <MenuItem value={ 'user' }>User</MenuItem>
            <MenuItem value={ 'admin' }>Admin</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20 } }>
        <FormControl fullWidth>
          <TextField id="outlined-basic" label={ t('Contact') } value={ contact } onChange={ (e) => set_contact(e.target.value) } variant="outlined" />
        </FormControl>
      </div>



      <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: 40, marginLeft: 20, marginRight: 20 } }>
        <FormControl fullWidth>
          <TextField id="outlined-basic" label={ t('Address') } value={ address } onChange={ (e) => set_address(e.target.value) } variant="outlined" />
        </FormControl>
      </div>
      <div style={ { display: 'flex', justifyContent: 'space-around' } }>
        <Button variant='contained' onClick={ toggleDrawer(anchor, false) } sx={ { width: '40%' } }>{ t('Cancel') }</Button>
        <Button variant='contained' sx={ { width: '40%' } } onClick={ (e) => collectData() }>{ t('Save') }</Button>
      </div>
    </Box>
  );


  return (
    <Box sx={ { p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' } }>
      <Button sx={ { mr: 4, mb: 2 } } color='secondary' variant='outlined' startIcon={ <Icon icon='mdi:export-variant' /> }>
        { t('Export') }
      </Button>
      <Box sx={ { display: 'flex', flexWrap: 'wrap', alignItems: 'center' } }>
        <TextField
          size='small'
          value={ value }
          placeholder='Search User'
          sx={ { mr: 4, mb: 2 } }
          onChange={ e => handleFilter(e.target.value) }
        />
        <FormControl size='small' sx={ { mb: 2 } }>
          <Button variant='contained' onClick={ toggleDrawer('right', true) }>{ t('Add User') }</Button>
          <Drawer
            anchor={ 'right' }
            open={ state['right'] }
            onClose={ toggleDrawer('right', false) }
          >
            { list('right') }
          </Drawer>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableHeader
