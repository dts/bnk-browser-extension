import unet from 'unet';
import options from '../options-storage';

export default async function (query, variables) {
  const { token } = await options.getAll();
  
  const { result, error } = await unet({
    url: 'https://api.bnk.dev/graphql',
    // TODO: Make this a GET if it's non-mutating
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`
    },
    body: {
      query,
      variables,
    },
  });

  if (result.data) return { result: result.data };
  if (result.errors) return { error: result.errors[0] };

  return { error, result };
};
