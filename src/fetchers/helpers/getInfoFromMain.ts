import { oraPromise } from 'ora';
import { ZULIP_DOMAIN, CSRF_SELECTOR } from '../../constants.js';
import { getPage } from './getPage.js';
import globalVariables from '../../globalVariables.js';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getInfoFromMain() {
  const doc = await oraPromise(getPage(ZULIP_DOMAIN), {
    text: 'Инизиализация основных данных зулипа',
  });
  const csrfToken = doc.querySelector(CSRF_SELECTOR)?.getAttribute('value');
  globalVariables.CSRF_TOKEN = csrfToken ?? '';

  return {
    csrfToken,
  };
}
