const fs = require('fs');

async function getProjectDetails() {
    return new Promise((resolve, reject) => {
        fs.readFile('./services/assets/projects.json', 'utf8', (err, data) => {
            if (err || !data) {
                console.error('Error reading file:', err);
                reject(err);
                return;
            }

            try {
                const projects = JSON.parse(data);
                resolve(projects);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                reject(error);
            }
        });
    });
}

exports.projectsGetDetails = async (req, res) => { 
    try {
        const jsonData = await getProjectDetails();
        console.log('Project JSON:', jsonData);
        res.json(jsonData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Leetcode data', details: error.message });
    }
  };
