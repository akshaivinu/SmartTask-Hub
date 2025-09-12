import React, { useEffect, useRef } from "react";

const TaskItem = ({ isEdit, setIsEdit, task }) => {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

  return (
    <div className="container mx-auto">
      <div>
        <div className="">
          <form className="bg-slate-400 p-4 h-auto w-auto rounded">
            <input
              type="text"
              className="w-full text-lg md:text-2xl font-bold text-center focus:outline-black"
              defaultValue={task ? task.title: "" }
              ref={inputRef}
              placeholder="Enter your task title here..."
            />
            <input
              type="text"
              className="w-full mt-2 text-center text-xs p-1 md:text-[16px]"
              defaultValue={ task ? task.title :
                "Lorem ipsum dolor sit amet consectetur adipisicing elit."
              }
              placeholder="Enter your task description here..."
            />
            <div className="flex justify-between mt-4 md:mt-8 px-5">
              <div className="">
                <select name="" id="" className="border-2 rounded md:p-1 text-xs p-1 md:text-[16px]">
                  <option value="pending">Pending</option>
                  <option value="in-progress">In-progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs p-1 md:text-[16px]">
                <button className="mr-2 text-blue-500 cursor-pointer hover:scale-110 duration-300 power-in-out">Save</button>
                <button className="mr-2 text-red-600 cursor-pointer hover:scale-110 duration-300 power-in-out" onClick={() => {
                    setIsEdit(!isEdit)}
                    
                    }>Cancel</button></div>
                <div className="hidden">
                  <p className="text-red-700 text-xs">error</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
