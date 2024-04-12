import { getMessages } from './getMessages.js';
import { TResWithMessages, TRoom } from '../../types.js';
import { getMessagesByRoom } from './getMessagesByRoom.js';

export const getFirstUnread = async (room?: TRoom): Promise<TResWithMessages> => {
  const { narrow, ...options }: Parameters<typeof getMessages>[0] = {
    anchor: 'first_unread',
    num_before: 200,
    num_after: 200,
  };

  if (room) return getMessagesByRoom({ room, options });

  return getMessages({ ...options, ...narrow });
};
