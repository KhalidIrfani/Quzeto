import axios from "axios";
import { server } from "../../server";

export const loaduser = () => async (dispatch) => {

    try {
        dispatch({
            type: "LoadUserRequest",
        })
        const { data } = await axios(`${server}auth/getuser`, { withCredentials: true });
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })
    } catch (error) {

        dispatch({
            type: "LoadUserFailed",
            payload: error.response.data.message
        })
        console.log(error)
    }
}

