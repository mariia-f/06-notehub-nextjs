"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "lib/api";
import NoteList from "components/NoteList/NoteList";

export default function NotesClient({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  return <NoteList notes={data?.notes ?? []} />;
}
