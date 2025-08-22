import { useEffect, useRef, useState } from "react";
import InputField from "../components/InputField";

export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const userNameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    userNameRef.current?.focus();
  }, []);
  const getUserName = localStorage.getItem("userName");
  const getPassword = localStorage.getItem("password");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.userName === "" || formData.password === "") {
      alert("Fill Your Data");
    } else {
      if (
        formData.userName &&
        getUserName?.trim() === formData.userName.trim() &&
        formData.password &&
        getPassword?.trim() &&
        formData.password.trim()
      ) {
        localStorage.setItem("userName", formData.userName);
        localStorage.setItem("password", formData.password);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        alert("not valid");
      }
    }
  };

  return (
    <section className="absolute left-1/2 top-1/2 w-[50%] translate-x-[-50%] translate-y-[-50%] bg-tahiti p-8 text-center">
      <h2 className="letter text-[50px] font-semibold tracking-wide text-white">
        Login User
      </h2>

      <form
        className="mt-2 flex flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <InputField
          type="text"
          placeholder="Name"
          id="userName"
          ref={userNameRef}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.id]: e.target.value });
          }}
        />

        <InputField
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => {
            setFormData({ ...formData, [e.target.id]: e.target.value });
          }}
        />
        <button
          className="font-cursive m-auto w-[80%] bg-white hover:opacity-[50%]"
          type="submit"
        >
          Sign in
        </button>
        {/* <input type="text" placeholder="Enter User Name" id="userName" /> */}
        {/* <input type="email" placeholder="Enter User Email" id="email" /> */}
        {/* <input
          type="password"
          placeholder="Enter User password"
          id="password"
        /> */}
        {/* <input type="submit" value="Sign up" id="signUP" /> */}
        <div className="flex">
          Have Already Account?{" "}
          <a href="/register" className="text-light text-white">
            Register
          </a>
        </div>
      </form>
    </section>
  );
}
