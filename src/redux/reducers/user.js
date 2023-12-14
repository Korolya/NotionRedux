import { GET_USER_FAILURE, GET_USER_START, GET_USER_SUCCESS, REMOVE_USER, REGISTER_FAILURE, REGISTER_SUCCESS } from "../constants"

const initialState = {
    user: null,
    loading: false,
    error: null,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USER_START:
            return { ...state, loading: true, error: null }
        case GET_USER_SUCCESS:
            return { ...state, loading: false, error: null, user: payload }
        case GET_USER_FAILURE:
            return { ...state, loading: false, error: payload }
        case REGISTER_SUCCESS:
            return { ...state, error: null };
        case REGISTER_FAILURE:
            return { ...state, error: payload };
        case REMOVE_USER:
            return { ...state, user: null, loading: false, error: null, }
        default:
            return state
    }
}
