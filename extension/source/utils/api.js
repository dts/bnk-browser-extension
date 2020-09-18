import unet, { DEFAULT_MIDDLEWARE } from 'unet';
import options from '@/utils/options';
import qs from 'qs';

async function authenticate(hash,next) {
  // do not authenticate unless it's relative to bnk.dev:
  if(hash.url.indexOf('/') != 0) return next(hash);
  
  const token = options.token;

  return next({
    baseURL: 'https://api.bnk.dev',
    ...hash,
    headers: {
      ...hash.headers,
      'authorization': `Bearer ${token}`
    },
  });
}

export const api = unet({
  middleware: [
    authenticate,
    ...DEFAULT_MIDDLEWARE,
  ]
},true);

function isMutation(query) {
  return !!query.match(/^\s*mutation\s*{/);
}

function graphqlPOST(query,variables) {
  return api({
    url: '/graphql',
    method: 'POST',
    body: {
      query,
      variables,
    },
  });
}

function graphqlGET(query,variables) {
  return api({
    url: `/graphql?${qs.stringify({ query, variables })}`,
    method: 'GET',
  });
}


export async function graphql (query, variables) {
  const { result, error } = isMutation(query) ?
        await graphqlPOST(query,variables) :
        await graphqlGET(query,variables);

  if (result.data) return { result: result.data };
  if (result.errors) return { error: result.errors[0] };

  return { error, result };
};
