import { Button } from "antd";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineStar, HiStar } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import CreateUpdateNoteModal from "../components/Notes/CreateUpdateNoteModal";
import NoteList from "../components/Notes/NoteList";

function Notes() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isFilterBookmarks = searchParams.get("filter") === "bookmarks";

  function handleBookmark() {
    const currentFilter = searchParams.get("filter");

    if (currentFilter === "bookmarks") {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", "bookmarks");
    }

    setSearchParams(searchParams);
  }

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
      <Button
        type="primary"
        className="mt-2 ml-2 "
        icon={isFilterBookmarks ? <HiStar /> : <HiOutlineStar />}
        onClick={handleBookmark}
      >
        Bookmark
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
