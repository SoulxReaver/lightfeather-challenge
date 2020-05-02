import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

const enterValueToTextField = (container, val) => {

    let input = container.querySelector('input'); 
    fireEvent.blur(input, {target: {value: val}});
}

describe("Register", () => {
  
  let component;

  describe("Input Field", () => {

    beforeEach( () => {

      component = render(<App />);
    });

    test('should display error when username is > 15 characters', () => {

      let container = component.getByTestId("username");

      enterValueToTextField(container, '12345678901234567890');

      let p = container.querySelector('p');

      expect(p.innerHTML).toBe('Username must be less than 16 characters.')
    });

    test('should display error when email is invalid', () => {

      let container = component.getByTestId("email");

      enterValueToTextField(container, '1'); 

      let p = container.querySelector('p'); 

      expect(p.innerHTML).toBe('Please enter a valid email.');
    });

    test('should display error when password is invalid', () => {

      let container = component.getByTestId("password");

      enterValueToTextField(container, ''); 

      let p = container.querySelector('p'); 

      expect(p.innerHTML).toBe('Please enter a password.');
    });

    test('should display error when password does not match confirm password', () => {

      let container1 = component.getByTestId("confirm-password");
      let container2 = component.getByTestId("password");

      enterValueToTextField(container1, '1'); 
      enterValueToTextField(container2, '2'); 

      let p = container1.querySelector('p'); 

      expect(p.innerHTML).toBe('This password doesn’t match. Try again.');
    });

    test('should display error when password changed after valid matching', () => {

      let container1 = component.getByTestId("confirm-password");
      let container2 = component.getByTestId("password");

      enterValueToTextField(container1, '2'); 
      enterValueToTextField(container2, '2'); 
      enterValueToTextField(container1, '1'); 

      let p = container1.querySelector('p'); 

      expect(p.innerHTML).toBe('This password doesn’t match. Try again.');
    });
  });

  describe("Submit button", () => {

    beforeEach( () => {

      component = render(<App />);

      const usernameContainer = component.getByTestId("username");
      const emailContainer = component.getByTestId("email");
      const passwordContainer = component.getByTestId("password");
      const cpasswordContainer = component.getByTestId("confirm-password");

      enterValueToTextField(usernameContainer, '127890');
      enterValueToTextField(emailContainer, 'a@e.com');
      enterValueToTextField(passwordContainer, 'asdf');
      enterValueToTextField(cpasswordContainer, 'asdf');

    });

    test('should disable submit button by default', () => {
      cleanup();
      component = render(<App />);

      const button = component.getByTestId("submit");

      expect(button).toBeDisabled();
    });


    test('should disable submit button when username is invalid', () => {

      const usernameContainer = component.getByTestId("username");

      enterValueToTextField(usernameContainer, '12345678901234567890');

      const button = component.getByTestId("submit");

      expect(button).toBeDisabled();
    });

    test('should disable submit button when email is invalid', () => {

      const emailContainer = component.getByTestId("email");

      enterValueToTextField(emailContainer, 'a@e');

      const button = component.getByTestId("submit");

      expect(button).toBeDisabled();
    });

    test('should disable submit button when password is invalid', () => {

      const passwordContainer = component.getByTestId("password");
      
      enterValueToTextField(passwordContainer, '');

      const button = component.getByTestId("submit");

      expect(button).toBeDisabled();
    });

    test('should enable submit button when form is valid', () => {

      const button = component.getByTestId("submit");

      expect(button).not.toBeDisabled();
    });
  });
});