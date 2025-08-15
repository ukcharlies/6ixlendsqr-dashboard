import type { User } from "../types/user";

export async function fetchAllUsers(): Promise<User[]> {
  const res = await fetch("/mock/users.json"); // ensure file path matches
  if (!res.ok) throw new Error("Failed to load users.json");
  return res.json();
}

export async function fetchUserById(id: number): Promise<User | null> {
  const users = await fetchAllUsers();
  return users.find((u) => u.id === id) ?? null;
}
