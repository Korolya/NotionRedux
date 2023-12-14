import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User } from "../utils/validation";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/user";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const err = useSelector((state) => state.user?.error);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const newUser = User.parse({
        email,
        password,
        registrationDate: new Date().toISOString(),
      });

      if (password !== confirmPassword) {
        setError(["Passwords do not match"]);
        return;
      }
      dispatch(registerUser(newUser));
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(Object.values(error)[0].map((error) => error.message));
      } else {
        setError(error);
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="prose flex flex-col gap-5 w-2/3">
        <h1 className="text-4xl font-bold text-center">Register</h1>
        <input
          className="border border-gray-300 p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border border-gray-300 p-2 rounded"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleRegister}
        >
          Register
        </button>
        {error.length > 0 && (
          <div className="text-red-500">
            {error.map((x) => (
              <div key={x}>{x}</div>
            ))}
          </div>
        )}
        {err && <div className="text-red-500">{err}</div>}
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
