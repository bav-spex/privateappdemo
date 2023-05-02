import * as React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

import { useRouter } from 'next/router'
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authConfig from 'src/configs/auth'


function SimpleDialog(props) {
    const { onClose, selectedValue, open, audit_id } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };

    const [new_comment, set_new_comment]= useState('');

    const save_new_comment= async()=>{

        const res= await fetch(`${authConfig.add_comment}`, {
        method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            
            test_audit_id: audit_id,
            comments : new_comment     
        })
    })
    const data= await res.json();
    console.log(data);
    handleClose();
    }


  
    return (
      <Dialog onClose={handleClose} open={open}  sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "650px",
            height: "440px",
            padding: '20px'
          },
        },
      }}>
        <DialogTitle>Add New Comment</DialogTitle>

        <FormControl fullWidth>
      <TextField id="outlined-multiline-flexible" multiline rows={10} value={new_comment} onChange={(e)=> set_new_comment(e.target.value)}/>
      </FormControl>

      <Grid
              item
              sx={{
                marginLeft: 'auto',
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                '@media screen and (max-width:600px)': {
                  flexDirection: 'row',
                  marginLeft: 0
                }
              }}
              xs={12}
              style={{display: 'flex', justifyContent: 'right'}}
            >
              <Button xs={2} variant='contained' size='medium' onClick={handleClose}>
                cancel
              </Button>
              <Button
                type='submit '
                size='medium'
                variant='contained'
                style={{ marginLeft: '10px' }}
                onClick={save_new_comment}
              >
                Save
              </Button>
            </Grid>

      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  export default SimpleDialog