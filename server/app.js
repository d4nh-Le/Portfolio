const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 3000;


require('dotenv').config();

const leetcode = require('./services/leetcodeService');
const github = require('./services/githubService.js');
const projects = require('./services/projectsService.js');

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use((req, res, next) => {
  const protectedRoutes = ['/leetcode', '/github', '/projects'];
  const allowedOrigins = ['http://localhost:4200'];
  const origin = req.headers.referer;

  if (protectedRoutes.includes(req.path) && (!origin || !allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin)))) {
    return res.status(403).json({ message: 'Direct access not allowed' });
  }

  next();
});

const webmailerTriggerProject = async (req, res, next) => {
  const key = process.env.WM_TOKEN; 
  const page = "Project";
  const ip = req.ip; 
  const referer = req.get('Referer'); 

  const params = { key, page, ip, referer};

  try {
    await axios.get('https://w3bmailer.site/trigger', { params });
    console.log('Sent to server');
  } catch (error) {
    console.error('Error sending to server:', error);
  }

  next();
};



app.get('/leetcode',  leetcode.leetcodeGetInfo);
app.get('/github', github.githubGetInfo);
app.get('/projects', webmailerTriggerProject,  projects.projectsGetDetails);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});