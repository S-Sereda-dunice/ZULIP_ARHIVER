export type TResWithMessages = {
  anchor: TReqMessage['id'];
  found_anchor: boolean;
  found_newest: boolean;
  found_oldest: boolean;
  history_limited: boolean;
  messages: TReqMessage[];
};

export type TMessageFlag = 'read';

export type TRecipient =
  | string
  | number
  | Array<{
      id: number;
      email: string;
      full_name: string;
      is_mirror_dummy: boolean;
    }>;

export type TReqMessage = {
  id: number;
  sender_id: number;
  content: string;
  recipient_id: number;
  timestamp: number;
  client: string;
  subject: string;
  topic_links: unknown[];
  is_me_message: boolean;
  reactions: unknown[];
  submessages: unknown[];
  flags: TMessageFlag[];
  sender_full_name: string;
  sender_email: string;
  sender_realm_str: string;
  display_recipient: TRecipient;
  type: 'stream' | 'private';
  stream_id?: number;
  avatar_url: string;
  content_type: 'text/html';
};

export type TRoom = {
  roomName: string;
  messages: TReqMessage[];
};

export type TRoomsById = {
  [roomId: number]: TRoom;
};
