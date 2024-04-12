import { select } from '@inquirer/prompts';
import { TRoom } from '../types.js';

// TODO: Завершить
export const viewMessages = async (rooms: TRoom[]): Promise<void> => {
  const choosesRoomIndex = await select({
    choices: rooms.map(({ roomName }, index) => ({ name: roomName, value: index })),
    message: 'Выберете комнату для просмотра сообщений',
  });

  await select({
    choices: rooms[choosesRoomIndex].messages.map(({ content, sender_full_name }, index) => ({
      name: `${sender_full_name}--${content}`,
      value: index,
    })),
    message: `Сообщения из комнаты ${rooms[choosesRoomIndex].roomName}`,
  });
};
