import { Empty, Result, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useGetTasks } from "../Schedule/useGetTasks";
import Task from "./Task";

function TasksList() {
  const { scheduleId } = useParams();
  const { tasks, isLoading, error } = useGetTasks(scheduleId);

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

  if (tasks.length === 0)
    return (
      <>
        <div className=" flex flex-col h-[60vh]  justify-center">
          <Empty />
        </div>
      </>
    );

  return (
    <>
      <div className=" container py-5 px-2 ">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {tasks.map((item) => (
            <Task key={item.id} task={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TasksList;
