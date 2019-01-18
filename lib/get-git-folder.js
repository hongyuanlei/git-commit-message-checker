'use strict';

const fs = require('fs');
const path = require('path');
const findParentDir = require('find-parent-dir');

module.exports = function getGitFolder() {
    const dir = findParentDir.sync(process.cwd(), '.git');
    if (!dir) throw new Error('Cannot find .git folder');

    let gitDir = path.join(dir, '.git');
    const stats = fs.lstatSync(gitDir);

    if (!stats.isDirectory()) {
        const pathToGit = fs
            .readFileSync(gitDir, 'utf-8')
            .split(':')[1]
            .trim();
        gitDir = path.join(dir, pathToGit);

        if (!fs.existsSync(gitDir)) {
            throw new Error(`Cannot find file ${pathToGit}`);
        }
    }

    return gitDir;
};
