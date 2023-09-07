import axios from "../../libs/axios";



export const loaduser = () => async (dispatch) => {

    try {
        dispatch({
            type: "LoadUserRequest",
        })
        const { data } = await axios.get(`/auth/getuser`);
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

