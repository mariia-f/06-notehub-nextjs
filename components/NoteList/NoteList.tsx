import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "lib/api";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[] | undefined | null;
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate: removeNote } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const safeNotes = Array.isArray(notes) ? notes : [];

  return (
    <ul className={css.list}>
      {safeNotes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <button className={css.button} onClick={() => removeNote(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
