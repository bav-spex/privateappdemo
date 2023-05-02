import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import auth from 'src/configs/auth';
// import './edit_control.css'
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Grid, Button } from '@mui/material'
import toast from 'react-hot-toast'

const New_control = () => {

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

  const router = useRouter()
  console.log("id is",router.query);


  const submitcancel= ()=>{

    router.push('/home/governance/controls');
  }

  const submitdetails= async()=>{

    const res= await fetch(`${auth.control_new}`, {
      method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shortname: shortname,
          number: controlNumber,
          owner: owner,
          priority: priority,
          phase: phase,
          family: family,
          currentmaturity: currentMaturity,
          desiredmaturity: desiredMaturity,
          controltype: controlType,
          class: class1,
          status: status,
          desc: desc,
          suppementalguidance: suppementalguidance,
          frameworkids: framework,
      })
  })
  const data= await res.json();
  // setControlList(data.data.controls);
  console.log("post data is", data);
  toast.success('Created New Control');
    router.push('/home/governance/controls');
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
    setFrameworkList(data);
  }


  useEffect(() => {

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
    <h1>New Control</h1>
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
                onClick={submitdetails}
                style={{ marginLeft: '10px' }}
              >
                Save
              </Button>
            </Grid>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Control Short Name" variant="outlined"  value={shortname} onChange={(e)=> setShortname(e.target.value)}/>
      </FormControl>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
        <TextField id="outlined-basic" label="Control Long Name" variant="outlined"  value={longname} onChange={(e)=> setLongname(e.target.value)}/>
      </FormControl>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Control Description" variant="outlined"  value={desc} onChange={(e)=> setDesc(e.target.value)}/>
      </FormControl>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <FormControl fullWidth>
        <TextField id="outlined-basic" label="Supplemental Guidance" variant="outlined"  value={suppementalguidance} onChange={(e)=> setSuppementalguidance(e.target.value)}/>
      </FormControl>
    </div>

      
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Control Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={class1}
          label="Control Class"
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
        <InputLabel id="demo-simple-select-label">Control Phase</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={phase}
          label="Control Phase"
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
      <TextField id="outlined-basic" label="Control Number" variant="outlined"  value={controlNumber} onChange={(e)=> setControlNumber(e.target.value)}/>
      </FormControl>
      </div>
      </div>


      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
      <div style={{width: '40%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Current Maturity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentMaturity}
          label="Current Maturity"
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
        <InputLabel id="demo-simple-select-label">Desired Maturity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={desiredMaturity}
          label="Desired Maturity"
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
        <InputLabel id="demo-simple-select-label">Control Priority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          label="Control Priority"
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
        <InputLabel id="demo-simple-select-label">Control Family</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={family}
          label="Control Family"
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
        <InputLabel id="demo-simple-select-label">Control Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={controlType}
          label="Control Type"
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
        <InputLabel id="demo-simple-select-label">Control Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Control Phase"
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
        <InputLabel id="demo-simple-select-label">Control Owner</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={owner}
          label="Control Owner"
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
        <InputLabel id="demo-simple-select-label">Control Framework</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          multiple
          id="demo-simple-select"
          value={framework}
          label="Control Framework"
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

export default New_control