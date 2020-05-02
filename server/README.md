# LightFeather - Web Server

## Overview

This web server will provide the user with the ability to encode messages with a shift cipher.

## Requirement

* Node.js version 12.13.1

## Setup

### Step 1

+ Install Node.js version 12.13.1

  + To check you version run `node -v` on the terminal

  + Link to latest [Nodejs](https://nodejs.org/en/)

### Step 2

+ Navigate to the project directory

  + ```cd server```

+ Install all the required node package
  
  + run `npm i` on the ternimal

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:23456](http://localhost:23456) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm test`

Launches the test runner

See the section about [Jasmine](https://jasmine.github.io/setup/nodejs.html) for more information.

### 'npm run clean'

Delete result directory

## End to End Test

There is a postman test case collection located in the "e2e/postman" folder

See the section about [Postman](https://learning.postman.com/docs/postman/collection-runs/working-with-data-files/) for more information.

*Application must be running in order to execute test on postman*

## Notes

Requirerd payload in JSON format:

+ Shift
    + Required
    + Non negative Integer
    + less or equal to 26
+ Message
    + is required

#### Assumption

+ Spaces are retained.

+ Symbol and number cannot be encoded

+ Message cannot be encoded if shifting letter goes beyond letter z;

+ Preserve casing

## Save Encoded Message To The Disk Location

All encoded message is saved in the project directory: results.

If the folder is missing it will be created.