import { ZULIP_DOMAIN } from '../../constants.js';
import globalVariables from '../../globalVariables.js';

export async function authorizedJsonFetch<Response>(endpoint: string): Promise<Response> {
  const url = new URL(endpoint, ZULIP_DOMAIN);

  return fetch(url, {
    headers: {
      cookie: `__Host-sessionid=${globalVariables.COOKIE_SESSIONID_VALUE};`,
      'X-Csrftoken': globalVariables.CSRF_TOKEN ?? '',
    },
  }).then<Response>(async (res) => {
    if (res.status === 200) return res.json();
    if (res.status === 401) throw new Error('Unauthorized');

    throw new Error(await res.text());
  });
}
