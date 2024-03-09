const fs = require('fs');
const path = require('path');

let lastRequestTime = null;
let cachedData = null;

const query = `
  query getUserProfile($username: String!) {
    recentSubmissionList(username: $username) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
      __typename
    }
    matchedUserStats: matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
          __typename
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
          __typename
        }
        __typename
      }
    }
  }
`;

async function leetcodeGetInfo() {
  const currentTime = new Date();
  if (!lastRequestTime || (currentTime - lastRequestTime) > 2 * 60 * 1000) {
    try {
      const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        }, 
        body: JSON.stringify({query: query, variables: {username: process.env.LEET_USERNAME}}),
      })

      const data = await response.json();
      console.log('Raw Leetcode Data:', data); // Log the raw data before filtering

      cachedData = data;
      lastRequestTime = currentTime;
    
      fs.writeFileSync(path.join(__dirname, '..', 'services', 'assets', 'leetcode.json'), JSON.stringify(data));
      return data;
    }
    catch(error) { 
      console.error('Error fetching Leetcode data:', error);
      throw error;
    }
  }
  else {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'services', 'assets', 'leetcode.json'), 'utf-8'));
    return data;
  }
}

async function filterAcceptedTries(data) {
  if (!data || !data.data || !data.data.recentSubmissionList || !Array.isArray(data.data.recentSubmissionList)) {
      console.error("Invalid data format.");
      return [];
  }
  const recentSubmissionList = data.data.recentSubmissionList;
  const acceptedTries = recentSubmissionList
    .filter(submission => submission.statusDisplay === "Accepted")
    .map(submission => {
      const timestamp = new Date(Number(submission.timestamp) * 1000); // Convert Unix timestamp to milliseconds
      const day = timestamp.getDate();
      const month = timestamp.toLocaleString('default', { month: 'long' });
      const year = timestamp.getFullYear();
      const formattedDate = `${month} ${day}, ${year}`;
      return { ...submission, formattedDate };
    });
  return acceptedTries;
}

exports.leetcodeGetInfo = async (req, res) => { 
  try {
      const jsonData = await leetcodeGetInfo();
      const filteredData = await filterAcceptedTries(jsonData);
      console.log('Leetcode User Data:', filteredData);
      res.json(filteredData);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching Leetcode data', details: error.message });
  }
};
