const fs = require('fs');
const path = require('path');

let lastRequestTime = null;
let cachedData = null;

async function fetchGitHubData() {
  const query = `
  query GetUserInformationWithCommits($username: String!) {
      user(login: $username) {
          login
          name
          bio
          contributionsCollection {
              commitContributionsByRepository(maxRepositories: 10) {
                  contributions {
                      totalCount
                  }
                  repository {
                      name
                      owner {
                          login
                      }
                      defaultBranchRef {
                          name
                          target {
                              ... on Commit {
                                  history(first: 50) {
                                      nodes {
                                          message
                                          committedDate
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  }
  `;

  const currentTime = new Date();
  if (!lastRequestTime || (currentTime - lastRequestTime) > 2 * 60 * 1000) {
  const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.GH_TOKEN}`,
  };

  try {
      const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ query: query, variables: { username: process.env.GH_USERNAME } }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      cachedData = data;
      lastRequestTime = currentTime;
    
      fs.writeFileSync(path.join(__dirname, '..', 'services', 'assets', 'github.json'), JSON.stringify(data));

      
      return data;
  } catch (error) {
      console.error('Error fetching GitHub data:', error);
      throw error;
  }
}
else {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'services', 'assets', 'github.json'), 'utf-8'));
  return data;
}
}

async function filterCommits(jsonData) {
    if (!jsonData || !jsonData.data || !jsonData.data.user) {
      console.error("Invalid JSON data format.");
      return [];
    }
  
    const commitsByDate = {};
  
    // Extract commits from all repositories and group them by date
    (jsonData.data.user.contributionsCollection.commitContributionsByRepository || []).forEach(repo => {
      if (repo && repo.repository && repo.repository.defaultBranchRef && repo.repository.defaultBranchRef.target && repo.repository.defaultBranchRef.target.history && repo.repository.defaultBranchRef.target.history.nodes) {
        repo.repository.defaultBranchRef.target.history.nodes.forEach(commit => {
          const date = new Date(commit.committedDate).toLocaleDateString(); // Group by date
          if (!commitsByDate[date]) {
            commitsByDate[date] = [];
          }
          commitsByDate[date].push({
            repository: {
              name: repo.repository.name,
              owner: {
                login: repo.repository.owner ? repo.repository.owner.login : ""
              },
              defaultBranchRef: {
                name: repo.repository.defaultBranchRef.name
              }
            },
            message: commit.message,
            committedDate: commit.committedDate
          });
        });
      }
    });
  
    // Convert object to array and sort by date in descending order
    const sortedCommits = Object.entries(commitsByDate)
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
      .map(([date, commits]) => ({
        date,
        commits
      }));
 
    return sortedCommits.slice(0, 10);
  }
  

exports.githubGetInfo = async (req, res) => { 
  try {
      const jsonData = await fetchGitHubData();
      const filteredData = await filterCommits(jsonData);

      console.log('GitHub User Data:', filteredData);
      res.json(filteredData);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching GitHub data', details: error.message });
  }
};
