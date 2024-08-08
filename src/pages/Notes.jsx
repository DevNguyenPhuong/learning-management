import { Button } from "antd";
import NoteList from "../components/Notes/NoteList";
import { HiOutlinePlus } from "react-icons/hi";
import { useState } from "react";
import CreateNoteModal from "../components/Notes/CreateNoteModal";

function Notes() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        className="mt-2 ml-2 "
        icon={<HiOutlinePlus />}
        onClick={() => setOpen(!open)}
      >
        Add note
      </Button>
      <NoteList />
      <CreateNoteModal isOpenModal={open} closeModal={() => setOpen(false)} />
    </>
  );
}

export default Notes;
