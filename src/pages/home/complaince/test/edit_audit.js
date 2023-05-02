import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import auth from 'src/configs/auth';
// import './edit_control.css'
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Grid, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authConfig from 'src/configs/auth'


const EditAudit = () => {

    const router = useRouter();

    const [audit_status, set_audit_status]=useState('');
    const [test_results, set_test_results]= useState('');
    const [tester, set_tester]= useState('');
    const [test_date, set_test_date]= useState('');
    const [teams, set_teams]= useState([]);
    const [tags, set_tags]= useState('');
    const [objective, set_objective]= useState('');
    const [test_steps, set_test_steps]= useState('');
    const [summary, set_summary]= useState('');
    const [attachment, set_attachment]= useState();
    const [additional_stakeholders, set_additional_stakeholders]= useState('');
    const [control_owner, set_control_owner]= useState('');
    const [expected_results, set_expected_results]= useState('');
    const [approximate_time, set_approximate_time]= useState('');

    const [audit_status_list, set_audit_status_list]= useState([]);
    const [test_result_list, set_test_result_list]= useState([]);
    const [tester_list, set_tester_list]= useState([]);
    const [teams_list, set_teams_list]= useState([]);

    const fetch_audit_by_id= async()=>{

      const res= await fetch(`${authConfig.fetch_audit}/${router.query.keyword}/testresult/get`, {
          method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
      })
      const data= await res.json();
      set_audit_status(data.data.testresults.audit_status);
      set_test_results(data.data.testresults.test_result);
      set_test_date(data.data.testresults.test_date);
      set_objective(data.data.testresults.objective);
      set_test_steps(data.data.testresults.test_steps);
      set_summary(data.data.testresults.summary);
      set_additional_stakeholders(data.data.testresults.additional_stakeholders);
      set_control_owner(data.data.testresults.control_owner);
      set_expected_results(data.data.testresults.expected_results);
      set_approximate_time(data.data.testresults.approximate_time);
      console.log("audit data is", data);
    }

    const fetch_audit_status_list= async()=>{

      const res= await fetch(`${authConfig.audit_dropdown}/26`, {
          method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
      })
      const data= await res.json();
      console.log("audit status list is", data);
      set_audit_status_list(data);
    }

    const fetch_test_result_list= async()=>{

      const res= await fetch(`${authConfig.audit_dropdown}/27`, {
          method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
      })
      const data= await res.json();
      console.log("test result list is", data);
      set_test_result_list(data);
    }

    const fetch_tester_list= async()=>{

      const res= await fetch(`${authConfig.owner_list}`, {
          method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
      })
      const data= await res.json();
      console.log("tester list is", data);
      set_tester_list(data.data.users);
    }

    const fetch_teams_list= async()=>{

      const res= await fetch(`${authConfig.team_list}`, {
          method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
      })
      const data= await res.json();
      console.log("teams list is", data);
      set_teams_list(data.data.users);
    }


    const submit_edit_audit= async()=>{

      const res= await fetch(`${authConfig.edit_audit}`, {
        method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            
            test_audit_id: router.query.keyword,
            audit_status : audit_status,
            test_result: test_results,
            test_date: test_date,
            summary: summary,
        })
    })
    const data= await res.json();
    // setControlList(data.data.controls);
    console.log("post data is", data);
    toast.success("Audit Edited Successfully");
    // router.push('/home/complaince/test');
    }
  

    useEffect(() => {

      fetch_audit_by_id();
      fetch_audit_status_list();
      fetch_test_result_list();
      fetch_tester_list();
      fetch_teams_list();
     
    }, [])


  return (
    <>
    <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <h1>Edit Audit</h1>
    
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
                onClick={submit_edit_audit}
              >
                Save
              </Button>
            </Grid>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Audit Status</InputLabel>
        <Select
        value={audit_status}
        onChange={(e)=> set_audit_status(e.target.value)}
        labelId="demo-simple-select-label"
        label="Audit Status"
        inputProps={{
          name: 'selectedValues',
          id: 'selected-values',
        }}
      >
          
          {audit_status_list.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
      </Select>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Test Results</InputLabel>
        <Select
        value={test_results}
        onChange={(e)=> set_test_results(e.target.value)}
        labelId="demo-simple-select-label"
        label="Test Results"
        inputProps={{
          name: 'selectedValues',
          id: 'selected-values',
        }}
      >
          {test_result_list.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
      </Select>
      </FormControl>
      </div>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Tester</InputLabel>
        <Select
        value={tester}
        onChange={(e)=> set_tester(e.target.value)}
        labelId="demo-simple-select-label"
        label="Tester"
        inputProps={{
          name: 'selectedValues',
          id: 'selected-values',
        }}
      >
          
          {tester_list.map((item) => (item !== null ?
          <MenuItem value={item.id}>{item.name}</MenuItem>: ""
          ))}
      </Select>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" type='date'  value={test_date} onChange={(e)=> set_test_date(e.target.value)}/>
      </FormControl>
      </div>
    </div>


    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Teams(s)</InputLabel>
        <Select
        multiple
        value={teams}
        onChange={(e)=> set_teams(e.target.value)}
        labelId="demo-simple-select-label"
        label="Teams(s)"
        inputProps={{
          name: 'selectedValues',
          id: 'selected-values',
        }}
      >
          
          {teams_list.map((item) => (item !== null ?
          <MenuItem value={item.id}>{item.name}</MenuItem>: ""
          ))}
      </Select>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label='Tags' value={tags} onChange={(e)=> set_tags(e.target.value)}/>
      </FormControl>
      </div>
    </div>


    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label='Objective' value={objective} disabled={true}/>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label='Test Steps' value={test_steps} disabled={true}/>
      </FormControl>
      </div>
    </div>



    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
        <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label='Summary' value={summary} onChange={(e)=>set_summary(e.target.value)}/>
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" type='file' label='Attachment' value={attachment}/>
      </FormControl>
      </div>
    </div>


    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label='Additional Stakeholders' value={additional_stakeholders} disabled={true}/>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label='Control Owner' value={control_owner} disabled={true}/>
      </FormControl>
      </div>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label='Expected Results' value={expected_results} disabled={true}/>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label='Approximate Time' value={approximate_time} disabled={true}/>
      </FormControl>
      </div>
    </div>


    </div>
    </>
  )
}

export default EditAudit