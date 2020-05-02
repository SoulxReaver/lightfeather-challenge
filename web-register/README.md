# LightFeather - Web Component

## Overview

This web component is a signup page.

## Requirement

* Node.js version 12.13.1

## Setup

### Step 1

* Install Node.js version 12.13.1
  + To check you version run `node -v` on the terminal
  + Link to latest [Nodejs](https://nodejs.org/en/)

### Step 2

+ Navigate to the project directory

  + ```cd web-register```

+ Install all the required node package 

  + run `npm i` on the terminal

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Notes

Use material UI form the web component.

See the section about [Material-UI](https://material-ui.com/) for more information

#### Assumption

The empty text field does not display an input error.

All fields must be valid and non-empty value to enable submit button.

Behave similarly to [Stripe](https://dashboard.stripe.com/register)