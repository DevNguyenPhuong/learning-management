// import {
//   Bold,
//   Strikethrough,
//   Italic,
//   List,
//   ListOrdered,
//   Heading2,
// } from "lucide-react";
import { Toggle } from "@radix-ui/react-toggle";
import { theme } from "antd";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
} from "react-icons/ai";

function ToolBar({ editor }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
      className="border-b-1 p-4 flex gap-6 bg-transparent rounded-br-sm"
      style={{
        background: colorBgContainer,
        boxShadow:
          " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      }}
    >
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        className={`${
          editor.isActive("bold") ? "text-blue-500 hover:text-blue-600" : ""
        }`}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <AiOutlineBold className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        className={`${
          editor.isActive("italic") ? "text-blue-500 hover:text-blue-600" : ""
        }`}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <AiOutlineItalic className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        className={`${
          editor.isActive("strike") ? "text-blue-500 hover:text-blue-600" : ""
        }`}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <AiOutlineStrikethrough className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        className={`${
          editor.isActive("bulletList")
            ? "text-blue-500 hover:text-blue-600"
            : ""
        }`}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <AiOutlineUnorderedList className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        className={`${
          editor.isActive("orderedList")
            ? "text-blue-500 hover:text-blue-600"
            : ""
        }`}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <AiOutlineOrderedList className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

export default ToolBar;
