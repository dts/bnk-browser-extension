const CLIENT_ID = 'client_id_k37lbp';
const CLIENT_SECRET = 'client_secret_e7yt8kwcudovlsz8jcfqbo0sctwsdwak';

function parseQueryString(string) {
  return Object.assign(
    ...string.split('&').map(piece => {
      const [match,key,value] = piece.match(/^(.*?)=(.*)$/) || [];
      return {[decodeURIComponent(key)]:decodeURIComponent(value)};
    })
  )
}

function retrieveCode() {
  return new Promise(async (resolve,reject) => {
    async function finish(result,error) {
      browser.webNavigation.onBeforeNavigate.removeListener(onBeforeNavigate);
      await browser.windows.remove(loginWindow.id);
      
      if(result) resolve(result);
      else reject(error);
    }
    
    let loginWindow = await browser.windows.create(
      { 'type': 'popup',
        url: `https://bnk.dev/oauth/authorization?client_id=${CLIENT_ID}&scope=read_write`
      }
    );
    let loginTabId = loginWindow.tabs[0].id;
    
    function onBeforeNavigate(details) {
      if(details.tabId != loginTabId) return;

      let queryString = (details.url.match(/\?(.*)$/)||[])[1];
      if(queryString) {
        let query = parseQueryString(queryString)
        if('error' in query || 'code' in query) finish(query);
      }
    }
    
    browser.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate);
  });
}


export default async function() {
  const { code, error, state } = await retrieveCode();

  if(error) return { error };
  if(!code) return { error: 'no code' };

  const response = await fetch(
    'https://api.bnk.dev/oauth/tokens',
    {
      credentials: 'omit',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
      })
    }
  );

  if(response.statusCode !== 200) {
    return { error: response.status };
  }

  const result = await response.json();
  console.log("RESULT: ",result);

  return result;
}
