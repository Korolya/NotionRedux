import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../utils/useDebouce";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, getNotes } from "../redux/actions/notes";
import { SET_SELECTED_NOTE } from "../redux/constants";
export default function Notes() {
  const { user } = useSelector((state) => state.user);
  const { error, notes, selectedNote } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 200);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  function handleSearchInputChange(event) {
    setSearchText(event.target.value);
  }

  useEffect(() => {
    dispatch(getNotes(user.id));
  }, []);

  useEffect(() => {
    dispatch(getNotes(user.id, debouncedSearchText));
  }, [debouncedSearchText]);

  const handleDeleteConfirmation = (note) => {
    dispatch({ type: SET_SELECTED_NOTE, payload: note });
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    dispatch({ type: SET_SELECTED_NOTE, payload: null });
  };

  function handleDeleteNote() {
    dispatch(deleteNote(selectedNote.id));
    dispatch({ type: SET_SELECTED_NOTE, payload: null });
    setShowDeleteModal(false);
  }
  return (
    <>
      <h1 className="text-3xl text-center font-bold">Notes</h1>
      <div className="my-4">
        <input
          className="border border-black w-full p-2"
          type="text"
          placeholder="Search notes"
          value={searchText}
          onChange={handleSearchInputChange}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        {notes &&
          notes.map((note) => (
            <div key={note.id} className="my-4">
              <div className="flex items-center justify-between">
                <Link to={`${note.id}`}>
                  <div className="text-xl font-bold">{note.title}</div>
                  <div className="text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString("ru-RU")}
                  </div>
                </Link>
                <div>
                  <Link
                    to={`/edit-note/${note.id}`}
                    className="text-2xl ml-2 text-blue-500 hover:text-blue-600"
                    state={note}
                  >
                    ✍️
                  </Link>
                  <button
                    className="text-2xl ml-2"
                    onClick={() => handleDeleteConfirmation(note)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Link
        to="/create-note"
        className="mt-4 self-center border px-2 py-1 text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg"
      >
        Create New Note
      </Link>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold">Confirmation</h2>
            <p>Are you sure you want to delete this note?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleDeleteNote}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
