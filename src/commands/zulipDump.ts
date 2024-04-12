import { normalizeMessagesByRoom } from './../normalizers/normalizeMessagesByRoom.js';
import { input, checkbox } from '@inquirer/prompts';
import { oraPromise } from 'ora';
import { getInfoFromMain } from '../fetchers/helpers/getInfoFromMain.js';
import { getRooms } from '../fetchers/rooms/getRooms.js';
import globalVariables from '../globalVariables.js';
import { getAllMessagesFromRoom } from '../fetchers/messages/getAllMessagesFromRoom.js';
import { secureSavingFileWIthHash } from '../helpers/secureSavingFileWIthHash.js';
import { DUMP_ROOM_PATH } from '../constants.js';
import path from 'path';

export const zulipDump = async (): Promise<void> => {
  globalVariables.COOKIE_SESSIONID_VALUE = await input({
    message: 'Сперва наперво введите значение куки __Host-sessionid, чтобы скрипт получил доступ',
    default: process.env.COOKIE_SESSIONID_VALUE,
  });

  await getInfoFromMain();
  const rooms = await oraPromise(getRooms(), {
    text: 'Получение списка комнат с чатами',
    successText: 'Список комнат и чатов которые получили',
  });

  const roomsInfo = Object.entries(rooms).map(([roomId, { roomName }]) => ({ roomId: +roomId, roomName }));
  console.table(roomsInfo);

  const chosesRoomsIds = await checkbox({
    message: 'Выберите чаты для экспорта',
    loop: false,
    required: true,
    choices: roomsInfo.map(({ roomId, roomName }) => ({ name: roomName, value: roomId })),
  });

  // const fetchedRoomsSettled =
  await Promise.allSettled(
    chosesRoomsIds.map((id) => {
      const { roomName } = rooms[id];

      return oraPromise(
        getAllMessagesFromRoom(rooms[id])
          .then((messages) => Object.values(normalizeMessagesByRoom(messages)).at(0)!)
          .then(async (room) => {
            const roomDumpFolder = path.join(DUMP_ROOM_PATH, room.roomName);

            secureSavingFileWIthHash(
              roomDumpFolder,
              `messages_count_${room.messages.length}`,
              'json',
              JSON.stringify(room.messages, null, 2),
            );

            return room;
          }),
        {
          text: `Получение чата ${roomName}`,
          failText: (error) => `Чат: ${roomName} ошибка ${error.message}`,
        },
      );
    }),
  );

  // TODO: Завершить
  // const fetchedRooms = fetchedRoomsSettled.reduce<TRoom[]>((acc, promise) => {
  //   if (promise.status === "fulfilled") acc.push(promise.value);
  //   return acc;
  // }, []);

  // await viewMessages(fetchedRooms)
};
