#!/usr/bin/env node
'use strict';

const fs = require('fs');
const minimist = require('minimist');
const getGitFolder = require('./get-git-folder');

const DEFAULT_MAX_LENGTH = 100;
const DEFAULT_PATTERN = /^\[[\w-]*\]\s\w*(\s&\s\w*)?\s?:.*/;
const IGNORED = /^WIP\:/;

const error = function (msg) {
    console.error('\x1b[31m%s\x1b[0m', `Your commit message: ${msg}`);
};

const validateMessage = function (message, {maxLength, pattern}) {
    let isValid = true;

    if (IGNORED.test(message)) {
        console.log('Commit message validation ignored.');
        return true;
    }

    if (message.length > maxLength) {
        error(`is longer than ${maxLength} characters!`);
        isValid = false;
    }

    const match = new RegExp(pattern).exec(message);

    if (!match) {
        error(`not match these rules: 
        ======================================================
        ===[StoryNumber] author: commit purpose            ===
        ===[StoryNumber] author1 & author2: commit purpose === 
        ======================================================
        
        ######################################################
        ##### In your commit message, you should answer  #####
        #####  1. Which Story is this commit belong to?  #####
        #####  2. Who do this commit? (or pair)          #####
        #####  3. Why do this commit?                    #####
        ######################################################
        
        ******************************************************
        **********  Notes for your commit  *******************
        ***   1. Make your commit Single Responsibility.   *** 
        ***   2. Make sure one sentence can describe all   ***
        ***   things you have done in this commit clearly. ***
        ******************************************************
        `);
        isValid = false;
    }

    return isValid;
};

const firstLineFromBuffer = function (buffer) {
    return buffer.toString().split('\n').shift();
};

const gitFolder = getGitFolder();
const commitMsgFile = `${gitFolder}/COMMIT_EDITMSG`;
const incorrectLogFile = `${gitFolder}/logs/incorrect-commit-msgs`;

const args = minimist(process.argv.slice(2));
const maxLength = args['max-length'] ? args['max-length'] : DEFAULT_MAX_LENGTH;
const pattern = args['pattern'] ? args['pattern'] : DEFAULT_PATTERN;

fs.readFile(
    commitMsgFile, function (err, buffer) {
        const msg = firstLineFromBuffer(buffer);

        if (!validateMessage(msg, {maxLength, pattern})) {
            fs.appendFile(
                incorrectLogFile, msg + '\n', function () {
                    process.exit(1);
                }
            );
        } else {
            process.exit(0);
        }
    }
);
