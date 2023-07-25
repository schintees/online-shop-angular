import { createReducer, on } from "@ngrx/store";
import { User } from "../types/user.types";
import { login, loginError, loginSuccess, logout } from "./user.actions";


export interface UserState {
    currentUser?: User;
    loading: boolean;
    error?: string;
}

const initialState: UserState = {
    currentUser: undefined,
    loading: false,
    error: undefined
};

export const userReducer = createReducer(
    initialState,

    // Login
    on(login, (state) => ({
        ...state,
        loading: true
    })),
    on(loginSuccess, (state, { user }) => ({
        ...state,
        currentUser: user,
        loading: false,
        error: undefined,
    })),
    on(loginError, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),

    // Logout
    on(logout, (state) => ({
        ...state,
        currentUser: undefined,
    })),

);