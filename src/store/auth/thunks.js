import { async } from "@firebase/util";
import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch, getState ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch ( checkingCredentials() );

        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ));

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName});

        //if anything goes wrong, we gonna call the logout in the dispatch and we gonna send the errorMessage as a payload
        if ( !ok ) return dispatch( logout({ errorMessage }) );

        
        dispatch( login({ uid, displayName, email, photoURL }));
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {
        //to put it in the checking state and block buttons, etc.
        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });
      
        if ( !result.ok ) return dispatch( logout( result ) );

        dispatch( login( result ));

    }

}