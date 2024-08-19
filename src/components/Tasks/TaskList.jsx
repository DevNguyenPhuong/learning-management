import { Button, Form, Input } from "antd";
import { useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";

function TaskList({ disabledFields }) {
  const [mutableDisabledFields, setMutableDisabledFields] =
    useState(disabledFields);

  function toggleDisabled(name) {
    console.log("called");
    setMutableDisabledFields((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  return (
    <Form.List name="tasks">
      {(fields, { add, remove, move }, { errors }) => (
        <>
          <Form.Item>
            <Button onClick={() => add()} icon={<HiOutlinePlus />}>
              Add task
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>

          <div className="h-[15rem] overflow-scroll no-scrollbar">
            {console.log(fields)}
            {console.log(mutableDisabledFields)}
            {fields.map((field) => (
              <Form.Item required={false} key={field.name}>
                <div className="flex gap-2 justify-center items-center w-full">
                  <HiOutlineCheckCircle
                    className={`hover:cursor-pointer size-5 transition-all duration-300 ${
                      mutableDisabledFields[field.name]
                        ? "text-green-700"
                        : "hover:text-green-700"
                    }`}
                    onClick={() => toggleDisabled(field.name)}
                  />
                  <Form.Item {...field} noStyle>
                    <Input
                      disabled={mutableDisabledFields[field.name]}
                      placeholder="New task"
                    />
                  </Form.Item>
                  <HiOutlineTrash
                    className="hover:cursor-pointer size-5 hover:text-red-700 transition-all duration-300"
                    onClick={() => {
                      remove(field.name);
                      setMutableDisabledFields((prev) => {
                        const { [field.name]: _, ...rest } = prev;
                        return rest;
                      });
                    }}
                  />
                </div>
              </Form.Item>
            ))}
          </div>
        </>
      )}
    </Form.List>
  );
}

export default TaskList;
