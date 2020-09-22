import options from '@/utils/options';

browser.runtime.onMessageExternal.addListener(
  async function(request, sender, sendResponse) {
    await options.fetch();
    
    try {
      if(sender.url.indexOf('http://localhost:2999/') !== 0 &&
         sender.url.indexOf('https://bnk-browser-extension.onrender.com/') !== 0) {
        return { error: 'invalid url' };
      }
      
      if(request.type == 'authenticate') {
        options.token = request.payload.access_token;
        return { result: 'authenticated' };
      }
      
      if(request.type == 'checkStatus') {
        return { authenticated: !!options.token };
      }
      
      if(request.type == 'logout') {
        const r = await options.clear();
        return { authenticated: false };
      }
      
      return { error: 'unknown request type' };
    } catch(x) {
      return { error: x }
    }
  });
