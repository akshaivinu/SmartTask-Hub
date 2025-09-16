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
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await taskService.getTasks();
        const filteredData = status === "all" ? data : data.filter((task) => task.status === status); 
        const sortedTask = [...filteredData].sort((a, b) => {
          if (sortOrder === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }
        })
        setTasks(sortedTask);

        if(searchQuery) {
          const filteredTasks = sortedTask.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
          setTasks(filteredTasks);
        }

      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [status, sortOrder, searchQuery]);

  

  return (
    <>
      <Navbar />
      <div className="mt-20 ">
        <div className="px-10 md:px-25 flex gap-5 justify-between">
          <div className="flex gap-5">
          <div>
          <select name="" id=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-2 py-1 border-1 rounded cursor-pointer"
            >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          </div>
          <div>
            <select name="" id=""
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-2 py-1 border-1 rounded cursor-pointer"
            >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          </div>
          </div>
          <div>
            <form action="">
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-1 border-1 rounded"
                placeholder="Search by title"
              />
            </form>
          </div>
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
