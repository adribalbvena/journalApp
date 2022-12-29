import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

//Every dingle thing that this path returns is a jest mock 
jest.mock('../../../src/firebase/providers');

describe('Tests in AuthThunks', () => { 

    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks() );

    test('Should invoque checkingCredentials', async() => { 
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
     });

    test('startGoogleSignIn should call checkingCredentials and login - Success case', async() => { 
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

      });

    test('startGoogleSignIn should call checkingCredentials and logout - Error case', async() => { 
        const loginData = { ok: false, errorMessage: 'Error in Google' };
        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

      });

    test('startLoginWithEmailPassword should call checkingCredentials and login - Success case', async() => { 
        const loginData = { ok:true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ));
       });
    
    test('startLoginWithEmailPassword should call checkingCredentials and logout - Error case', async() => { 
        const loginData = { ok:false, errorMessage: 'Error' };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ));
       });

    test('startCreatingUserWithEmailPassword should call checkingCredentials and login - Success case', async() => { 
        const loginData = { ok:true, ...demoUser };
        const formData = { ...demoUser }

        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( formData ) );
     });

    test('startLogout should call logoutFirebase, clearNotes and logout', async() => { 
        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
     });


 });