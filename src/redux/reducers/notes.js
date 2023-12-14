import { DELETE_NOTE, GET_NOTES_FAILURE, GET_NOTES_START, GET_NOTES_SUCCESS, SET_SELECTED_NOTE } from "../constants"

const initialState = {
    notes: [],
    loading: false,
    error: null,
    selectedNote: null,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_NOTES_START:
            return { ...state, loading: true }
        case GET_NOTES_SUCCESS:
            return { ...state, loading: false, notes: payload, error: null, }
        case GET_NOTES_FAILURE:
            return { ...state, loading: false, error: payload }
        case DELETE_NOTE:
            return { ...state, notes: state.notes.filter(note => note.id !== payload) }
        case SET_SELECTED_NOTE:
            return { ...state, selectedNote: payload }
        default:
            return state
    }
}
