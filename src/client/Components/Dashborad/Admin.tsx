import React, { useContext, useEffect, useState } from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import { Box, Container, Typography } from '@mui/material'
import { serverAddress } from '../Global/Config'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from './Table'
import { getAllBlogs, getOneBlog } from '../API/ApiForBlog'
import { AlertProps, propsBlogs, valuesEdit } from '../Type/Props'
import Alerte from '../Global/Alerte'
import DialogEdit from './DialogEdit'
import { infoGlobal } from '../../App'
const Admin = () => {
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`${serverAddress}/Dashboad`, {
      method: 'GET'
    }).then(res => res.json()).then(data => {
      const { admin } = data
      if (!admin) {
        navigate('/');
      }
    })
  }, [])
  const { infos: { token, UserInfos }, setInfos } = useContext(infoGlobal)
  const [Blogs, setBlogs] = useState<propsBlogs[]>([] as propsBlogs[]);
  useEffect(() => {
    const getBlogs = async () => {
      const { blogs } = await getAllBlogs();
      setBlogs(blogs)
    }
    getBlogs();
  }, [])
  const dataSchema = {
    _id: {
      type: 'number',
      label: 'Blog ID',
    },
    Title: {
      type: 'string',
      label: 'Title',
    },
    Image: {
      type: 'image',
      label: 'Image',
    },
    Like: {
      type: 'array',
      label: 'Likes',
    },
    Commentaire: {
      type: 'array',
      label: 'Comments',
    }
  }
  const [alert, setAlert] = useState<AlertProps>({ alerting: { type: '', text: '' }, open: false });
  const handleDelete = (id: string) => {
    fetch(`${serverAddress}/deleteBlog/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    }).then(res => {
      if (res.ok) {
        setBlogs(prev => prev.filter(blog => blog._id != id))
      }
      return res.json();
    })
      .then(data => {
        const { type, message } = data;
        setAlert({ alerting: { type, text: message }, open: true })
      })
      .catch(err => console.log(err))
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e: boolean) => {
    setOpen(e);
  };
  const [valuesForEdit, setValueForEdit] = useState<valuesEdit>({ _id: '', Title: '', Image: '', Description: '' });
  const handleEdit = async (id: string) => {
    const { json, ok, status } = await getOneBlog(id);
    if (ok) {
      const { blog: { _id, Title, Image, Description, ...rest } } = json
      setValueForEdit({ _id, Title, Image, Description })
      setOpen(true)
    }
  }
  const Actions = [
    {
      label: 'delete', icon: <DeleteIcon />, color: 'error', fct: (id: string) => handleDelete(id)
    },
    {
      label: 'Edit', icon: <EditIcon />, color: 'success', fct: (id: string) => handleEdit(id)
    }
  ]

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideBar current='Dashboard' />
        <Box sx={{ width: "100%", height: '100vh' }}>
          <TopBar title={'Dashboard'} username={UserInfos.user.FirstName} />
          <Container sx={{ mt: 5 }}>
            <Typography variant='h4' color='primary' mb={3}>
              Blogs
            </Typography>
            <Table
              dataSchema={dataSchema}
              rows={Blogs}
              actions={Actions}
            />
          </Container>
        </Box>
        <DialogEdit
          open={open}
          handleClickOpen={handleClickOpen}
          values={valuesForEdit}
          setValues={setValueForEdit}
          setBlogs={setBlogs}
          setAlert={setAlert}
        />
        <Alerte alerting={alert.alerting} open={alert.open} />
      </Box>
    </>
  )
}

export default Admin