import { useEffect, useRef, useState } from "react";
import InputField from "../components/InputField";

export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const userNameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    userNameRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.userName === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      alert("please Fill The Empty");
    } else {
      localStorage.setItem("userName", formData.userName);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("password", formData.password);
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  return (
    <section className="absolute left-1/2 top-1/2 w-[50%] translate-x-[-50%] translate-y-[-50%] bg-tahiti p-8 text-center">
      <h2 className="letter text-[50px] font-semibold tracking-wide text-white">
        Register User
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
          type="email"
          placeholder="Email"
          id="email"
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
          Sign up
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
          <a href="/login" className="text-light text-white">
            Login
          </a>
        </div>
      </form>
    </section>
  );
}
