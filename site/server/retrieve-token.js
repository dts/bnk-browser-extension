const qs = require('qs');
const unet = require('unet');

import config from '../config.js'

export default async function(req,res) {
  const [url,query] = req.url.match(/\?(.*)/)||[]
  if(!query) {
    res.statusCode = 500;
    res.end('server error - no query string');
    return;
  }
  
  const { code, error, state } = qs.parse(query);

  if(error) {
    // TODO: Handle error (might be "permission denied")
  }

  const response = await unet({
    method: 'post',
    url: 'https://api.bnk.dev/oauth/tokens',
    headers: {
      authorization: `Bearer ${config.bearerToken}`,
    },
    body: {
      code: code,
      client_id: config.clientID,
      client_secret: config.clientSecret,
      grant_type: 'authorization_code',
    }
  })
    
  console.log("Response: ",response);

  res.statusCode = 302;
  res.setHeader('Location','/authenticated?'+qs.stringify(response.result || response.error));
  res.end();
}
