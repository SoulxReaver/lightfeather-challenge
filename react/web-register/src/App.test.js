import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('should display error when username is > 15 characters', () => {
  const { getByTestId } = render(<App />);
  let container = getByTestId("username");
  let input = container.querySelector('input'); 

  fireEvent.blur(input, {target: {value: '12345678901234567890'}});
  let p = container.querySelector('p');
  expect(p.innerHTML).toBe('Username is should be &lt;= 15 characters.')
});

test('should display error when email is invalid', () => {
  const { getByTestId } = render(<App />);
  let container = getByTestId("email");
  let input = container.querySelector('input'); 

  fireEvent.blur(input, {target: {value: '1'}});
  let p = container.querySelector('p'); 
  expect(p.innerHTML).toBe('Please enter a valid email.');
});

test('should display error when password is invalid', () => {
  const { getByTestId } = render(<App />);
  let container = getByTestId("password");
  let input = container.querySelector('input'); 

  fireEvent.blur(input, {target: {value: ''}});
  let p = container.querySelector('p'); 
  expect(p.innerHTML).toBe('Please enter a password.');
});

test('should display error when password does not match confirm password', () => {
  const { getByTestId } = render(<App />);
  let container1 = getByTestId("confirm-password");
  let input1 = container1.querySelector('input'); 

  let container2 = getByTestId("password");
  let input2 = container2.querySelector('input'); 

  fireEvent.blur(input1, {target: {value: '1'}});
  fireEvent.blur(input2, {target: {value: '2'}});
  let p = container1.querySelector('p'); 
  expect(p.innerHTML).toBe('This password doesn’t match. Try again.');
});

test('should display error when password changed after valid matching', () => {
  const { getByTestId } = render(<App />);
  let container1 = getByTestId("confirm-password");
  let input1 = container1.querySelector('input'); 

  let container2 = getByTestId("password");
  let input2 = container2.querySelector('input'); 

  fireEvent.blur(input1, {target: {value: '1'}});
  fireEvent.blur(input2, {target: {value: '1'}});
  fireEvent.blur(input2, {target: {value: '2'}});
  let p = container1.querySelector('p'); 
  expect(p.innerHTML).toBe('This password doesn’t match. Try again.');
});

test('should disable submit button by default', () => {
  const { getByTestId } = render(<App />);
  let button = getByTestId("submit");
  expect(button).toBeDisabled();
});

const enterValueToInput = (container, val) => {
  const input = container.querySelector('input'); 
  fireEvent.blur(input, {target: {value: val }});
}

test('should disable submit button when username is invalid', () => {
  const { getByTestId } = render(<App />);

  const usernameContainer = getByTestId("username");
  enterValueToInput(usernameContainer, '12345678901234567890');

  const emailContainer = getByTestId("email");
  enterValueToInput(emailContainer, 'a@e.com');

  const passwordContainer = getByTestId("password");
  enterValueToInput(passwordContainer, 'asdf');

  const cpasswordContainer = getByTestId("confirm-password");
  enterValueToInput(cpasswordContainer, 'asdf');

  const button = getByTestId("submit");
  expect(button).toBeDisabled();
});

test('should disable submit button when email is invalid', () => {
  const { getByTestId } = render(<App />);

  const usernameContainer = getByTestId("username");
  enterValueToInput(usernameContainer, '12347890');

  const emailContainer = getByTestId("email");
  enterValueToInput(emailContainer, 'a@e');

  const passwordContainer = getByTestId("password");
  enterValueToInput(passwordContainer, 'asdf');

  const cpasswordContainer = getByTestId("confirm-password");
  enterValueToInput(cpasswordContainer, 'asdf');

  const button = getByTestId("submit");
  expect(button).toBeDisabled();
});

test('should disable submit button when password is invalid', () => {
  const { getByTestId } = render(<App />);

  const usernameContainer = getByTestId("username");
  enterValueToInput(usernameContainer, '12347890');

  const emailContainer = getByTestId("email");
  enterValueToInput(emailContainer, 'a@e');

  const passwordContainer = getByTestId("password");
  enterValueToInput(passwordContainer, '');

  const cpasswordContainer = getByTestId("confirm-password");
  enterValueToInput(cpasswordContainer, 'asdf');

  const button = getByTestId("submit");
  expect(button).toBeDisabled();
});

test('should enable submit button when form is valid', () => {
  const { getByTestId } = render(<App />);

  const usernameContainer = getByTestId("username");
  enterValueToInput(usernameContainer, '12347890');

  const emailContainer = getByTestId("email");
  enterValueToInput(emailContainer, 'a@e.com');

  const passwordContainer = getByTestId("password");
  enterValueToInput(passwordContainer, 'asdf');

  const cpasswordContainer = getByTestId("confirm-password");
  enterValueToInput(cpasswordContainer, 'asdf');

  const button = getByTestId("submit");
  expect(button).not.toBeDisabled();
});