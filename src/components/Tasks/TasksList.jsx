import Task from "./Task";

function TasksList() {
  return (
    <>
      <div className="mx-auto container py-5 px-2 lg:px-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Task />
          <Task />
          <Task />
          <Task />
        </div>
      </div>
    </>
  );
}

export default TasksList;
