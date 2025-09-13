import React, { useRef, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const buttonRef = useRef(null);

  const { mutate: login } = useLogin();

 
  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password});
  };

  return (
    <div>
      <div className="w-[300px] h-[500px] mx-auto mt-30">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form action="" className="flex flex-col gap-8 pt-10">
          <div className="flex gap-4">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="flex-1 border-b focus:outline-none"
              placeholder="enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="flex-1 border-b focus:outline-none"
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            ref={buttonRef}
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            <Link to="/signup"> Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
