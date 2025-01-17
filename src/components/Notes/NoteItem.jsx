import { theme } from "antd";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  HiOutlineClock,
  HiOutlinePencil,
  HiOutlineStar,
  HiStar,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import CreateUpdateNoteModal from "./CreateUpdateNoteModal";
import { useDeleteNote } from "./useDeleteNote";
import { useCreateUpdateNote } from "./useCreateUpdateNote";

function NoteItem({ note }) {
  const { id, title, content, bookmarked, date, time, onUpdate } = note;

  const { deleteNote, isPending } = useDeleteNote();
  const { mode } = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const { createUpdateNote, isPendingUpdate } = useCreateUpdateNote();

  function handleDelete() {
    deleteNote(id);
  }
  function handleBookMark() {
    createUpdateNote({
      note: {
        id,
        title,
        content,
        date,
        time,
        onUpdate,
        bookmarked: !bookmarked,
      },
      type: "update",
      updateNoteId: id,
    });
  }

  function handleUpdate() {
    setOpen(!open);
  }
  const {
    token: { colorText },
  } = theme.useToken();
  return (
    <>
      <div
        style={{
          color: colorText,
          background: `${mode === "dark" ? "#18181b" : "#f4f4f5"}`,
          boxShadow:
            " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
        }}
        className="w-full h-64 flex flex-col justify-between   rounded-lg  mb-6 py-5 px-4 relative"
      >
        <button
          disabled={isPending || isPendingUpdate}
          className="absolute right-2 top-2"
          onClick={handleDelete}
        >
          <FaTimes className="hover:cursor-pointer hover:text-red-500 transition-all duration-300" />
        </button>
        <div>
          <h3 className="mt-2 text-center sm:text-sm md:text-md lg:text-xl leading-7 overflow-hidden font-bold w-11/12 break-all">
            {title?.length > 40 ? `${title.substring(0, 40)}...` : title}
          </h3>
        </div>
        <p
          className="overflow-hidden font-semibold w-11/12 break-all text-ellipsis"
          dangerouslySetInnerHTML={{
            __html:
              content?.length > 100
                ? `${content.substring(0, 100)}...`
                : content,
          }}
        ></p>
        <div>
          <div className="mt-3 mb-3 flex items-center">
            <div
              className="border border-gray-300  rounded-full px-3 py-1  text-gray-600 text-xs flex items-center"
              aria-label="due on"
              role="contentinfo"
            >
              <HiOutlineClock />
              <p className="ml-2 "> {time}</p>
            </div>
            <button
              className="p-1 bg-gray-800  rounded-full ml-2 text-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
              aria-label="save in starred items"
              onClick={handleBookMark}
              disabled={isPending || isPendingUpdate}
            >
              {bookmarked ? <HiStar /> : <HiOutlineStar />}
            </button>
          </div>
          <div className="flex items-center justify-between text-gray-800">
            <p className=" text-sm">{date}</p>
            <button
              className="w-8 h-8 rounded-full  bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 "
              aria-label="edit note"
              onClick={handleUpdate}
            >
              <HiOutlinePencil />
            </button>
          </div>
        </div>
      </div>

      <CreateUpdateNoteModal
        isOpenModal={open}
        onCloseModal={() => setOpen(false)}
        currentNoteData={{
          id,
          title,
          content,
          bookmarked,
          date,
          time,
        }}
        type="update"
      />
    </>
  );
}

export default NoteItem;
