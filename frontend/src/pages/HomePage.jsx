import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Task from "../components/Task";
import taskService from "../services/taskService";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("all");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await taskService.getTasks();
        const filteredData = status === "all" ? data : data.filter((task) => task.status === status);
        setTasks(filteredData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [status]);

  

  return (
    <>
      <Navbar />
      <div className="mt-20 ">
        <div className="px-10 md:px-25">
          <select name="" id=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-2 py-1 border-2 rounded cursor-pointer"
            >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>

          </select>
        </div>
      {isLoading ? (
        <div className="w-screen flex justify-center items-center h-screen">
          {" "}
          <LoadingSpinner />{" "}
        </div>
      ) : (
        <Task
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          tasks={tasks}
          setTaskId={setTaskId}
          setTasks={setTasks}
          disabled={disabled}
          setDisabled={setDisabled}
        />
      )}
      </div>
    </>
  );
};

export default HomePage;
