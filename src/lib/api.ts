import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

/**
 * NOTES LIST
 */
export const fetchNotes = async (
  page: number,
  search: string = ""
): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
    },
  });

  return data;
};

/**
 * SINGLE NOTE
 */
export const fetchNote = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

/**
 * CREATE NOTE
 */
export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const { data } = await instance.post<Note>("/notes", note);
  return data;
};

/**
 * DELETE NOTE
 */
export const deleteNote = async (id: string): Promise<void> => {
  await instance.delete(`/notes/${id}`);
};