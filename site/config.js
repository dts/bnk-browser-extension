const fs = require('fs');
const path = require('path');

const options = [
  '/etc/secrets/secrets.json',
  path.resolve(__dirname,'secrets.json'),
].filter(fs.existsSync);

let config = null;

if(!options[0]) console.log("No config file found.");
else {
  console.log(`Reading config from ${options[0]}`);
  config = JSON.parse(fs.readFileSync(options[0]));
}

export default config;
