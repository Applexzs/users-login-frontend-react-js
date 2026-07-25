import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/users/auth/authSlice";

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        auth: authSlice.reducer,
    }
});