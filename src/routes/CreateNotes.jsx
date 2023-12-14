import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "../redux/actions/notes";
import { GET_NOTES_FAILURE, GET_USER_FAILURE } from "../redux/constants";
export default function CreateNotes() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { error } = useSelector((state) => state.notes);
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const {
    user: { id },
  } = useSelector((state) => state.user);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const validateForm = () => {
    if (title.trim() === "") {
      dispatch({
        type: GET_NOTES_FAILURE,
        payload: "Введите название заметки",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const newNote = {
        title,
        body,
        createdAt: new Date().toISOString(),
        userId: id,
      };
      dispatch(addNote(newNote));
      if (!error) {
        navigate("/notes");
      }
    }
  };

  const handleBackClick = () => {
    navigate("/notes");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Note</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2">
            Note Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className={`border rounded-md px-3 py-2 ${
              error ? "border-red-500" : ""
            }`}
          />
          {error && <div className="text-red-500 mt-1">{error}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block font-medium mb-2">
            Note body:
          </label>
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            className="border rounded-md px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create
        </button>
      </form>
      <button
        onClick={handleBackClick}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
      >
        Back
      </button>
    </div>
  );
}
