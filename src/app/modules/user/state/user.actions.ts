import { createAction, props } from "@ngrx/store";
import { UserCredentials } from "../types/user.credentials.types";
import { User } from "../types/user.types";

// Login
export const login = createAction(
    '[User Login] Login',
    props<{ userCredentials: UserCredentials }>()
);

export const loginSuccess = createAction(
    '[Auth API] Login Success',
    props<{ user: User }>()
);

export const loginError = createAction(
    '[Auth API] Login Error',
    props<{ error: string }>()
);

// Logout
export const logout = createAction(
    '[User Navigation] Logout'
);