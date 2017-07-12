#!/usr/bin/env node

'use strict';

var fs = require('fs');
var util = require('util');

var MAX_LENGTH = 100;
var PATTERN = /^\[[\w-]*\]\s\w*(\s&\s\w*)?\s?:.*/;
var IGNORED = /^WIP\:/;

var error = function() {
  console.error('INVALID COMMIT MSG: ' + util.format.apply(null, arguments));
};

var validateMessage = function(message) {
  var isValid = true;

  if (IGNORED.test(message)) {
    console.log('Commit message validation ignored.');
    return true;
  }

  if (message.length > MAX_LENGTH) {
    error('is longer than %d characters !', MAX_LENGTH);
    isValid = false;
  }

  var match = PATTERN.exec(message);

  if (!match) {
    error('does not match ' +
        '\n    "[CardNumber] author: commit purpose" ' +
        '\n or' +
        '\n   "[CardNumber] author1 & author2: commit purpose" ');
    return false;
  }

  return isValid;
};

var firstLineFromBuffer = function(buffer) {
  return buffer.toString().split('\n').shift();
};

// publish for testing
exports.validateMessage = validateMessage;

var commitMsgFile = process.argv[2];
var incorrectLogFile = commitMsgFile.replace('COMMIT_EDITMSG', 'logs/incorrect-commit-msgs');

fs.readFile(
  commitMsgFile, function(err, buffer) {
    var msg = firstLineFromBuffer(buffer);

    if (!validateMessage(msg)) {
      fs.appendFile(
        incorrectLogFile, msg + '\n', function() {
          process.exit(1);
        }
      );
    } else {
      process.exit(0);
    }
  }
);
