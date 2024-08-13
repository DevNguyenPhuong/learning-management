import {
  HiCheck,
  HiCheckCircle,
  HiClock,
  HiMenu,
  HiOutlineCheckCircle,
  HiOutlineTrash,
  HiTrash,
} from "react-icons/hi";

function TaskList() {
  return (
    <div class="antialiased   mx-2">
      <div class="max-w-lg mx-auto my-10  p-8 rounded-xl shadow shadow-slate-300">
        <div class="flex flex-row justify-between items-center">
          <div>
            <h1 class="text-3xl font-medium">Tasks list</h1>
          </div>
          <div class="inline-flex space-x-2 items-center">
            <div
              href="#"
              class="p-2  rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-indigo-600 hover:bg-indigo-500"
            >
              <HiClock />
              <span class="text-sm font-medium hidden md:block">Urgent</span>
            </div>
            <div
              href="#"
              class="p-2  rounded-md inline-flex space-x-1 items-center "
            >
              <HiMenu />
              <span class="text-sm hidden md:block">Latest</span>
            </div>
          </div>
        </div>
        <p class="text-slate-500">Hello, here are your latest tasks</p>

        <div id="tasks" class="my-5">
          <div class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent">
            <div class="inline-flex items-center space-x-2">
              <div>
                <HiCheck className="w-6 h-6" />
              </div>
              <div class="text-slate-500 line-through">YT Intro remix</div>
            </div>
            <div>
              <HiOutlineTrash className="w-6 h-6" />
            </div>
          </div>

          <div class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent">
            <div class="inline-flex items-center space-x-2">
              <div>
                <HiCheck className="w-6 h-6" />
              </div>
              <div class="text-slate-500 line-through">YT Intro remix</div>
            </div>
            <div>
              <HiOutlineTrash className="w-6 h-6" />
            </div>
          </div>

          <div class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent ">
            <div class="inline-flex items-center space-x-2">
              <div>
                <HiOutlineCheckCircle className="w-6 h-6" />
              </div>
              <div>Magic stuff</div>
            </div>
            <div>
              <HiOutlineTrash className="w-6 h-6" />
            </div>
          </div>
        </div>
        <p class="text-xs text-slate-500 text-center">
          Last updated 12 minutes ago
        </p>
      </div>
    </div>
  );
}

export default TaskList;
