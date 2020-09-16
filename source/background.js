// eslint-disable-next-line import/no-unassigned-import
import './options-storage';

import signInFlow from './utils/sign-in';

async function signIn() {
  const { token, error } = await signInFlow();
  console.log("TOKEN: ",token);
}

browser.runtime.onConnect.addListener((port) => {
  console.log("ON CONNECT: ",port);
  port.onMessage.addListener((message) => {
    if(message.type == 'signIn') signIn();
  });
})
