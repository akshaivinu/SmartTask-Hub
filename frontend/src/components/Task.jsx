import React from 'react'

const Task = ({isEdit, setIsEdit}) => {
  return (
    <>
    <div className="">
            <div className="bg-slate-400 p-4 h-auto w-auto rounded">
              <p className="md:text-2xl text-lg font-bold text-center">
                Task 1
              </p>
              <p className=" text-center mt-2 text-xs p-1 md:text-[16px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              </p>
              <div className="flex justify-between mt-4 md:mt-8 px-5 md:px-0 w-full">
                <div className="">
                  <select
                    name=""
                    id=""
                    className="border-2 rounded text-xs p-1 md:text-[16px] cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="flex flex-row items-center">
                  <button
                    className="mr-2 text-red-600 text-xs p-1 md:text-[16px] cursor-pointer hover:scale-110 duration-300 power-in-out"
                    onClick={() => {
                      setIsEdit(!isEdit);
                    }}
                  >
                    Edit
                  </button>
                  <button className="mr-2 text-red-600 text-xs p-1 md:text-[16px] cursor-pointer hover:scale-110 duration-300 power-in-out">
                    Delete
                  </button>
                  <input type="checkbox" name="complete" className="mr-1" />
                  <label htmlFor="" className="text-xs p-1 md:text-[16px]">
                    Mark as completed
                  </label>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default Task