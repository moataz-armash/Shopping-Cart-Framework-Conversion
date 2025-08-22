import { useEffect, useRef, useState } from "react";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/authContext";

export default function Login() {
  const { user, setUser, login } = useAuth();

  const userNameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    userNameRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
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
            setUser({ ...user, [e.target.id]: e.target.value });
          }}
        />

        <InputField
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => {
            setUser({ ...user, [e.target.id]: e.target.value });
          }}
        />
        <button
          className="m-auto w-[80%] bg-white font-cursive hover:opacity-[50%]"
          type="submit"
        >
          Sign in
        </button>

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
