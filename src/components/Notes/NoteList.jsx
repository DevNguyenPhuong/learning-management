import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";
import { useGetNotes } from "./useGetNotes";
import { Empty, Result, Spin } from "antd";

import { useState } from "react";

function NoteList({ onOpenModal, onCloseModal }) {
  const { id } = useSelector((store) => store.user);
  const { notes, isLoading, error } = useGetNotes(id);
  const [currentNoteData, setCurrentNoteData] = useState();
  const [open, setOpen] = useState(false);

  function handleUpdate(currentNote) {
    setCurrentNoteData({ ...currentNote });
    setOpen(!open);
    console.log(currentNoteData);
  }

  if (isLoading)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Spin tip="Loading data" size="large">
          <div></div>
        </Spin>
      </div>
    );

  if (error)
    return (
      <Result
        className="mt-8"
        status="error"
        title="Cannot load data"
        subTitle="Plz check your internet connection and try again!"
      ></Result>
    );

  if (notes.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty />
      </div>
    );

  return (
    <>
      <div className="container py-5 px-2 ">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map((item) => (
            <NoteItem
              key={item.id}
              {...item}
              openModal={onOpenModal}
              closeModal={onCloseModal}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default NoteList;
