import { createReducer, createSelector, on } from "@ngrx/store";
import { User } from "../types/user.types";
import { login, loginError, loginSuccess, logout } from "./user.actions";
import { AppState } from "src/app/state/app.state";
import { UserRoles } from "../types/roles.enum";


export interface UserState {
    currentUser?: User;
    loading: boolean;
    error?: string;
}

export const initialState: UserState = {
    currentUser: undefined,
    loading: false,
    error: undefined
};

export const selectUserState = (state: AppState) => state.user;

export const selectCurrentUsername = createSelector(
    selectUserState,
    (state: UserState) => state.currentUser?.username
);

export const selectIsAuth = createSelector(
    selectUserState,
    (state: UserState) => !!state.currentUser
);

export const selectIsAdmin = createSelector(
    selectUserState,
    (state: UserState) => state.currentUser?.roles?.includes(UserRoles.Admin)
)

export const selectIsCustomer = createSelector(
    selectUserState,
    (state: UserState) => state.currentUser?.roles?.includes(UserRoles.Customer)
)

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