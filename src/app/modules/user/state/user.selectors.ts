import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";
import { UserState } from "./user.reducers";
import { UserRoles } from "../types/roles.enum";

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
    (state: UserState) => state.currentUser?.roles.includes(UserRoles.Admin)
)

export const selectIsCustomer = createSelector(
    selectUserState,
    (state: UserState) => state.currentUser?.roles.includes(UserRoles.Customer)
)