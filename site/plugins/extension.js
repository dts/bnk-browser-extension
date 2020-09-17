export default (context,inject) => inject('extension',(message) => {
  return new Promise((resolve,reject) => {
    let ext = window.chrome || window.browser;

    if(!ext) reject(new Error("No browser extension API?"));

    ext.runtime.sendMessage(
      context.env.extensionID,
      message,
      (response) => {
        if(response)
          resolve(response)
        else
          resolve({ error: ext.runtime.lastError });
      }
    );
  })
})
