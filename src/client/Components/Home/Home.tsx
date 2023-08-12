import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../Global/Header'
import Blog from './Blog'
import { getAllBlogs } from '../API/ApiForBlog'
import { propsBlogs } from '../Type/Props'
const Home = () => {
  const [Blogs, setBlogs] = useState<propsBlogs[]>([] as propsBlogs[]);
  useEffect(() => {
    const getBlogs = async () => {
      const { blogs } = await getAllBlogs();
      setBlogs(blogs)
    }
    getBlogs();
  }, [])
  return (
    <Box>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Typography
          variant="h3"
          color="secondary.main"
          sx={{
            position: 'relative',
            fontWeight: 'bold',
            border: '2.3px dotted #102C57',
            padding: '7px',
            borderRadius:'15px',
            '&::before': {
              bgcolor: '#C70039', position: 'absolute', content: '" "', height: '12px', width: '12px', borderRadius: '50%', bottom: '40%', left: '-25px',
            },
            '&::after':{
              bgcolor: '#C70039', position: 'absolute', content: '" "', height: '12px', width: '12px', borderRadius: '50%', bottom: '40%', right: '-25px',

            }
          }}
        >
          <i>Welcome to my channel's blogs</i>
        </Typography>
      </Box>
      <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 4, mb: 4 }}>
        {
          Blogs.length != 0 && Blogs.map((blog: propsBlogs, index) => {
            const { _id, Title, Date: d, Image, Description, Like, Commentaire } = blog
            return <Blog key={_id} _id={_id} Title={Title} Date={d} Image={Image} Description={Description} Like={Like} Commentaire={Commentaire} />
          })
        }

      </Container>
    </Box >
  )
}
export default Home