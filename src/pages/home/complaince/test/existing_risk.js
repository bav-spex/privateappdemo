import * as React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import auth from 'src/configs/auth';

import { useRouter } from 'next/router';
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getExistingRisks, getRisks } from 'src/pages/home/complaince/test/complaince_service';

function SimpleDialog(props) {
    const { onClose, selectedValue, open, risk_list, audit_id } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };

    const [existing_risk_list, set_existing_risk_list]= useState([]);
    const [available_risk_list, set_available_risk_list]= useState([]);

    const save_existing_list= async()=>{

        console.log("selected list is");
        console.log(existing_risk_list);

        const res= await fetch(`${auth.save_existing_list}`, {
        method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            
            test_audit_id: audit_id,
            risk_ids : existing_risk_list  
        })
    })
    const data= await res.json();
    console.log(data);
        handleClose();
    }



    const fetch_existing_risk_list = () => {
      let successCallback = (response) => {
        set_available_risk_list(response.data.risk);      
      }
      let errorCallback = (response) => {
          toast.error("Something went wrong");
      }

      getExistingRisks(errorCallback, successCallback);
    };

    useEffect(() => {
        fetch_existing_risk_list();
      }, []);

  
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
        <DialogTitle>Existing Risk</DialogTitle>


        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Available Risks</InputLabel>
        <Select
        multiple
        value={existing_risk_list}
        onChange={(e)=> set_existing_risk_list(e.target.value)}
        labelId="demo-simple-select-label"
        label="Tester"
        inputProps={{
          name: 'selectedValues',
          id: 'selected-values',
        }}
      >
          
          {available_risk_list.map((item) => (item !== null ?
          <MenuItem value={item.id}>{item.subject}</MenuItem>: ""
          ))}
      </Select>
      </FormControl>
    </div>

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
              <Button xs={2} variant='contained' size='medium'>
                cancel
              </Button>
              <Button
                type='submit '
                size='medium'
                variant='contained'
                style={{ marginLeft: '10px' }}
                onClick={save_existing_list}
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
  