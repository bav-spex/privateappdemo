import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Link from 'next/link'

// ** MUI Imports

import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'



import InputLabel from '@mui/material/InputLabel'

import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const addModal = () => setOpen(true);
    const editModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const eidtModalCose = () => setOpen(false);

    return (
        <div>
            {/* <Button onClick={ addModal }>Add Modal</Button> */}
            {/* <Button onClick={ editModal }>Edit modal</Button> */}

            <Card>
          <CardHeader title='Batches' />
          <CardContent>
          <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' ,margin: '0 0 30px' }}>
                <Button size='medium' variant='contained'  onClick={ addModal }>
                  Create Batch
                </Button>
              </Grid>
              <Divider />
            <Grid container direction="column" sx={{margin: '30px 0 0'}}>
              <Grid item>
              <div className='data_table'>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Framework Name</th>
                        <th>Parent Framework</th>
                        <th>Framework Description</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Name</td>
                        <td>Name</td>
                        <td>Name</td>
                        <td>
                        <IconButton onClick={ editModal } sx={ { color: '#db4437' } }>
                            <Icon icon='mdi:edit' />
                        </IconButton>
                        <IconButton  sx={ { color: '#db4437' } }>
                            <Icon icon='mdi:delete' />
                        </IconButton>
                        </td>
                        
                    </tr>
                    </table>
            </div>
              </Grid>
             
            </Grid>
          </CardContent>
      
          
         
        </Card>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={ open }
                onClose={ handleClose }
                closeAfterTransition
                slots={ { backdrop: Backdrop } }
                slotProps={ {
                    backdrop: {
                        timeout: 500,
                    },
                } }
            >
                <Fade in={ open }>
                    <Box sx={ style } component="form">
                        <IconButton href='/' className='close' sx={ { color: '#db4437' } } onClick={ e => e.preventDefault() }>
                            <Icon icon='mdi:close' />
                        </IconButton>
                        <h2 className='modal-title'>Add New Framework</h2>

                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <FormControl className='mb-15' fullWidth variant="outlined"><TextField id="outlined-basic" label="Framework Name" variant="outlined" /></FormControl>

                            <FormControl className='mb-15' fullWidth variant="outlined"><TextField
                                id="outlined-select-currency"
                                select
                                label="Parent Framework"
                                defaultValue="EUR"

                            >
                            </TextField>
                            </FormControl>
                            <TextField fullWidth className='mb-15'
                                id="outlined-multiline-static"
                                label="Framework Description"
                                multiline
                                rows={ 4 }
                            >
                            </TextField>
                            <div className='btn-group-section'>
                                <button type='button' className='btn btn-danger'>Cancel</button>
                                <button type='button' className='btn btn-primary'>Add</button>
                            </div>
                        </Typography>

                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={ open }
                onClose={ eidtModalCose }
                closeAfterTransition
                slots={ { backdrop: Backdrop } }
                slotProps={ {
                    backdrop: {
                        timeout: 500,
                    },
                } }
            >
                <Fade in={ open }>
                    <Box sx={ style } component="form">
                        <IconButton href='/' className='close' sx={ { color: '#db4437' } } onClick={ e => e.preventDefault() }>
                            <Icon icon='mdi:close' />
                        </IconButton>
                        <h2 className='modal-title'>Edit New Framework</h2>

                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <FormControl className='mb-15' fullWidth variant="outlined"><TextField id="outlined-basic" label="Framework Name" variant="outlined" /></FormControl>

                            <FormControl className='mb-15' fullWidth variant="outlined"><TextField
                                id="outlined-select-currency"
                                select
                                label="Parent Framework"
                                defaultValue="EUR"

                            >
                            </TextField>
                            </FormControl>
                            <TextField fullWidth className='mb-15'
                                id="outlined-multiline-static"
                                label="Framework Description"
                                multiline
                                rows={ 4 }
                            >
                            </TextField>
                            <div className='btn-group-section'>
                                <button type='button' className='btn btn-danger'>Cancel</button>
                                <button type='button' className='btn btn-primary'>Add</button>
                            </div>
                        </Typography>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
