import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
}

export const userReducer = createReducer(initialState, {

    // Load Seller
    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    LoadUserFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false
    },

})