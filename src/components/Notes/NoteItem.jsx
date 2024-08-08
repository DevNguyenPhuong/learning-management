import { HiOutlineClock, HiOutlinePencil, HiOutlineStar } from "react-icons/hi";
import { theme } from "antd";

function NoteItem() {
  const {
    token: { colorText, colorBgContainer },
  } = theme.useToken();
  return (
    <div
      style={{
        color: colorText,
        background: colorBgContainer,
        boxShadow:
          " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      }}
      className="w-full h-64 flex flex-col justify-between   rounded-lg  mb-6 py-5 px-4"
    >
      <div>
        <h3 className="  leading-7 font-semibold w-11/12">
          What does success as a UX designer look like and how to get there
          systematically
        </h3>
      </div>
      <div>
        <div className="mb-3 flex items-center">
          <div
            className="border border-gray-300  rounded-full px-3 py-1  text-gray-600 text-xs flex items-center"
            aria-label="due on"
            role="contentinfo"
          >
            <HiOutlineClock />
            <p className="ml-2 ">7 Sept, 23:00</p>
          </div>
          <button
            className="p-1 bg-gray-800  rounded-full ml-2 text-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
            aria-label="save in starred items"
          >
            <HiOutlineStar />
          </button>
        </div>
        <div className="flex items-center justify-between text-gray-800">
          <p className=" text-sm">March 28, 2020</p>
          <button
            className="w-8 h-8 rounded-full  bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 "
            aria-label="edit note"
          >
            <HiOutlinePencil />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
