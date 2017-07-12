# validate-git-commit-message
GIT COMMIT-MSG hook for validating commit message.

`$ validate-commit-msg` creates a symbolic link `.git/hooks/commit-msg` 
to `./lib/validate-commit-msg.js` which is executed on every commit.

The hook script validates commit messages on each commit according 
to
`[CardNumber] author: commit purpose`
`[CardNumber] author1 & author2: commit purpose`.

## Installation

```shell
yarn add -D validate-commit-message
```

