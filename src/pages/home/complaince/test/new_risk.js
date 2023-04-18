import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import auth from 'src/configs/auth';
// import './edit_control.css'
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Grid, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewRisk = () => {

    const router = useRouter();

    const [subject, set_subject]=useState('');
    const [risk_mapping, set_risk_mapping]=useState([]);
    const [threat_mapping, set_threat_mapping]=useState([]);

    
    useEffect(() => {

     
    }, [])


  return (
    <>
    <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <h1>New Risk</h1>
    
    <ToastContainer />
    <Grid
              item
              sx={{
                marginLeft: 'auto',
                '@media screen and (max-width:600px)': {
                  flexDirection: 'row',
                  marginLeft: 0
                }
              }}
              xs={12}
              md={4}
              style={{display: 'flex', justifyContent: 'right', marginBottom: 20}}
            >
              <Button xs={2} variant='contained' size='medium'>
                cancel
              </Button>
              <Button
                type='submit '
                size='medium'
                variant='contained'
                style={{ marginLeft: '10px' }}
              >
                Save
              </Button>
            </Grid>
            </div>


    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Subject" variant="outlined"  value={subject} onChange={(e)=> set_subject(e.target.value)}/>
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Risk Mapping</InputLabel>
        <Select
        multiple
        value={risk_mapping}
        onChange={(e)=> set_risk_mapping(e.target.value)}
        labelId="demo-simple-select-label"
        label="Tester"
        inputProps={{
          name: 'selectedValues',
          id: 'selected-values',
        }}
      >
          
          <MenuItem>Risk Mapping</MenuItem>
      </Select>
      </FormControl> 
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Threat Mapping</InputLabel>
        <Select
        multiple
        value={threat_mapping}
        onChange={(e)=> set_threat_mapping(e.target.value)}
        labelId="demo-simple-select-label"
        label="Tester"
        inputProps={{
          name: 'selectedValues',
          id: 'selected-values',
        }}
      >
          
          <MenuItem>Threat Mapping</MenuItem>
      </Select>
      </FormControl> 
    </div>


    </div>
    </>
  )
}

export default NewRisk