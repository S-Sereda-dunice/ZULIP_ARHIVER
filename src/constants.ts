import path from 'path';

export const ZULIP_DOMAIN = 'https://tgn.intouch.space.dunice.net';
export const CSRF_SELECTOR = '[name="csrfmiddlewaretoken"]';

export const DUMP_DIR_PATH = 'dump/';
export const DUMP_ROOM_PATH = path.join(DUMP_DIR_PATH, 'rooms');
