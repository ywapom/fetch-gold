# fetch-gold
# Find the fake gold bar code challenge

This repository contains a Cypress test suite for the "Find the Fake Bar" game. The code automates interactions with the game's web interface to verify its functionality and behavior.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Notes](#notes)


## Installation

To run this test suite, you will need to have Node.js and npm installed on your machine.

1. Clone the repository:
   ```bash
   git clone https://github.com/ywapom/fetch-gold.git
   cd fetch-gold

   Install dependencies:
   npm install
   ```

## Usage

The Cypress code is designed to automate the functionality of the game.
The tests can be run using the Cypress Test Runner.
1. Open Cypress:
   ```bash
   npx cypress open
   ```
2. Select the test to run (fetch_spec.cy.js)

3. View output in the console

![alt text](https://github.com/ywapom/fetch-gold/blob/main/fetch.png?raw=true)
   
   
## Notes

The team through a wrench into the challenge by having two elements with the same id (id='reset') -- naughty! ;)
   

   
