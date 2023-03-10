import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  //just when the status change, it will check the value again
  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();

    dispatch( startLoginWithEmailPassword({ email, password }) );

  }

  const onGoogleSignIn = () => {

    dispatch( startGoogleSignIn() );
  }

  return (

    <AuthLayout title="Login">
          <form 
            aria-label="submit-form"
            onSubmit={ onSubmit } 
            className='animate__animate animate__fadeIn animate__faster'
            >
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                  label="Email" 
                  type="email" 
                  placeholder="mail@gmail.com"
                  fullWidth 
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                  label="Password" 
                  type="password" 
                  placeholder="Password"
                  fullWidth 
                  name="password"
                  inputProps={{
                    'data-testid' : 'password'
                  }}
                  value={ password }
                  onChange={ onInputChange }
                  />
              </Grid>

              <Grid 
                container
                display={ !!errorMessage ? '' : 'none' }
                sx={{ mt:1 }}>
              <Grid 
                  item 
                  xs={ 12 }
                  //!! convert to a boolean value, if there's nothing, display will be an empty string, else will be none  
                  >
                  <Alert severity='error'>{ errorMessage }</Alert>
                </Grid>
              </Grid>


              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button 
                    disabled={ isAuthenticating }
                    type="submit" 
                    variant='contained' 
                    fullWidth>
                    Login
                  </Button>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button 
                    disabled={ isAuthenticating }
                    variant='contained' 
                    fullWidth
                    aria-label="google-btn"
                    onClick={ onGoogleSignIn }>
                    <Google />
                    <Typography sx={{ ml: 1 }}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

                <Grid container direction="row" justifyContent="end" >
                  <Link component={ RouterLink } color="inherit" to="/auth/register">
                    Create an account
                  </Link>
                </Grid>

            </Grid>
          </form>

    </AuthLayout>

    )
}
