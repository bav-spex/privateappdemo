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
import { useState, useEffect } from 'react';
import axios from "axios";
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
import { useLocation, useHistory } from "react-router-dom";
// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
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


const frameworkSchema = yup.object().shape({
    name: yup.string().min(2).required(),
    parent: yup.string().min(1).required(),
    desc: yup.string().min(10).required()
})
export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const addModal = () => setOpen(true);
    const editModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const eidtModalCose = () => setOpen(false);
    const [posts, setPosts] = useState([]);
    // const history = useHistory();
  
    useEffect(() => {
      getPosts();
    }, []);

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({      
        mode: 'onBlur',
        resolver: yupResolver(frameworkSchema)
    })

    const formSubmit = (event) => {
        event.preventDefault();
    
        const createResult = !isEdit && createPost();
        createResult && console.log("Success! post created");
        const updateResult = isEdit && updatePost();
        updateResult && console.log("Success! post updated");
    };
    const getPosts = () => {
        axios
        .get("https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/governance/v1/frameworks")
        .then((response) => {
            if (response.status === 200) {
                console.log("response ::: ",response.data.data.frameworks)
            setPosts(response?.data.data.frameworks);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

     //  action click
    const actionClick = (data) => {
        data.e.stopPropagation();
        console.log("action data :::",data)
        if (data && data?.action && data?.action?.type === "view") {
      
        return false;
        } else if (data && data?.action && data?.action?.type === "edit") {
            const editValues = {
                name: 'admin',
                desc: 'admin@materio.com',
                parent: 'admin@materio.com',
            }
            console.log("editValues::",editValues)
        return false;
        } else if (data && data?.action && data?.action?.type === "delete") {
        deletePost(data?.post?.id);
        return false;
        }
    };


    const deletePost = (postId) => {
        console.log("delete pai call :::");
        axios
          .post(`https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/governance/v1/frameworks/delete/${postId}`)
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              getPosts();
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };


    //   create post
    const createPost = () => {
        axios
        .post("https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/governance/v1/frameworks/new", {
            name: post?.name,
            desc: post?.desc,
            parent: post?.parent,
            status: "active",
        })
        .then((response) => {
            getPosts();
            // response &&
            // response?.status === 200 &&
            // history.push(`/posts/view/${match?.params?.id}`);
        })
        .catch((error) => {
            console.log(error);
        });
    };

  //   update post
    const updatePost = () => {
        axios
        .put(`https://jsonplaceholder.typicode.com/posts/${match?.params?.id}`, {
            title: post?.title,
            body: post?.body,
        })
        .then((response) => {
            response &&
            response?.status === 200 &&
            history.push(`/posts/view/${match?.params?.id}`);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    //   onchange event
    const onChange = (e) => {
        setPost({
        ...post,
        [e.target.name]: e.target.value,
        });
    };
    return (
        <div>
            {/* <Button onClick={ addModal }>Add Modal</Button> */ }
            {/* <Button onClick={ editModal }>Edit modal</Button> */ }

            <Card>
                <CardHeader title='Framework' />
                <CardContent>
                    <Grid item sm={ 8 } xs={ 12 } sx={ { display: 'flex', allignItems: 'end', justifyContent: 'end', margin: '0 0 30px' } }>
                        <Button size='medium' variant='contained' onClick={ addModal }>
                            Create Framework
                        </Button>
                    </Grid>
                    <Divider />
                    <Grid container direction="column" sx={ { margin: '30px 0 0' } }>
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
                                    
                                    {posts &&
                                        posts.map((post) => (
                                        <tr
                                            key={post?.id}
                                            onClick={(e) =>
                                                actionClick({ action: { type: "edit" }, post, e })
                                            }
                                        >
                                            <td> {post?.id} </td>
                                            <td> {post?.name} </td>
                                            <td> {post?.parent} </td>
                                            <td> {post?.desc} </td>
                                            <td>                            

                                                <IconButton onClick={ editModal } sx={ { color: '#db4437' } }>
                                                    <Icon icon='mdi:edit' />
                                                </IconButton>
                                                <IconButton   onClick={(e) => actionClick({ action: { type: "delete" }, post, e }) } sx={ { color: '#db4437' } }>
                                                    <Icon icon='mdi:delete' />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
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
                 <form >

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
                 </form>
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
                            <FormControl className='mb-15'  fullWidth variant="outlined"><TextField id="outlined-basic" label="Framework Name" variant="outlined" /></FormControl>

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
