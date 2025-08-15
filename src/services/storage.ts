import type { User } from "../types/user";

const KEY_PREFIX = "lendsqr_user_";

export function saveUserLocal(user: User) {
  localStorage.setItem(KEY_PREFIX + user.id, JSON.stringify(user));
}

export function getUserLocal(id: number): User | null {
  const raw = localStorage.getItem(KEY_PREFIX + id);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function removeUserLocal(id: number) {
  localStorage.removeItem(KEY_PREFIX + id);
}
