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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


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
            <Button onClick={ addModal }>Add Modal</Button>
            <Button onClick={ editModal }>Edit modal</Button>
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
