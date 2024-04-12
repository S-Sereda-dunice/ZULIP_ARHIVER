import { getMessages } from './getMessages.js';
import { TResWithMessages } from '../../types.js';

export const getNewestInHome = async (): Promise<TResWithMessages> =>
  getMessages({
    anchor: 'newest',
    num_before: 400,
    num_after: 0,
    narrow: { negated: true, operator: 'in', operand: 'home' },
  });
