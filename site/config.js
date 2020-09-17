const fs = require('fs');
const path = require('path');

const options = [
  '/etc/secrets/config.json',
  path.resolve(__dirname,'secrets.json'),
].filter(fs.existsSync);

if(options.length == 0) console.log("No config file found.");

console.log(`Reading config from ${options[0]}`);

export default JSON.parse(fs.readFileSync(options[0]));
