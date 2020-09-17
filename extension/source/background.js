// eslint-disable-next-line import/no-unassigned-import
import optionsStorage from './options-storage';

console.log("On Message External....");

browser.runtime.onMessageExternal.addListener(
  async function(request, sender, sendResponse) {
    try {
      if(sender.url.indexOf('http://localhost:2999/') !== 0) {
        return { error: 'invalid url' };
      }

      if(request.type == 'authenticate') {
        await optionsStorage.set('token',request.payload.access_token);
        return { result: 'authenticated' };
      }

      if(request.type == 'checkStatus') {
        const settings = await optionsStorage.getAll();
        
        return { authenticated: !!settings['token'] };
      }

      return { error: 'unknown request type' };
    } catch(x) {
      return { error: x }
    }
  });
