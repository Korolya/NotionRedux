import Api from "../../utils/api";
import { GET_USER_FAILURE, GET_USER_START, GET_USER_SUCCESS, REMOVE_USER, REGISTER_SUCCESS, REGISTER_FAILURE } from "../constants";

export const getUser = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: GET_USER_START });
        const user = await Api.getUser({ email, password })
        dispatch({ type: GET_USER_SUCCESS, payload: user });
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message })
    }
}

export const logoutUser = () => async dispatch => {
    dispatch({ type: REMOVE_USER })
}

export const registerUser = (newUser) =>
    async (dispatch) => {
        try {
            const query = new URLSearchParams({
                email: newUser.email,
            }).toString();

            const response = await fetch(`http://localhost:5001/users?${query}`);
            const users = await response.json();
            const existingUser = users[0];

            if (existingUser) {
                throw new Error("User is already registered");
            }

            const registerResponse = await fetch("http://localhost:5001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            const registeredUser = await registerResponse.json();

            if (registeredUser) {
                dispatch({ type: REGISTER_SUCCESS });
            } else {
                throw new Error("Failed to register");
            }
        } catch (error) {
            dispatch({ type: REGISTER_FAILURE, payload: error.message });
        }
    };