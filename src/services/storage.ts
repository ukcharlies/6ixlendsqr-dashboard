// src/services/storage.ts
import type { User } from "../types/user";

const KEY_PREFIX = "lendsqr_user_";

/**
 * Save a single user under a namespaced key (lendsqr_user_<id>)
 */
export function saveUserLocal(user: User) {
  try {
    localStorage.setItem(KEY_PREFIX + user.id, JSON.stringify(user));
  } catch (e) {
    // ignore (tests expect we don't throw)
    /* eslint-disable no-console */
    if (process.env.NODE_ENV === "development")
      console.error("saveUserLocal:", e);
    /* eslint-enable no-console */
  }
}

/**
 * Retrieve a user by id.
 *
 * Accepts multiple stored shapes so tests and older code work:
 * - JSON.stringify(user) where the stored object is the user itself
 * - JSON.stringify({ "1": user, ... }) where users are stored in a map
 *
 * On parse errors or missing data it returns null (does not throw).
 */
export function getUserLocal(id: number): User | null {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + id);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // If storage contains a map keyed by id: { "1": user, ... }
    if (parsed && typeof parsed === "object") {
      // prefer keyed value when present
      const keyed = parsed[String(id)];
      if (keyed !== undefined) {
        return keyed as User;
      }

      // otherwise, assume parsed object is the user itself (tests often use small shapes)
      return parsed as User;
    }

    return null;
  } catch (e) {
    // invalid JSON or other error -> treat as missing (do not throw)
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
