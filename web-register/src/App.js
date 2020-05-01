import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import * as EmailValidator from 'email-validator';
import Container from '@material-ui/core/Container';

const App = () => {
  const [ username, setUsername ] = React.useState({isValid: false, value: '', errorMessage: false});
  const [ email, setEmail ] = React.useState({isValid: false, value: '', errorMessage: false});
  const [ password, setPassword ] = React.useState({isValid: false, value: '', errorMessage: false});
  const [ confirmPassword, setConfirmPassword ] = React.useState({isValid: false, value: '', errorMessage: false});
  const [ disableSubmit, setDisableSubmit ] = React.useState(false);

  const validateUsername = (event) => {
    if (event.target.value === '') {
      return setUsername({isValid: false, value: '', errorMessage: false});
    };

    if (event.target.value.length > 15) {
      return setUsername({isValid: false, value: event.target.value, errorMessage: 'Username is should be <= 15 characters.'});
    }

    return setUsername({isValid: true, value: event.target.value, errorMessage: false});
  }

  const validateEmail = (event) => {

    if (event.target.value === '') {
      return setEmail({isValid: false, value: '', errorMessage: false});
    };

    if (!EmailValidator.validate(event.target.value)) {
      return setEmail({isValid: false, value: event.target.value, errorMessage: 'Please enter a valid email.'});
    }

    setEmail({isValid: true, value: event.target.value, errorMessage: false});
  }

  const validatePassword = (event) => {
    
    if (event.target.value === '') {
      return setPassword({isValid: false, value: event.target.value, errorMessage: 'Please enter a password.'});
    };

    setPassword({isValid: true, value: event.target.value, errorMessage: false});

    if (confirmPassword.value !== '') {
      validateConfirmPassword({  target: { value: confirmPassword.value }}, event.target.value);
    }
  }

  const validateConfirmPassword = (event, p = password.value) => {
    let errorMessage;
    if (event.target.value === '') {
      return setConfirmPassword({isValid: false, value: event.target.value, errorMessage: false});
    }

    if (event.target.value !== p) {
      return setConfirmPassword({isValid: false, value: event.target.value, errorMessage: 'This password doesn’t match. Try again.'});
    }

    return setConfirmPassword({isValid: true, value: event.target.value, errorMessage});
  }

  React.useEffect( () => {
    setDisableSubmit(!(username.isValid && 
      email.isValid &&
      password.isValid &&
      confirmPassword.isValid));
  }, [username.isValid, email.isValid, password.isValid, confirmPassword.isValid]);

  return (
    <Container className="app-container" maxWidth="md">
      <h1 className="forum-title">
        Create your account
      </h1>
        <form className="form-container"  autoComplete="off">
          <Box mt={1}>
            <TextField
              id="username" 
              data-testid="username"
              error={!!username.errorMessage} 
              type="text" 
              label="Username" 
              variant="outlined" 
              onBlur={validateUsername} 
              helperText={username.errorMessage}
            />
          </Box>
          <Box mt={1}>
            <TextField 
              id="email" 
              data-testid="email"
              error={!!email.errorMessage} 
              type="email" 
              label="Email" 
              variant="outlined" 
              onBlur={validateEmail}
              helperText={email.errorMessage} />
          </Box>
          <Box mt={1}>
            <TextField 
              id="password" 
              data-testid="password"
              error={!!password.errorMessage} 
              type="password" 
              label="Password" 
              variant="outlined" 
              onBlur={validatePassword}
              helperText={password.errorMessage} />
          </Box>
          <Box mt={1}>
            <TextField 
              id="confirm-password" 
              data-testid="confirm-password"
              error={!!confirmPassword.errorMessage} 
              type="password" 
              label="Confirm Password" 
              variant="outlined" 
              onBlur={validateConfirmPassword} 
              helperText={confirmPassword.errorMessage}/>
          </Box>
          <Box mt={1}>
            <Button variant="contained" data-testid="submit" color="primary" disabled={disableSubmit}>Create account</Button>
          </Box>
        </form>
    </Container>
  );
}

export default App;
