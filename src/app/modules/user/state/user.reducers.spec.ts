import { UserCredentials } from "../types/user.credentials.types";
import { User } from "../types/user.types";
import { login, loginError, loginSuccess, logout } from "./user.actions";
import * as fromReducer from "./user.reducers";
import { UserState } from "./user.reducers";


describe('UserReducer', () => {
    const user: User = {
        username: 'doej',
        fullName: 'John Doe',
        roles: ["user", "customer"]
    }

    describe('unknown action', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.userReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('login action', () => {
        it('should set the loading to true', () => {
            const { initialState } = fromReducer;
            const userCredentials: UserCredentials = {
                username: 'doej',
                password: 'password'
            };
            const expectedState: UserState = {
                currentUser: undefined,
                loading: true,
                error: undefined
            };

            const state = fromReducer.userReducer(initialState, login({ userCredentials }));

            expect(state).toEqual(expectedState);
        });
    });

    describe('loginSuccess action', () => {
        it('should set the user', () => {
            const initialState: UserState = {
                currentUser: undefined,
                loading: true,
                error: undefined
            };
            const expectedState: UserState = {
                currentUser: user,
                loading: false,
                error: undefined
            };

            const state = fromReducer.userReducer(initialState, loginSuccess({ user }));

            expect(state).toEqual(expectedState);
        });
    });

    describe('loginError action', () => {
        it('should set the error', () => {
            const initialState: UserState = {
                currentUser: undefined,
                loading: true,
                error: undefined
            };
            const expectedState: UserState = {
                currentUser: undefined,
                loading: false,
                error: 'error message'
            };

            const state = fromReducer.userReducer(initialState, loginError({ error: 'error message' }));

            expect(state).toEqual(expectedState);
        });
    });

    describe('logout action', () => {
        it('should unset the user', () => {
            const initialState: UserState = {
                currentUser: user,
                loading: false,
                error: undefined
            };
            const expectedState: UserState = {
                currentUser: undefined,
                loading: false,
                error: undefined
            };

            const state = fromReducer.userReducer(initialState, logout());

            expect(state).toEqual(expectedState);
        });
    });

});