import type { User } from '../../reducers/users';

const dragTag = Symbol('waitlist drag');
const dropTag = Symbol('waitlist drop');

export type WaitlistDrag = {
  user: User,
};
export type WaitlistDrop = {
  position: number,
};

export function createWaitlistDrag(data: WaitlistDrag): Record<string, unknown> {
  return Object.assign(data, { type: dragTag });
}

export function isWaitlistDrag(data: Record<string, unknown>): data is WaitlistDrag {
  return data.type === dragTag;
}

export function createWaitlistDrop(data: WaitlistDrop): Record<string, unknown> {
  return Object.assign(data, { type: dropTag });
}

export function isWaitlistDrop(data: Record<string, unknown>): data is WaitlistDrop {
  return data.type === dropTag;
}
