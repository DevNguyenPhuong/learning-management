import { Button } from "antd";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import CreateUpdateNoteModal from "../components/Notes/CreateUpdateNoteModal";
import NoteList from "../components/Notes/NoteList";

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
      <NoteList isOpenModal={open} closeModal={() => setOpen(false)} />
      <CreateUpdateNoteModal
        type="create"
        isOpenModal={open}
        onCloseModal={() => setOpen(false)}
      />
    </>
  );
}

export default Notes;
