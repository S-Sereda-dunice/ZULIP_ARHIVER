import { TReqMessage, TRoom } from '../../types.js';
import { getFirstUnread } from './getFirstUnread.js';
import { getMessagesByRoom } from './getMessagesByRoom.js';

export const getAllMessagesFromRoom = async (room: TRoom): Promise<TReqMessage[]> => {
  let { messages, found_oldest: foundOldest } = await getFirstUnread(room);

  while (!foundOldest && messages.length) {
    const res = await getMessagesByRoom({
      room,
      options: {
        anchor: messages.at(0)!.id,
        num_after: 0,
        num_before: 1000,
      },
    });

    foundOldest = res.found_oldest;
    messages = [...res.messages, ...messages];
  }

  return messages;
};
