import { HiCheck, HiOutlineCheckCircle, HiOutlineTrash } from "react-icons/hi";

function TaskItem({ isChecked, content }) {
  if (isChecked)
    return (
      <div className="flex justify-between items-center   py-3 px-2 ">
        <div className="inline-flex items-center space-x-2">
          <div>
            <HiCheck className="w-6 h-6" />
          </div>
          <div className="text-slate-500 line-through">YT Intro remix</div>
        </div>
        <div>
          <HiOutlineTrash className="w-6 h-6" />
        </div>
      </div>
    );

  return (
    <div className="flex justify-between items-center   py-3 px-2  bg-gradient-to-r from-transparent to-transparent ">
      <div className="inline-flex items-center space-x-2">
        <div>
          <HiOutlineCheckCircle className="w-6 h-6" />
        </div>
        <div>Magic stuff</div>
      </div>
      <div>
        <HiOutlineTrash className="w-6 h-6" />
      </div>
    </div>
  );
}

export default TaskItem;
