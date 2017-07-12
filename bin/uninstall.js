#!/usr/bin/env node

'use strict';

var exec = require('child_process').exec;

exec('rm -f ./.git/hooks/commit-msg');