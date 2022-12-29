import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { initialState, demoUser, authenticatedState } from "../../fixtures/authFixtures";

describe('Tests in authSlice', () => { 
    
    test('Test should return initialState and have the name "auth"', () => { 
        expect( authSlice.name ).toBe('auth');
        //to know how my state looks, the {} is my action
        const state = authSlice.reducer( initialState, {})
        expect( state ).toEqual( initialState );
    });

     test('Should do the authentication', () => { 
        //remember that the goal of the reducer is create a new state, so we send the initialState and the payload
        const state = authSlice.reducer( initialState, login( demoUser ) );

        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null, 
        })
    });

    test('Should do the logout', () => { 
        //authenticatedState //logout sin argumentos
        const state = authSlice.reducer( authenticatedState, logout() );
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        })
    });

    test('Should do the logout and show an error message', () => { 
        //authenticatedState //logout con argumentos
        const errorMessage = 'Invalid credentials';
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        })
    });

    test('Should change the state to checking', () => { 
        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');
     });


 });