import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import auth from 'src/configs/auth';
// import './edit_control.css'
import { CardContent, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Grid, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleDialog from './add_lookup';



const LookUps = () => {

    const router = useRouter();

    const [look_ups, set_look_ups]= useState([]);

    const [look_ups_list, set_look_ups_list]= useState([]);

    const [look_ups_dropdown, set_look_ups_dropdown]= useState([]);

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.grey,
          color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        // '&:last-child td, &:last-child th': {
        //   border: 0,
        // },
      }));

    const fetch_look_up_list= async()=>{

        const res= await fetch(`${auth.category_list}`, {
            method:"GET",
              headers:{
                  "Content-Type": "application/json"
              },
        })
        const data= await res.json();
        console.log("look up dropdown list is", data);
        set_look_ups_dropdown(data);
      }
    
  
      const display_look_up= async(e)=>{

        set_look_ups(e.target.value);
        const res= await fetch(`${auth.display_lookup}/${e.target.value}`, {
            method:"GET",
              headers:{
                  "Content-Type": "application/json"
              },
        })
        const data= await res.json();

        console.log("look up list is", data);
        set_look_ups_list(data);
      }
    
  

    useEffect(() => {

        fetch_look_up_list();
     
    }, [])


  return (
    <>
    <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <h1>Look Ups</h1>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
        value={look_ups}
        onChange={(e)=> display_look_up(e)}
        labelId="demo-simple-select-label"
        label="Category"
        inputProps={{
          name: 'selectedValues',
          id: 'selected-values',
        }}
      >
          
          {look_ups_dropdown.map((item) => (item !== null ?
          <MenuItem value={item.id}>{item.lookupCategoryName}</MenuItem>: ""
          ))}
      </Select>
      </FormControl>
      

    </div>
            
    <div style={{display: 'flex', justifyContent: 'right', marginBottom: '5vh'}}>
        <Button variant='contained' onClick={handleClickOpen}>Add Value</Button>
        <SimpleDialog
        open={open}
        onClose={handleClose}
        category_id= {look_ups}
      />
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Lookup Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {look_ups_list.map((row) => (
            <StyledTableRow key={row.lookupId}>
              <StyledTableCell>
                {row.lookupId}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.lookupName}</StyledTableCell>
              <StyledTableCell align='center'><DeleteIcon sx={{color: 'red'}}/></StyledTableCell>
            </StyledTableRow>
          ))}


        </TableBody>
      </Table>
    </TableContainer>

    </div>
    </>
  )
}

export default LookUps