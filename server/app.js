const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;


require('dotenv').config();

const leetcode = require('./services/leetcodeService');
const github = require('./services/githubService.js');
const projects = require('./services/projectsService.js');

app.use(cors());

function restrictAccess(req, res, next) {
  const allowedOrigins = ['http://localhost:3000'];
  const origin = req.headers.origin;
  
  if (!allowedOrigins.includes(origin)) {
    console.log(origin);
    return res.status(403).send('Access Denied');
  }
  
  next();
}

app.get('/leetcode', restrictAccess, leetcode.leetcodeGetInfo);
app.get('/github', restrictAccess, github.githubGetInfo);
app.get('/projects', restrictAccess, projects.projectsGetDetails);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});