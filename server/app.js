
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;


require('dotenv').config();

const leetcode = require('./services/leetcodeService');
const github = require('./services/githubService.js');

app.use(cors());

app.get('/leetcode', leetcode.leetcodeGetInfo);
app.get('/github', github.githubGetInfo);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});