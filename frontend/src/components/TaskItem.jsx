import React, { useEffect, useRef, useState } from "react";
import taskService from "../services/taskService";

const TaskItem = ({ setIsEditing, selectedTask: task, setTasks }) => {
  const inputRef = useRef(null);

  const [editedTask, setEditedTask] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "pending",
  });

  useEffect(() => {
    if (task) {
      setEditedTask({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
      });
    }
  }, [task]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editedTask.title.trim() || !editedTask.description.trim()) {
      alert("Title and description cannot be empty");
      return;
    }

    await taskService.editTask({
      id: task._id,
      title: editedTask.title,
      description: editedTask.description,
      status: editedTask.status,
    });
    const updatedTask = await taskService.getTasks();
    setTasks(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto">
      <form className="bg-slate-400 p-4 rounded" onSubmit={handleSave}>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          ref={inputRef}
          className="w-full text-lg md:text-2xl font-bold text-center focus:outline-black"
          placeholder="Enter your task title here..."
        />
        <input
          type="text"
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          className="w-full mt-2 text-center text-xs p-1 md:text-[16px]"
          placeholder="Enter your task description here..."
        />
        <div className="flex justify-between mt-4 md:mt-8 px-5">
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="border-2 rounded md:p-1 text-xs p-1 md:text-[16px]"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="mr-2 text-blue-500 cursor-pointer hover:scale-110 duration-300"
            >
              Save
            </button>
            <button
              type="button"
              className="mr-2 text-red-600 cursor-pointer hover:scale-110 duration-300"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskItem;
