import express from "express";
import ViteExpress from "vite-express";
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
require('dotenv').config()
const RegisterRoutes = require('./Routes/register');
const BlogRoutes = require('./Routes/blogs');
const ProfileRoutes = require('./Routes/profile')
//cors
const cors = require('cors');
const corsOpts = {
  origin: '*',
  credentials: true,
  methods: [
    'GET',
    'POST',
  ],
  allowedHeaders: [
    'Content-Type', 'Authorization'
  ],
};
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors(corsOpts))
app.use(express.json())
app.use(cookieParser());
app.use(morgan('dev'));
//db connection 
// const dburl = 'mongodb://localhost:27017/blogs';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => ViteExpress.listen(app, process.env.PORT, () => {
    console.log("Server is listening on port 3001...");
  }))
  .catch((err: any) => console.log(err))
console.log('ok');

app.use(RegisterRoutes);
app.use(BlogRoutes);
app.use(ProfileRoutes)
