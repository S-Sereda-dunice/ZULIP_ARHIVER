import { TGetMessagesOptions, TNarrowOption, getMessages } from './getMessages.js';
import { TReqMessage, TResWithMessages, TRoom } from '../../types.js';

const operatorByRoomType: Record<TReqMessage['type'], TNarrowOption['operator']> = {
  private: 'pm-with',
  stream: 'stream',
};
type TParams = {
  room: TRoom;
  options: Omit<TGetMessagesOptions, 'narrow'>;
};
export const getMessagesByRoom = async ({ room, options }: TParams): Promise<TResWithMessages> => {
  const referenceMessage = room?.messages.at(0);

  return getMessages({
    ...options,
    narrow: referenceMessage && {
      negated: false,
      operator: operatorByRoomType[referenceMessage.type],
      operand: referenceMessage.display_recipient,
    },
  });
};
