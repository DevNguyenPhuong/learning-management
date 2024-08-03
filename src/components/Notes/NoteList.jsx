import NoteItem from "./NoteItem";

function NoteList() {
  return (
    <div class="mx-auto container py-5 px-2 lg:px-6">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
      </div>
    </div>
  );
}

export default NoteList;
