import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Note() {
  const [note, setNote] = useState([]);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const handleDeleteConfirmation = (note) => {
    setSelectedNote(note);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedNote(null);
  };

  function handleDeleteNote() {
    fetch(`http://localhost:5001/notes/${selectedNote.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setShowDeleteModal(false);
          setSelectedNote(null);
          navigate("/notes"); // Перенаправление на страницу "notes" после удаления
        } else {
          console.log("Ошибка при удалении заметки");
        }
      })
      .catch((error) => console.error("Ошибка при удалении заметки:", error));
  }

  useEffect(() => {
    fetch(`http://localhost:5001/notes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw "";
          return;
        }
        return res.json();
      })
      .then((note) => {
        if (note.userId !== user.id) throw "";
        setNote(note);
      })
      .catch((error) => navigate("/notes"));
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Link
          to={"/notes"}
          style={{
            color: "#4F46E5",
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: "1.3rem",
          }}
        >
          Back
        </Link>
        <div>
          <Link
            to={`/edit-note/${note.id}`}
            state={note}
            style={{
              color: "#4F46E5",
              textDecoration: "none",
              marginRight: "1rem",
              fontSize: "1.5rem",
            }}
          >
            ✍️
          </Link>
          <button
            onClick={() => handleDeleteConfirmation(note)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      <div
        style={{
          marginBottom: "1rem",
          textAlign: "center",
          padding: "0.5rem",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        {note.title}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "0.5rem",
            width: "500px",
            height: "200px",
          }}
        >
          {note.body}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2
              className="text-lg font-bold"
              style={{ marginBottom: "1rem", textAlign: "center" }}
            >
              Confirmation
            </h2>
            <p style={{ marginBottom: "1rem", textAlign: "center" }}>
              Are you sure you want to delete this note?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
