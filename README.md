# LightFeather - Web Server

## Overview

This web server will provide the user with the ability to encode messages with a shift cipher.

## Requirement

* Node.js version 12.13.1 or later

## Setup

### Step 1

* Install Node.js version 12.13.1 or later
  + To check you version run `node -v` on the terminal
  + Link to latest Nodejs: https://nodejs.org/en/

### Step 2

+ Navigate to the project directory
+ Install all the required node package run `npm i`

## Development Server

Run `npm start` for a dev server. Navigate to `http://localhost:23456/`. 

## Running Unit Tests

Run `npm test` to execute the unit tests via [Jasmine](https://jasmine.github.io/setup/nodejs.html)

## End to End Test

There is a postman test case collection located in the "server/e2e/postman" folder

Import the file with the Postman

## Notes

Requirerd payload in JSON format:

+ Shift
    + required
    + Non negative Integer
    + less or equal to 26
+ Message
    + is required

#### Assumption

+ Non-letter are retained.

+ Message cannot be encoded if shifting letter goes beyond letter z;

+ Preserve casing

## Save Encoded Message To The Disk Location

All encoded message is saved in the project directory: results.

If the folder is missing it will be created.