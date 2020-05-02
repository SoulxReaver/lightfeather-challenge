import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import * as EmailValidator from 'email-validator';
import Container from '@material-ui/core/Container';

const App = () => {
  const [ inputs, setInputs ] = React.useState({ username: '', email: '', password: '', confirmPassword: ''});
  const [ errors, setErrors ] = React.useState({ username: null, email: null, password: null, confirmPassword: null});
  const [ disableSubmit, setDisableSubmit ] = React.useState(false);

  const validate = (event) => {
    const { name, value } = event.target;
    const error = {};
    const input = {};

    switch (name) {
      case 'username': 
        error.username = 
          value.length > 15
            ? 'Username must be less than 16 characters.'
            : null;
          input.username = value;
        break;
      case 'email': 
        error.email = 
          EmailValidator.validate(value)
            ? null
            : 'Please enter a valid email.';
        input.email = value;
        break;
      case 'password': 
        error.password = 
          value.length > 0
            ? null
            : 'Please enter a password.';
        if (inputs.confirmPassword.length > 0) {
          error.confirmPassword = 
          inputs.confirmPassword !== value
            ? 'This password doesn’t match. Try again.'
            : null;
        }
        input.password = value;
        break;
      case 'confirm-password': 
        error.confirmPassword = 
        value !== inputs.password
            ? 'This password doesn’t match. Try again.'
            : null;
        input.confirmPassword = value;
        break;
      default:
        break;
    }

    setInputs(prevState => { return {...prevState, ...input} });
    return setErrors(prevState => { return {...prevState, ...error} });
  }

  React.useEffect( () => {
    const isAllFieldFilled = () => {
      return inputs.username.length > 0 &&
        inputs.email.length > 0 &&
        inputs.password.length > 0 &&
        inputs.confirmPassword.length > 0;
    }
  
    const isForumValid = () => {
      return !(errors.username ||
        errors.email ||
        errors.password ||
        errors.confirmPassword);
    }

    setDisableSubmit(!(isAllFieldFilled() && isForumValid()));
  }, [
    inputs.username.length, 
    inputs.email.length, 
    inputs.password.length, 
    inputs.confirmPassword.length, 
    errors.username, 
    errors.email, 
    errors.password, 
    errors.confirmPassword
  ]);


  return (
    <Container className="app-container" maxWidth="md">
      <h1 className="forum-title">
        Create your account
      </h1>
        <form className="form-container"  autoComplete="off">
          <Box mt={3}>
            <TextField
              name="username" 
              data-testid="username"
              error={!!errors.username} 
              type="text" 
              label="Username" 
              variant="outlined" 
              onBlur={validate} 
              helperText={errors.username}
            />
          </Box>
          <Box mt={3}>
            <TextField 
              name="email" 
              data-testid="email"
              error={!!errors.email} 
              type="email" 
              label="Email" 
              variant="outlined" 
              onBlur={validate}
              helperText={errors.email} />
          </Box>
          <Box mt={3}>
            <TextField 
              name="password" 
              data-testid="password"
              error={!!errors.password} 
              type="password" 
              label="Password" 
              variant="outlined" 
              onBlur={validate}
              helperText={errors.password} />
          </Box>
          <Box mt={3}>
            <TextField 
              name="confirm-password" 
              data-testid="confirm-password"
              error={!!errors.confirmPassword} 
              type="password" 
              label="Confirm Password" 
              variant="outlined" 
              onBlur={validate} 
              helperText={errors.confirmPassword}/>
          </Box>
          <Box mt={3}>
            <Button className="create-button" variant="contained" data-testid="submit" color="primary" disabled={disableSubmit}>Create account</Button>
          </Box>
        </form>
    </Container>
  );
}

export default App;
