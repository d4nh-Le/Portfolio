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
      return data;
    }
    catch(error) { 
      console.error('Error fetching Leetcode data:', error);
      throw error;
    }
}

function filterAcceptedTries(data) {
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
      const filteredData = filterAcceptedTries(jsonData);
      console.log('Leetcode User Data:', filteredData);
      res.json(filteredData);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching Leetcode data', details: error.message });
  }
};
