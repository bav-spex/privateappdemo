import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import auth from 'src/configs/auth';
// import './edit_control.css'
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Grid, Button } from '@mui/material'


const AddTest = () => {

    const router = useRouter();

    const submitcancel= ()=>{

        router.push('/home/complaince/test');
      }

  return (
    <>
    <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
    <div>
    <h1>Add Test</h1>
    </div>
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
              <Button xs={2} variant='contained' size='medium' onClick={submitcancel}>
                cancel
              </Button>
              <Button
                type='submit '
                size='medium'
                variant='contained'
                onClick={submitcancel}
                style={{ marginLeft: '10px' }}
              >
                Save
              </Button>
            </Grid>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Test Name" variant="outlined"  />
      </FormControl>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tester</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Tester"
        >
          <MenuItem>Tester</MenuItem>
        </Select>
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Additional Stakeholders</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Tester"
        >
          <MenuItem>Additional Stakeholders</MenuItem>
        </Select>
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Teams</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Teams"
          multiple
        >
          <MenuItem>Teams 1</MenuItem>
          <MenuItem>Teams 2</MenuItem>
        </Select>
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
    <FormControl fullWidth>
      <TextField id="outlined-basic" label="Test Frequency" variant="outlined"  />
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
    <FormControl fullWidth>
      <TextField id="outlined-basic" label="Last Test Date" variant="outlined" type='date'  />
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
    <FormControl fullWidth>
      <TextField id="outlined-basic" label="Objective" variant="outlined"  />
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
    <FormControl fullWidth>
      <TextField id="outlined-basic" label="Test Steps" variant="outlined"  />
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
    <FormControl fullWidth>
      <TextField id="outlined-basic" label="Approximate Time" variant="outlined" type='number'  />
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tags</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Tags"
        >
          <MenuItem>Tags</MenuItem>
        </Select>
      </FormControl>
    </div>

    </div>
    </>
  )
}

export default AddTest