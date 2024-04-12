import { Separator, select } from '@inquirer/prompts';
import { zulipDump } from './commands/zulipDump.js';
import { config as envInit } from 'dotenv';

async function main(): Promise<void> {
  const action = await select({
    message: 'Че делаем ?',
    choices: [
      {
        name: 'Выгружаем данные из зулипа',
        value: zulipDump,
        description: 'Найдем группы и чаты, а потом определимся что из них выгрузить',
      },
      {
        name: 'Выход',
        value: () => process.exit(1),
      },
      new Separator(),
      {
        name: 'Перекидываем в пачку выбранные чаты',
        value: async (): Promise<void> => {},
        disabled: '(Пока не реализовано)',
      },
    ],
  });

  await action();
}

envInit();
main();
