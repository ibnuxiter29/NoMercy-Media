const axios = require('axios');

async function getConfig() {
  const res = await axios.get(process.env.GITHUB_RAW_URL, {
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  });
  return res.data;
}

module.exports = { getConfig };
