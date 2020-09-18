import unet, { DEFAULT_MIDDLEWARE } from 'unet';
import options from '../options-storage';

async function authenticate(hash,next) {
  // do not authenticate unless it's relative to bnk.dev:
  if(hash.url.indexOf('/') != 0) return next(hash);
  
  const { token } = await options.getAll();

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

export async function graphql (query, variables) {
  const { result, error } = await api({
    url: '/graphql',
    // TODO: Make this a GET if it's non-mutating
    method: 'POST',
    body: {
      query,
      variables,
    },
  });

  if (result.data) return { result: result.data };
  if (result.errors) return { error: result.errors[0] };

  return { error, result };
};
