#!/usr/bin/env node
'use strict';

const fs = require('fs');
const getGitFolder = require('./get-git-folder');

const MAX_LENGTH = 100;
const PATTERN = /^\[[\w-]*\]\s\w*(\s&\s\w*)?\s?:.*/;
const IGNORED = /^WIP\:/;

const error = function (msg) {
    console.error(`\x1b[31m%s\x1b[0m','Your commit message: ${msg}`);
};

const validateMessage = function (message) {
    let isValid = true;

    if (IGNORED.test(message)) {
        console.log('Commit message validation ignored.');
        return true;
    }

    if (message.length > MAX_LENGTH) {
        error(`is longer than ${MAX_LENGTH} characters!`);
        isValid = false;
    }

    const match = PATTERN.exec(message);

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
fs.readFile(
    commitMsgFile, function (err, buffer) {
        const msg = firstLineFromBuffer(buffer);

        if (!validateMessage(msg)) {
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
