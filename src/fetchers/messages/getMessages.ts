import globalVariables from '../../globalVariables.js';
import { TResWithMessages, TReqMessage } from '../../types.js';
import { authorizedJsonFetch } from '../helpers/authorizedFetch.js';

export type TNarrowOption = {
  negated: boolean;
  operator: 'stream' | 'pm-with' | 'in' | 'is';
  operand: 'home' | 'starred' | 'mentioned' | TReqMessage['display_recipient'];
};

type TAnchorOption = 'newest' | 'first_unread' | TReqMessage['id'];

export type TGetMessagesOptions = {
  anchor: TAnchorOption;
  num_before: number;
  num_after: number;
  narrow?: TNarrowOption;
};

export const getMessages = async ({
  anchor,
  num_before,
  num_after,
  narrow,
}: TGetMessagesOptions): Promise<TResWithMessages> => {
  const searchParams = new URLSearchParams({
    anchor: String(anchor),
    num_before: String(num_before),
    num_after: String(num_after),
  });

  if (narrow) {
    searchParams.append(
      'narrow',
      `[{"negated":${narrow.negated},"operator":"${narrow.operator}","operand":${
        Array.isArray(narrow.operand)
          ? `[${narrow.operand.map(({ id }) => id).join(',')}]`
          : Number.isInteger(narrow.operand)
            ? narrow.operand
            : `"${narrow.operand}"`
      }}]`,
    );
  }

  const res = await authorizedJsonFetch<TResWithMessages>(`/json/messages?${searchParams}`);

  globalVariables.messagesById ??= {};

  globalVariables.messagesById = res.messages.reduce((acc, msg) => {
    acc[msg.id] = msg;
    return acc;
  }, globalVariables.messagesById);

  return res;
};
