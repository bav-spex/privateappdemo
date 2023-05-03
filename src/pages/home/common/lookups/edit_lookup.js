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
import { ToastContainer } from 'react-toastify';
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';


function SimpleDialog2(props) {
    const { onClose, open, category_id, row, fun } = props;

    const [new_lookup_name, set_new_lookup_name]= useState(props.row.lookupName);
  
    const handleClose = () => {
      onClose();
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };

    const save_edit_lookup = async() => {
        
        const res= await fetch(`https://common-dev-rakshitah.azurewebsites.net/lookup/v1/update/${row.lookupId}`, {
            method:"PUT",
              headers:{
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                
                lookupName: new_lookup_name,
                lookupDesc: new_lookup_name,
                status: "active" 
            })
        })
        const data= await res.json();
        console.log("edit look up is", data);
        toast.success('Look Up Edited Successfully');
        fun(category_id);
        handleClose();
      };


  
    return (
      <Dialog onClose={handleClose} open={open}  sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "650px",
            height: "310px",
            padding: '20px'
          },
        },
      }}>
        <DialogTitle>Edit Lookup Details</DialogTitle>

        <FormControl fullWidth>
      <TextField id="outlined-flexible" label='Look Up Name' value={new_lookup_name} onChange={(e)=>set_new_lookup_name(e.target.value)}/>
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
                onClick={save_edit_lookup}
              >
                Edit
              </Button>
            </Grid>

      </Dialog>
    );
  }
  
  SimpleDialog2.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  export default SimpleDialog2