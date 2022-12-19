import { checkingCredentials } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch, getState ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch ( checkingCredentials() );
    }
}