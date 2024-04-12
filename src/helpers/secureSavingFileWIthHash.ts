import fs from 'fs';
import fsP from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const secureSavingFileWIthHash = async (
  dir: string,
  fileName: string,
  ext: string,
  data: string,
): Promise<void> => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const hash = crypto.createHash('sha256').update(data, 'utf8').digest('hex');
  const filePath = path.join(dir, `${fileName}__${hash}.${ext}`);

  if (fs.existsSync(filePath)) return;

  await fsP.writeFile(filePath, data, { encoding: 'utf8' });
};
