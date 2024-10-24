# Lottery Simulator

## Table of Contents

 * [Demo](#demo)
 * [Explanation](#explanation)
 * [Live Version](#live-version)
 * [Compatibility](#compatibility)
 * [Testing](#testing) 
 * [File Descriptions](#file-descriptions)
 * [Technologies](#technologies)
 * [Validation](#validation)
 
## Demo

![Demo](https://raw.githubusercontent.com/Robson/Lottery-Simulator/master/Demo.gif)

## Explanation

This is a webpage that simulates the results from various UK-based lotteries.

You can change the lottery type, amount of tickets and the simulation speed.

## Live Version

https://robson.plus/lottery-simulator/

## Compatibility

The output for this project is designed for desktop and mobile.

| Platform | OS      | Browser          | Version | Status  |
| :------- | :------ | :--------------- | :------ | :------ |
| Desktop  | Windows | Firefox          | 98      | Working |
| Desktop  | Windows | Opera            | 84      | Working |
| Desktop  | Windows | Chrome           | 99      | Working |
| Desktop  | Windows | Edge             | 99      | Working |
| Mobile   | Android | Chrome           | 98      | Working |
| Mobile   | Android | Firefox          | 97      | Working |

Last tested on 9th March 2022.

## Testing

To run this on your computer:
 * [Download the repository](https://github.com/Robson/Lottery-Simulator/archive/master.zip).
 * Unzip anywhere.
 * Open *index.html* in your browser.
 
## File Descriptions

### index.html

This is the webpage with the simulator, the input form and the output tables.

### lotteries.js

This consists of the information for each lottery type and some helper functions that are shared across all of them.

Each lottery type must be in the same format as the existing lotteries, which means it must have a title, currency, etc.

### simulate.js

This file is responsible for simulating the ticket results, showing the statistics and handling the copying of statistics to the clipboard.

### style.css

All formatting and layout information is contained in this file.

## Technologies

This is built using:
 * HTML
 * CSS
 * JavaScript
   * <a href="https://github.com/d3/d3">D3.js</a>
   
## Validation
   
<a href="https://validator.w3.org/nu/?doc=https%3A%2F%2Frobson.plus%2Flottery-simulator%2F"><img src="https://www.w3.org/Icons/valid-html401-blue" alt="Valid HTML" /></a>

<a href="http://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Frobson.plus%2Flottery-simulator%2Fstyle.css&profile=css3svg&usermedium=all&warning=1"><img src="https://jigsaw.w3.org/css-validator/images/vcss-blue" alt="Valid CSS" /></a>      

[![X](https://www.codefactor.io/repository/github/robson/Lottery-Simulator/badge?style=flat-square)](https://www.codefactor.io/repository/github/robson/Lottery-Simulator)
