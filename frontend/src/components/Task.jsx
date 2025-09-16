import React from "react";
import taskService from "../services/taskService";
import LoadingSpinner from "./LoadingSpinner";

const Task = ({ isEdit, setIsEdit, tasks, setTaskId, setTasks, isLoading, setDisabled, disabled }) => {
  return (
    <>
    { isLoading ? 
    <div className="flex w-screen h-screen justify-center items-center">
      <LoadingSpinner />
    </div>  
    : 
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-[30px] lg:px-[100px]">
        {tasks?.map((task) => (
          <div
            key={task._id || task.id}
            className="bg-slate-400 p-4 h-auto w-auto rounded"
          >
            <p className="md:text-2xl text-lg font-bold text-center">
              {task.title}
            </p>
            <p className=" text-center mt-2 text-xs p-1 md:text-[16px]">
              {task.description}{" "}
            </p>
            <div className="flex justify-between mt-4 md:mt-8 px-5 md:px-0 w-full">
              <div className="">
                <select
                  name=""
                  id=""
                  value={task.status}
                  className="border-2 rounded text-xs p-1 md:text-[16px] cursor-pointer"
                  onChange={async (e) => {
                    const newStatus = e.target.value;

                    setTasks((prev) =>
                      prev.map((t) =>
                        t._id === task._id ? { ...t, status: newStatus } : t
                      )
                    );

                    try {
                      await taskService.editTask({
                        _id: task._id,
                        title: task.title,
                        description: task.description,
                        status: newStatus,
                      });
                    } catch (error) {
                      console.log("error", error.message);
                      const refreshedTasks = await taskService.getTasks();
                      setTasks(refreshedTasks);
                    }
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In-progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex flex-row items-center">
                <button 
                disabled={disabled}
                  className={`mr-2 text-red-600 text-xs p-1 md:text-[16px] cursor-pointer hover:scale-110 duration-300 power-in-out ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setTaskId(task._id);
                  }}
                >
                  Edit
                </button>
                <button
                  className={`mr-2 text-red-600 text-xs p-1 md:text-[16px] cursor-pointer hover:scale-110 duration-300 power-in-out ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={disabled}
                  onClick={async () => {
                    await taskService.deleteTask(task._id);
                    const updatedTasks = await taskService.getTasks();
                    setTasks(updatedTasks);
                  }}

                >
                  Delete
                </button>
                <input type="checkbox" defaultChecked={task.status === "completed"} name="complete" className="mr-1"
                {...task.status === "completed" ? { checked: true } : { checked: false }}
                onClick={async (e) => {
                  const newStatus = e.target.checked ? "completed" : "pending";
                  
                  setTasks((prev) =>
                    prev.map((t) =>
                      t._id === task._id ? { ...t, status: newStatus } : t
                    )
                  );
                  try {
                    await taskService.editTask({
                      _id: task._id,
                      title: task.title,
                      description: task.description,
                      status: newStatus,
                    });
                  } catch (error) {
                    console.log("error", error.message);
                    const refreshedTasks = await taskService.getTasks();
                    setTasks(refreshedTasks);
                  }
                }}/>
                <label htmlFor="" className="text-xs p-1 md:text-[16px]">
                  Mark as completed
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>}
      
    </>
  );
};

export default Task;
