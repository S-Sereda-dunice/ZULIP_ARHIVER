import { TReqMessage, TRoomsById } from '../types.js';

export const normalizeMessagesByRoom = (messages: TReqMessage[]): TRoomsById =>
  messages.reduce<TRoomsById>((acc, message) => {
    const recipient = message.display_recipient;

    const roomName: string = Array.isArray(recipient)
      ? recipient.reduce<string>((names, { full_name }) => names + (names && '|') + full_name, '')
      : String(recipient);

    const roomId = message.stream_id ?? message.recipient_id;

    const room = (acc[roomId] ??= {
      roomName,
      messages: [],
    });
    const insertIndex = room.messages.findIndex((msg) => message.id < msg.id);
    room.messages.splice(insertIndex, 0, message);

    return acc;
  }, {});
