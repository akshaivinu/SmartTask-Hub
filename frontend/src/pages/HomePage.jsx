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

  return (
    <>
      <Navbar />
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
        />
      )}
    </>
  );
};

export default HomePage;
