import Api from "../../utils/api"
import { DELETE_NOTE, GET_NOTES_FAILURE, GET_NOTES_START, GET_NOTES_SUCCESS } from "../constants"

export const getNotes = (userId, q = "") => async dispatch => {
    dispatch({ type: GET_NOTES_START })
    try {
        const data = await Api.getNotes({ userId, q });
        dispatch({ type: GET_NOTES_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_NOTES_FAILURE, payload: error.message })
    }
}

export const deleteNote = (noteId) => async dispatch => {
    try {
        const res = await Api.deleteNote(noteId);
        if (res) {
            dispatch({ type: DELETE_NOTE, payload: noteId })
        }
    } catch (error) {
        dispatch({ type: GET_NOTES_FAILURE, payload: error.message })
    }
}

export const addNote = (newNote) => async dispatch => {
    try {
        const res = await Api.addNote(newNote);
        if (res) {
            const data = await Api.getNotes({ userId: newNote.userId, q: "" });
            dispatch(getNotes(newNote.userId))
        }
    } catch (error) {
        dispatch({ type: GET_NOTES_FAILURE, payload: error.message })
    }
}

export const editNote = (editedNote, id) => async dispatch => {
    try {
        const res = await Api.editNote(editedNote, id);
        if (res) {
            const data = await Api.getNotes({ userId: editedNote.userId, q: "" });
            dispatch(getNotes(editedNote.userId))
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_NOTES_FAILURE, payload: error.message })
    }
}