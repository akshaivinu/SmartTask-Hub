import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { Plus } from "lucide-react";
import Task from "../components/Task";
import taskService from "../services/taskService";
import Navbar from "../components/Navbar";

const TaskPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await taskService.getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);


  useEffect(() => {
    if (!taskId) return;
    taskService.getTask(taskId).then((res) => {
      setSelectedTask(res);
      setIsEditing(true);
    });
  }, [taskId]);

  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center">Tasks</h1>
      <div className="">
        <button
          className={`${isEditing ? "hidden" : ""} flex items-center gap-2 absolute right-8 top-38 md:right-25 md:top-35  bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition`}
          onClick={async () => {
            const newTask = {
              title: `Task ${tasks.length + 1}`,
              description: "New task description",
              status: "pending",
            };
            await taskService.createTask(newTask);
            const updated = await taskService.getTasks();
            setTasks(updated);
          }}
        >
          <Plus size={16} />
          Add Task
        </button>

        {isEditing ? (
          <TaskItem
            key={selectedTask?._id}
            isEdit={isEditing}
            setIsEditing={setIsEditing}
            selectedTask={selectedTask}
            setTasks={setTasks}
          />
        ) : (
          
          <Task
            setIsEdit={setIsEditing}
            tasks={tasks}
            setTasks={setTasks}
            setTaskId={setTaskId}
            isLoading={isLoading}
            setDisabled={setDisabled}
            disabled={disabled}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default TaskPage;
