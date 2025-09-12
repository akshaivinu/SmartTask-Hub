import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import { Plus } from "lucide-react";
import Task from "../components/Task";

const TaskPage = () => {
  const [isEdit, setIsEdit] = React.useState(true);
  const [tasks, setTasks] = useState([]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center">Tasks</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-[30px] lg:px-[100px]">
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => {
            const newTask = {
              title: `Task ${tasks.length + 1}`,
              description: "New task description",
              status: "pending",
            };
            setTasks([...tasks, newTask]);
          }}
        >
          <Plus size={16} />
          Add Task
        </button>

        {isEdit ? (
          <Task setIsEdit={setIsEdit} tasks={tasks} setTasks={setTasks} isEdit={isEdit} />
        ) : (
          <TaskItem isEdit={isEdit} setIsEdit={setIsEdit} tasks={tasks} />
        )}
      </div>
    </div>
  );
};

export default TaskPage;
