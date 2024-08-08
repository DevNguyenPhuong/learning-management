import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { theme } from "antd";
import ToolBar from "./ToolBar";

function TipTap({ note, onChange }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    content: note,
    editorProps: {
      attributes: {
        class:
          "overflow-y-scroll no-scrollbar leading-5 rounded-mb p-4  [&_ul]:list-disc [&_ol]:list-decimal h-[200px] [&_ul]:pl-4 [&_ol]:pl-4 ",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div
      className="rounded-md text-left flex flex-col justify-stretch "
      style={{
        background: colorBgContainer,
        boxShadow:
          " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      }}
    >
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTap;
