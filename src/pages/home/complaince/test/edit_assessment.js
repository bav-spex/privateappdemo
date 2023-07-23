import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import auth from 'src/configs/auth';
// import './edit_control.css'
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Grid, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authConfig from 'src/configs/auth';

import { useTranslation } from 'react-i18next';
import withRoot from '../../withRoot'
import { useTheme } from '@material-ui/core/styles';
import { getAssessmentInfoById, updateAssessment } from 'src/pages/home/complaince/test/complaince_service';
import { getCategoryData, convertDateFormat, getTeams, getUsers } from 'src/pages/home/Document/DocService';


const EditAssessment = () => {

    const router = useRouter();

    const { t, i18n } = useTranslation();
    const theme = useTheme();

    const [assessment_id, setAssessmentId]=useState(0);
    const [assessment_status, set_assessment_status]=useState('');
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

    const [assessment_status_list, set_assessment_status_list]= useState([]);
    const [test_result_list, set_test_result_list]= useState([]);
    const [tester_list, set_tester_list]= useState([]);
    const [teams_list, set_teams_list]= useState([]);
    const [user, set_user]= useState({});

    const fetch_assessment_by_id= (id)=>{

      let successCallback = (response) => {
        if(Object.keys(response).length > 0){
          set_assessment_status(response.data.assessment_status);
          set_test_results(response.data.test_result);
          set_test_date(convertDateFormat(response.data.test_date));
          set_objective(response.data.objective);
          set_test_steps(response.data.teststeps);
          set_summary(response.data.summary);
          set_additional_stakeholders(response.data.additionalstakeholders);
          set_control_owner(response.data.control_owner);
          set_expected_results(response.data.expectedresults);
          set_approximate_time(response.data.approximatetime);
          set_teams(response.data.teams);
        }
      }
      let errorCallback = (response) => {
        toast.error("Something went wrong");
      }
      getAssessmentInfoById(id, 'get', errorCallback, successCallback);
    }

    const fetch_assessment_status_list= async()=>{
      getCategoryData(26, () => {}, set_assessment_status_list);
    }

    const fetch_test_result_list= async()=>{
      getCategoryData(27, () => {}, set_test_result_list);
    }

    const fetch_tester_list= async()=>{
      let userSuccessCallback = (response) => {
        set_tester_list(response.data.users);
      }
      getUsers(() => {}, userSuccessCallback);
    }

    const fetch_teams_list= async()=>{
      let teamSuccessCallback = (response) => {
        set_teams_list(response.data.users);
      }
      getTeams(() => {}, teamSuccessCallback);
    }

    const update_assessment= async()=>{
      let successCallback = (response) => {
        toast.success("Assesment Edited Successfully");
      }
      let errorCallback = (response) => {
        toast.error("Something went wrong.");
      }
      let request_data = {
          test_assessment_id: router.query.keyword,
          assessment_status : assessment_status,
          test_result: test_results,
          test_date: test_date,
          summary: summary,
          submitted_by: 0,//user.id,
          submission_date: new Date().toISOString()
      }
      updateAssessment(request_data, errorCallback, successCallback);
    }
  
    useEffect(() => {
      setAssessmentId(router.query.keyword);
      fetch_assessment_by_id(router.query.keyword);
      fetch_assessment_status_list();
      fetch_test_result_list();
      fetch_tester_list();
      fetch_teams_list();
      
      const user_data=JSON.parse(localStorage.getItem('userData'));
      set_user(user_data);
    }, [])


  return (
    <>
    <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <h1>{t('Edit Assesment')}</h1>
    
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
              {t('Cancel')}
              </Button>
              <Button
                type='submit '
                size='medium'
                variant='contained'
                style={{ marginLeft: '10px' }}
                onClick={update_assessment}
              >
                {t('Save')}
              </Button>
            </Grid>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{t('Assesment Status')}</InputLabel>
        <Select
        value={assessment_status}
        onChange={(e)=> set_assessment_status(e.target.value)}
        labelId="demo-simple-select-label"
        label={t('Assesment Status')}
        inputProps={{
          name: 'selectedValues',
          id: 'selected-values',
        }}
      >
          
          {assessment_status_list.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
      </Select>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{t('Test Results')}</InputLabel>
        <Select
        value={test_results}
        onChange={(e)=> set_test_results(e.target.value)}
        labelId="demo-simple-select-label"
        label={t('Test Results')}
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
      <InputLabel id="demo-simple-select-label">{t('Tester')}</InputLabel>
        <Select
        value={tester}
        onChange={(e)=> set_tester(e.target.value)}
        labelId="demo-simple-select-label"
        label={t('Tester')}
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
      <InputLabel id="demo-simple-select-label">{t('Teams')}</InputLabel>
        <Select
        multiple
        value={teams}
        onChange={(e)=> set_teams(e.target.value)}
        labelId="demo-simple-select-label"
        label={t('Teams')}
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
      <TextField id="outlined-basic" variant="outlined" label={t('Tags')} value={tags} onChange={(e)=> set_tags(e.target.value)}/>
      </FormControl>
      </div>
    </div>


    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label={t('Objective')} value={objective} disabled={true}/>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label={t('Test Steps')} value={test_steps} disabled={true}/>
      </FormControl>
      </div>
    </div>



    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
        <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label={t('Summary')} value={summary} onChange={(e)=>set_summary(e.target.value)}/>
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" type='file' label={t('Attachment')} value={attachment}/>
      </FormControl>
      </div>
    </div>


    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label={t('Additional Stakeholders')} value={additional_stakeholders} disabled={true}/>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label={t('Control Owner')} value={control_owner} disabled={true}/>
      </FormControl>
      </div>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div style={{width: '40%'}}>
            <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label={t('Expected Results')} value={expected_results} disabled={true}/>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" variant="outlined" label={t('Approximate Time')} value={approximate_time} disabled={true}/>
      </FormControl>
      </div>
    </div>


    </div>
    </>
  )
}

export default EditAssessment