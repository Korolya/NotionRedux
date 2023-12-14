import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Home() {
  const navigate = useNavigate();
  const {
    user: { email, registrationDate },
  } = useSelector((state) => state.user);

  function handleGoToNotes() {
    navigate("/notes");
  }

  return (
    <>
      <h1 className="text-4xl text-center font-bold mt-8 mb-5">About</h1>
      <div className="flex flex-col gap-2 text-center">
        <span className="text-lg mt-7">
          <strong>Email:</strong> {email}
        </span>
        <span className="text-lg">
          <strong>Registration Date:</strong>{" "}
          {new Date(registrationDate).toLocaleDateString("ru-RU")}
        </span>
      </div>
      <button
        onClick={handleGoToNotes}
        className="mt-16 bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-2 px-4 rounded self-center"
      >
        Go to notes
      </button>
    </>
  );
}
