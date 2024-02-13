async function fetchGitHubData() {
  const query = `
  query GetUserInformationWithCommits($username: String!) {
      user(login: $username) {
          login
          name
          bio
          contributionsCollection {
              commitContributionsByRepository(maxRepositories: 5) {
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
                                  history(first: 5) {
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
      return data;
  } catch (error) {
      console.error('Error fetching GitHub data:', error);
      throw error;
  }
}

function filterCommits(jsonData) {
  if (!jsonData || !jsonData.data || !jsonData.data.user) {
      console.error("Invalid JSON data format.");
      return [];
  }

  const allCommits = [];

  // Extract commits from all repositories
  (jsonData.data.user.contributionsCollection.commitContributionsByRepository || []).forEach(repo => {
      if (repo && repo.repository && repo.repository.defaultBranchRef && repo.repository.defaultBranchRef.target && repo.repository.defaultBranchRef.target.history && repo.repository.defaultBranchRef.target.history.nodes) {
          const commits = repo.repository.defaultBranchRef.target.history.nodes.map(commit => ({
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
          }));

          allCommits.push(...commits);
      }
  });

  // Sort commits by committedDate in descending order
  allCommits.sort((a, b) => new Date(b.committedDate) - new Date(a.committedDate));

  // Return only the latest 3 commits
  return allCommits.slice(0, 3);
}

exports.githubGetInfo = async (req, res) => { 
  try {
      const jsonData = await fetchGitHubData();
      const filteredData = filterCommits(jsonData);

      console.log('GitHub User Data:', filteredData);
      res.json(filteredData);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching GitHub data', details: error.message });
  }
};
