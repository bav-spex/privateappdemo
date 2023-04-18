import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import auth from 'src/configs/auth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityIcon from '@mui/icons-material/Visibility'
// import ContactSupportIcon from '@mui/icons-material/ContactSupport'
// import PreviewIcon from '@mui/icons-material/Preview'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';
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
import { blue } from '@mui/material/colors';


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { deleteUser } from 'src/store/apps/user'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import { Button } from '@mui/material'

// ** Next Import
import { useRouter } from 'next/router'
import { getBatchList } from 'src/store/apps/batches'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { updateBatch } from 'src/store/apps/schedule'
import { left } from '@popperjs/core'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SimpleDialog from './add_comment_popup'

const emails = ['username@gmail.com', 'user02@gmail.com'];

const AddRisk = () => {

    const router = useRouter();

    const audit_id= router.query.keyword

    const [comment_list, set_comment_list]= useState([]);


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

      const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

      const new_risk= ()=>{

        router.push({
            pathname: '/home/complaince/test/new_risk',
            query: { keyword: audit_id },
        });
      }
   
      const fetch_comment_list = async () => {
        const res = await fetch(`https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit/${router.query.keyword}/testresult/comments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        set_comment_list(data.data.comments);
        console.log("comment list is");
        console.log(data);
      };

      useEffect(() => {
        fetch_comment_list();
      }, []);
    

  return (
    <>
    <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <h1>Add Comments</h1>
    
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
              <Button xs={2} variant='contained' size='medium' onClick={handleClickOpen}>
                New Comment
              </Button>
              <SimpleDialog
        open={open}
        onClose={handleClose}
        audit_id= {router.query.keyword}
      />
            </Grid>


            </div>

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Comment</StyledTableCell>
            <StyledTableCell align="right">Comment Date</StyledTableCell>
            <StyledTableCell align="right">Comment User</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {comment_list.map((row) => (
            <StyledTableRow>
              <StyledTableCell>
                {row.comment}
              </StyledTableCell>
              <StyledTableCell align="right">{row.comment_date}</StyledTableCell>
              <StyledTableCell align="right">{row.comment_user}</StyledTableCell>
            </StyledTableRow>
          ))}


        </TableBody>
      </Table>
    </TableContainer>
            
    </div>
    </>
  )
}

export default AddRisk