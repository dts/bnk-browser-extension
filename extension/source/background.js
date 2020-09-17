// eslint-disable-next-line import/no-unassigned-import
import optionsStorage from './options-storage';

console.log("v1");

browser.runtime.onMessageExternal.addListener(
  async function(request, sender, sendResponse) {
    try {
      if(sender.url.indexOf('http://localhost:2999/') !== 0 &&
        sender.url.indexOf('https://bnk-browser-extension.onrender.com/') !== 0) {
        return { error: 'invalid url' };
      }

      if(request.type == 'authenticate') {
        await optionsStorage.set({ 'token': request.payload.access_token });
        return { result: 'authenticated' };
      }

      if(request.type == 'checkStatus') {
        const settings = await optionsStorage.getAll();
        
        return { authenticated: !!settings['token'] };
      }

      if(request.type == 'logout') {
        const r = await optionsStorage.setAll({});
        debugger;
        return { authenticated: false };
      }

      return { error: 'unknown request type' };
    } catch(x) {
      return { error: x }
    }
  });
