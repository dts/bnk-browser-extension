# BNK browser extension

There are two components to the browser extension, the actual extension and a web service that retains the OAuth secrets.  The basic flow is that the web service has a communication pathway to the extension, and a few different URLs that facilitate the authentication with BNK and the passing of the authentication token back into the extension.

## Extension usage

If you want to use the extension, build it using:

```
cd extension ; yarn ; yarn build
```

Then load `extension/distribution/` as an unpacked extension from [chrome://extensions/](Chrome Extensions).

## Web service usage

In order to run the the web service locally, create an OAuth application in https://bnk.dev/oauth/applications, and copy the values into `site/secrets.json`, something like:

```
{
  "clientID": "client_id_<CLIENT_ID>",
  "clientSecret": "client_secret_<CLIENT_SECRET>",
  "bearerToken": "<bearer token for account with OAuth application>",
  "extensionID": "doaldmiaeepjopefcjliakaclpijkfnp"
}
```

_Note_: Extension IDs are exclusive, and if you intend to publish your derivative extension, you'll need to generate a new one by deleting it out of the manifest, loading the unpacked extension, and then copying the generated ID out of Chrome.

```
cd site ; yarn ; yarn dev
```

And visit it at http://localhost:2999.  When you receive the redirect from BNK to an https URL, you may have to manually redirect to localhost:2999 in order to finish the flow.  BNK does not support HTTP redirects, and you will want to set it up to point to a public URL that you control.