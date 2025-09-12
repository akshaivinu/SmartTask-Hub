import React, { useRef, useState } from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import { CancelIcon, MenuIcon } from "../../public/svg/MenuIcon";


const menuVariants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
}

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);

  return (
    <>
      <nav className="items-center h-20 w-full flex justify-between text-[16px] px-5 md:px-18 container mx-auto select-none">
          <h1 className="font-bold">Task Manager</h1>
          <div className="hidden md:flex">
            <ul className="flex flex-row gap-8">
              <li className="cursor-pointer hover:scale-110 power-in-out duration-300">Home</li>
              <li className="cursor-pointer hover:scale-110 power-in-out duration-300">Tasks</li>
            </ul>
          </div>
          <div className="hidden md:flex">
            <Button ref={buttonRef} variant="ghost" onClick={() => {}}>Logout</Button>
        </div>
        <div className="md:hidden">
            <span className="cursor-pointer group" onClick={() => setOpen(!open)}>{!open ? <MenuIcon /> : <CancelIcon /> }</span>
            {open && (
              <motion.div
              initial = {"closed"}
              animate= {"open"}
              exit={"closed"}
              variants={menuVariants}
               className="absolute w-[150px] h-[200px] bg-black/50 right-[66px] rounded z-50">
                <ul className="flex flex-col text-white pt-10 gap-4">
                    <li className="cursor-pointer w-full flex items-center justify-center hover:bg-white hover:text-black transition ease-in-out duration-300">Home</li>
                    <li className="cursor-pointer w-full flex items-center justify-center hover:bg-white hover:text-black">Tasks</li>
                    <li className="cursor-pointer w-full flex items-center justify-center hover:bg-white hover:text-black">Logout</li>
                </ul>
            </motion.div>)}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
