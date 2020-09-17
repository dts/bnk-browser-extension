const qs = require('qs');
const unet = require('unet');

import { CLIENT_ID, CLIENT_SECRET, BEARER_TOKEN } from '../secrets.js'

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
      authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: {
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
    }
  })
    
  console.log("Response: ",response);

  res.statusCode = 302;
  res.setHeader('Location','/authenticated?'+qs.stringify(response.result || response.error));
  res.end();
}
