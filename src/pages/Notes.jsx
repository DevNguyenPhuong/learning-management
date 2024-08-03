import { Button } from "antd";
import NoteList from "../components/Notes/NoteList";
import { HiOutlinePlus } from "react-icons/hi";

function Notes() {
  return (
    <>
      <Button type="primary" className="mt-2 ml-2 " icon={<HiOutlinePlus />}>
        Add note
      </Button>
      <NoteList />
    </>
  );
}

export default Notes;
