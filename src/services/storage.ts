// src/services/storage.ts
import type { User } from "../types/user";

const KEY_PREFIX = "lendsqr_user_";

export function saveUserLocal(user: User) {
  try {
    localStorage.setItem(KEY_PREFIX + user.id, JSON.stringify(user));
  } catch (e) {
    // ignore in test env
  }
}

export function getUserLocal(id: number): User | null {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + id);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    // If tests or other code stored an object of the form { "1": user, ... }
    // return parsed[id] when present.
    if (parsed && typeof parsed === "object") {
      // handle numeric/string keys
      if (Object.prototype.hasOwnProperty.call(parsed, String(id))) {
        return parsed[String(id)] as User;
      }
      if (Object.prototype.hasOwnProperty.call(parsed, id)) {
        return parsed[id] as User;
      }
      // if parsed already looks like a User (has fullName)
      if ("fullName" in parsed || "emailAddress" in parsed) {
        return parsed as User;
      }
    }

    return null;
  } catch (e) {
    // invalid JSON or other error -> treat as missing
    return null;
  }
}

export function removeUserLocal(id: number) {
  try {
    localStorage.removeItem(KEY_PREFIX + id);
  } catch (e) {
    // ignore
  }
}
