import { normalizeMessagesByRoom } from '../../normalizers/normalizeMessagesByRoom.js';
import { TRoomsById } from '../../types.js';
import { getFirstUnread } from '../messages/getFirstUnread.js';
import { getNewestInHome } from '../messages/getNewestInHome.js';

export const getRooms = (): Promise<TRoomsById> =>
  Promise.all([getNewestInHome().then((res) => res.messages), getFirstUnread().then((res) => res.messages)]).then(
    (messages) => normalizeMessagesByRoom(messages.flat()),
  );
