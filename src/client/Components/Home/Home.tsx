import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../Global/Header'
import about from '../../assets/about1.jpg'
import Blog from './Blog'
import { getAllBlogs } from '../API/ApiForBlog'
import { propsBlogs } from '../Type/Props'
import AOS from 'aos';
import 'aos/dist/aos.css';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const Home = () => {
  const [Blogs, setBlogs] = useState<propsBlogs[]>([] as propsBlogs[]);
  useEffect(() => {
    const getBlogs = async () => {
      const { blogs } = await getAllBlogs();
      setBlogs(blogs)
    }
    getBlogs();
  }, [])
  useEffect(() => {
    AOS.init({ duration: 1500 })
  }, [])
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const theme = useTheme();
  const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
  const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
  const [types, setTypes] = useState<string[]>([])
  useEffect(() => {
    if (Blogs.length > 0) {
      const typeArray = [...new Set(Blogs.map(b => b.Type))];
      setTypes(typeArray);
    }
  }, [Blogs])

  return (
    <Box overflow='hidden' sx={{ background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,45,92,1) 100%, rgba(162,173,189,1) 100%, rgba(16,44,87,1) 100%, rgba(20,66,114,1) 100%, rgba(20,38,114,1) 100%)' }}>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Typography
          data-aos='zoom-in'
          variant={isMatchedPhone ? 'h5':  'h4'}
          color="secondary.light"
          sx={{
            position: 'relative',
            fontWeight: 'bold',
            border: '2.3px dotted #102C57',
            padding: '7px',
            borderRadius: '15px',
            '&::before': {
              bgcolor: '#C70039', position: 'absolute', content: '" "', height: '12px', width: '12px', borderRadius: '50%', bottom: '40%', left: '-25px',
            },
            '&::after': {
              bgcolor: '#C70039', position: 'absolute', content: '" "', height: '12px', width: '12px', borderRadius: '50%', bottom: '40%', right: '-25px',
            }
          }}
        >
          <i>Welcome to my channel's blogs</i>
        </Typography>
      </Box>
      <Box sx={{ mt: 2, p: { xs: '20px', md: '2rem' }, display: 'flex' }}>
        <Box data-aos='fade-right' sx={{ flex: '1 1 40%', display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <img src={about} width='90%' style={{  borderRadius: '10px' }} />
        </Box>
        <Box data-aos='fade-left' sx={{ flex: '1 1 60%', display: "flex", justifyContent: 'center', flexDirection: 'column', pl: { xs: 0, md: 2 } }}>
          <Typography variant='h6' color='primary'><span style={{ color: '#F4D160' }}>My </span>intro</Typography>
          <Typography variant={isMatchedPhone ? 'h4' : 'h3'} color='primary' mb={isMatchedPhone ? 1 : 3}>About Me</Typography>
          <Typography variant={isMatchedPhone ? 'body2' : 'body1'} sx={{ color: 'black', mb: 2, letterSpacing: { xs: '1.5px', md: '2px' }, lineHeight: '28px', ':first-letter': { color: 'secondary.main' } }}>
            Experienced full-stack web developer with a strong background in creating and modifying responsive
            websites. Skilled in developing websites’ structures and implementing filtering systems. Successfully created
            websites for various clients. I have the ability to work on per-existing projects or develop ones from scratch if
            needed.
          </Typography>

        </Box>
      </Box>
      <Box sx={{ bgcolor: 'whitesmoke', mt: { xs: 2, md: 4 }, width: { xs: '95%', md: '85%' }, m: '0 auto' }}>
        <AppBar position="static">
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            indicatorColor='secondary'
            textColor='inherit'
            variant={isMatchedPhone?'scrollable':'standard'}
            aria-label="full width tabs example"
          >
            <Tab label="All" {...a11yProps(0)} sx={{ fontSize: '1rem', fontWeight: 'bold', letterSpacing: '2.5px' }} />
            {
              types.length > 0 &&
              types.map((t, i) => t && <Tab label={t} {...a11yProps(i + 1)} sx={{ fontSize: '1rem', fontWeight: 'bold', letterSpacing: '2.5px' }} />
              )
            }
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction} >
            <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 4 }, mt: 4, mb: 4 }}>
              {
                Blogs.length != 0 && Blogs.map((blog: propsBlogs, index) => {
                  const { _id, Title, Date: d, Image, Description, Like, Type, Commentaire } = blog
                  return <Blog key={_id} _id={_id} Title={Title} Date={d} Image={Image} Description={Description} Like={Like} Type={Type} Commentaire={Commentaire} />
                })
              }
            </Container>
          </TabPanel>
          {
            types.length > 0 && types.map((t, i) => (
              <TabPanel value={value} index={i + 1} dir={theme.direction}>
                <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 4 }, mb: 4 }}>
                  {
                    Blogs.length != 0 && Blogs.filter(blog => blog.Type == t).map((blog: propsBlogs, index) => {
                      const { _id, Title, Date: d, Image, Description, Like, Type, Commentaire } = blog
                      return <Blog key={_id} _id={_id} Title={Title} Date={d} Image={Image} Description={Description} Like={Like} Type={Type} Commentaire={Commentaire} />
                    })
                  }
                </Container>
              </TabPanel>
            ))
          }
        </SwipeableViews>
      </Box>
      {/* <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 4, mb: 4 }}>
        {
          Blogs.length != 0 && Blogs.map((blog: propsBlogs, index) => {
            const { _id, Title, Date: d, Image, Description, Like, Type, Commentaire } = blog
            return <Blog key={_id} _id={_id} Title={Title} Date={d} Image={Image} Description={Description} Like={Like} Type={Type} Commentaire={Commentaire} />
          })
        }

      </Container> */}
    </Box >
  )
}
export default Home