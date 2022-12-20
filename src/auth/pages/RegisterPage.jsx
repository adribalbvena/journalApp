import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

//to send dynamically the validations to my useForm
const formValidations = {
email: [ (value) => value.includes('@'), 'Email must contain an @'],
password: [ (value) => value.length >= 6, 'Password must have at least 6 letters'],
displayName: [ (value) => value.length >= 1, 'Name is required'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
     formState,
     displayName,
     email, 
     password, 
     onInputChange,  
     displayNameValid, 
     isFormValid,
     emailValid,
     passwordValid,
    } = useForm( formData, formValidations );

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword(formState) );


  }

  return (
    <AuthLayout title="Create an account">
          <form onSubmit={ onSubmit }>
            <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                  label="Full Name" 
                  type="text" 
                  placeholder="John Doe"
                  fullWidth 
                  name="displayName"
                  value={ displayName }
                  onChange={ onInputChange }
                  error={ !!displayNameValid && formSubmitted}
                  helperText={ displayNameValid }
                  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                  label="Email" 
                  type="email" 
                  placeholder="mail@gmail.com"
                  fullWidth
                  name="email"
                  value={ email }
                  onChange={ onInputChange } 
                  error={ !!emailValid && formSubmitted}
                  helperText={ emailValid }
                  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                  label="Password" 
                  type="password" 
                  placeholder="Password"
                  fullWidth 
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                  error={ !!passwordValid && formSubmitted}
                  helperText={ passwordValid }
                  />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={ 12 }>
                  <Button 
                    type = "submit"
                    variant='contained' 
                    fullWidth>
                    Create
                  </Button>
                </Grid>
              </Grid>

                <Grid container direction="row" justifyContent="end" >
                  <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
                  <Link component={ RouterLink } color="inherit" to="/auth/login">
                    Log In
                  </Link>
                </Grid>

            </Grid>
          </form>

    </AuthLayout>

    )
}