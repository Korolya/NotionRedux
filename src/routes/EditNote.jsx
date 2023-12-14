import { useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Navigate,
  useNavigate,
  Link,
  useParams,
} from "react-router-dom";
import { editNote } from "../redux/actions/notes";

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
  error: state.notes.error,
});
const mapDispatchToProps = (dispatch) => ({
  editNote: (editedNote, id) => dispatch(editNote(editedNote, id)),
  setError: (error) =>
    dispatch({
      type: GET_NOTES_FAILURE,
      payload: error,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
function EditNote({ notes, error, editNote, setError }) {
  const params = useParams();
  if (!notes.length) return <Navigate to="/notes" replace />;
  const note = useMemo(
    () => notes.find((note) => note.id === +params.id),
    [params, notes]
  );
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const validateForm = () => {
    if (title.trim() === "") {
      setError("Введите название заметки");
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
        userId: note.userId,
      };
      editNote(newNote, note.id);
      if (!error) {
        navigate("/notes");
      }
    }
  };

  return (
    <>
      <h1
        style={{
          marginBottom: "1rem",
          fontWeight: "bold",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        Edit Note
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "1rem", textAlign: "center" }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title" style={{ fontWeight: "bold" }}>
            Note Title:
          </label>
          <br />
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            style={{
              marginLeft: "0.5rem",
              border: "1px solid #ccc",
              padding: "0.5rem",
              borderRadius: "0.25rem",
            }}
          />
        </div>
        {error && (
          <div
            className="text-red-500"
            style={{
              marginBottom: "1rem",
              marginLeft: "0.5rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="body" style={{ fontWeight: "bold" }}>
            Note body:
          </label>
          <br />
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            style={{
              marginLeft: "0.5rem",
              border: "1px solid #ccc",
              padding: "0.5rem",
              borderRadius: "0.25rem",
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </form>
      <Link
        to="/notes"
        className="text-blue-500 underline font-bold text-center block"
      >
        Back
      </Link>
    </>
  );
}
