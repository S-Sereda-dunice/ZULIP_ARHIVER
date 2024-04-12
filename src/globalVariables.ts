import type { TReqMessage } from './types.js';

const globalVariables: {
  COOKIE_SESSIONID_VALUE: string | null;
  CSRF_TOKEN: string | null;
  messagesById: Record<TReqMessage['id'], TReqMessage> | null;
} = {
  COOKIE_SESSIONID_VALUE: null,
  CSRF_TOKEN: null,
  messagesById: null,
};

export default globalVariables;
