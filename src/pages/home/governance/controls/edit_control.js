import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import auth from 'src/configs/auth';
// import './edit_control.css'
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Grid, Button } from '@mui/material'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next';

const Edit_control = () => {

  const [class1, setClass1] = useState('');
  const [controlType, setControlType] = useState('');
  const [currentMaturity, setCurrentMaturity] = useState('');
  const [desiredMaturity, setDesiredMaturity] = useState('');
  const [family, setFamily] = useState('');
  const [owner, setOwner] = useState('');
  const [phase, setPhase] = useState('');
  const [desc, setDesc] = useState('');
  const [shortname, setShortname] = useState('');
  const [longname, setLongname] = useState('');
  const [suppementalguidance, setSuppementalguidance] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [framework, setFramework]= useState([]);

  const [classList, setClassList]= useState([]);
  const [phaseList, setPhaseList]= useState([]);
  const [maturityList, setMaturityList]= useState([]);
  const [priorityList, setPriorityList]= useState([]);
  const [typeList, setTypeList]= useState([]);
  const [familyList, setFamilyList]= useState([]);
  const [statusList, setStatusList]= useState([]);
  const [ownerList, setOwnerList]= useState([]);
  const [frameworkList, setFrameworkList]= useState([]);

  const handleChange = (event) => {
    setClass1(event.target.value);
  };

  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => { 
    i18n.changeLanguage(lng)
  //   document.body.dir = i18n.dir();
  //   theme.direction = i18n.dir();
  }

  const router = useRouter()
  console.log("id is",router.query);


  const submitcancel= ()=>{

    router.push('/home/governance/controls');
  }

  const submitdetails= async()=>{

    const res= await fetch(`${auth.control_update}/${router.query.keyword}`, {
      method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          short_name: shortname,
          control_number: controlNumber,
          control_owner: owner,
          control_priority: priority,
          control_phase: phase,
          family: family,
          control_maturity: currentMaturity,
          desired_maturity: desiredMaturity,
          controltype: controlType,
          control_class: class1,
          control_status: status,
          description: desc,
          supplemental_guidance: suppementalguidance,
          frameworks_id: framework,
      })
  })
  const data= await res.json();
  // setControlList(data.data.controls);
  console.log("post data is", data);
  toast.success('Control Edited Successfully');
    router.push('/home/governance/controls');
  }

  const fetch_control_data_by_id= async()=>{

    const res= await fetch(`${auth.control_by_id}/${router.query.keyword}`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          },
    })
    const data= await res.json();
    // setControlList(data.data.controls);
    console.log("edit control data is", data);
    setClass1(data.data.class);
    setControlType(data.data.controltype);
    setPhase(data.data.phase);
    setCurrentMaturity(data.data.currentmaturity);
    setDesiredMaturity(data.data.desiredmaturity);
    setPriority(data.data.priority);
    setFamily(data.data.family);
    setStatus(data.data.status);
    setShortname(data.data.shortname);
    setDesc(data.data.desc);
    setSuppementalguidance(data.data.suppementalguidance);
    setOwner(data.data.owner);
    setFramework(data.data.frameworkids);
  }

  const fetch_classList= async()=>{

    const res= await fetch(`${auth.control_dropdown}/2`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
    })
    const data= await res.json();
    console.log("class list is", data);
    setClassList(data);
  }

  const fetch_phaseList= async()=>{

    const res= await fetch(`${auth.control_dropdown}/3`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
    })
    const data= await res.json();
    console.log("phase list is", data);
    setPhaseList(data);
  }

  const fetch_maturityList= async()=>{

    const res= await fetch(`${auth.control_dropdown}/4`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
    })
    const data= await res.json();
    console.log("maturity list is", data);
    setMaturityList(data);
  }

  const fetch_priorityList= async()=>{

    const res= await fetch(`${auth.control_dropdown}/5`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
    })
    const data= await res.json();
    console.log("priority list is", data);
    setPriorityList(data);
  }

  const fetch_typeList= async()=>{

    const res= await fetch(`${auth.control_dropdown}/6`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
    })
    const data= await res.json();
    console.log("type list is", data);
    setTypeList(data);
  }

  const fetch_familyList= async()=>{

    const res= await fetch(`${auth.control_dropdown}/7`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
    })
    const data= await res.json();
    console.log("family list is", data);
    setFamilyList(data);
  }

  const fetch_statusList= async()=>{

    const res= await fetch(`${auth.control_dropdown}/8`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
    })
    const data= await res.json();
    console.log("status list is", data);
    setStatusList(data);
  }

  const fetch_ownerList= async()=>{

    const res= await fetch(`${auth.owner_list}`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
    })
    const data= await res.json();
    console.log("owner list is", data);
    setOwnerList(data.data.users);
  }

  const fetch_frameworkList= async()=>{

    const res= await fetch(`${auth.frameWorkAll}`, {
        method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
    })
    const data= await res.json();
    console.log("framework list is", data);
    setFrameworkList(data.data.frameworks);
  }


  useEffect(() => {

    fetch_control_data_by_id();
    fetch_classList();
    fetch_phaseList();
    fetch_maturityList();
    fetch_priorityList();
    fetch_ownerList();
    fetch_typeList();
    fetch_familyList();
    fetch_statusList();
    fetch_frameworkList();
  }, [])

  return (
    <>
    
    <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
    <div>
    <h1>Edit Control</h1>
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
              {t('Cancel')}
              </Button>
              <Button
                type='submit '
                size='medium'
                variant='contained'
                onClick={submitdetails}
                style={{ marginLeft: '10px' }}
              >
                {t('Save')}
              </Button>
            </Grid>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label={t('Control Short Name')} variant="outlined"  value={shortname} onChange={(e)=> setShortname(e.target.value)}/>
      </FormControl>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
        <TextField id="outlined-basic" label={t('Control Long Name')} variant="outlined"  value={longname} onChange={(e)=> setLongname(e.target.value)}/>
      </FormControl>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label={t('Control Description')} variant="outlined"  value={desc} onChange={(e)=> setDesc(e.target.value)}/>
      </FormControl>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
        <TextField id="outlined-basic" label={t('Supplemental Guidance')} variant="outlined"  value={suppementalguidance} onChange={(e)=> setSuppementalguidance(e.target.value)}/>
      </FormControl>
    </div>

      
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Control Class')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={class1}
          label={t('Control Class')}
          onChange={(e)=> setClass1(e.target.value)}
        >
          {classList.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Control Phase')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={phase}
          label={t('Control Phase')}
          onChange={(e)=> setPhase(e.target.value)}
        >
          {phaseList.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label={t('Control Number')} variant="outlined"  value={controlNumber} onChange={(e)=> setControlNumber(e.target.value)}/>
      </FormControl>
      </div>
      </div>


      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Current Maturity')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentMaturity}
          label={t('Current Maturity')}
          onChange={(e)=> setCurrentMaturity(e.target.value)}
        >
          {maturityList.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Desired Maturity')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={desiredMaturity}
          label={t('Desired Maturity')}
          onChange={(e)=> setDesiredMaturity(e.target.value)}
        >
          {maturityList.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Control Priority')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          label={t('Control Priority')}
          onChange={(e)=> setPriority(e.target.value)}
        >
          {priorityList.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Control Family')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={family}
          label={t('Control Family')}
          onChange={(e)=> setFamily(e.target.value)}
        >
          {familyList.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      </div>


      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Control Type')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={controlType}
          label={t('Control Type')}
          onChange={(e)=> setControlType(e.target.value)}
        >
          {typeList.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Control Status')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label={t('Control Phase')}
          onChange={(e)=> setStatus(e.target.value)}
        >
          {statusList.map((item) => (item !== null ?
          <MenuItem value={item.lookupId}>{item.lookupName}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      </div>
      
      

      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Control Owner')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={owner}
          label={t('Control Owner')}
          onChange={(e)=> setOwner(e.target.value)}
        >
          {ownerList.map((item) => (item !== null ?
          <MenuItem value={item.id}>{item.name}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Control Framework')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          multiple
          id="demo-simple-select"
          value={framework}
          label={t('Control Framework')}
          onChange={(e)=> setFramework(e.target.value)}
        >
          {frameworkList.map((item) => (item !== null ?
          <MenuItem value={item.id}>{item.framework_Name}</MenuItem>: ""
          ))}
        </Select>
      </FormControl>
      </div>
      </div>

    </div>
    </>
  )
}

export default Edit_control