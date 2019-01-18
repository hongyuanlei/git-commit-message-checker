# git-commit-message-checker

git-commit-message-checker is a tools for checking whether your commit message is valid or not. If not, your commit will fail.

## Installation

```shell
npm install --save-dev git-commit-message-checker
```

## How to use
  git-commit-message-checker need to be used with [Husky](https://github.com/typicode/husky).
  Add this config to package.json
  ```
  "scripts": {
     "commitmsg": "check-git-commit-msg --max-length=150 --pattern=\"/^\[[\w-]*\]\s\w*(\s&\s\w*)?\s?:.*/\"",
     ....
  }
  ```

### --pattern
The default commit message `pattern` is:

    /^\[[\w-]*\]\s\w*(\s&\s\w*)?\s?:.*/

It can allow the commit message like this:

- `[CardNumber] author: commit purpose`
- `[CardNumber] author1 & author2: commit purpose`

### --max-length

The default commit message `max-length` is `150`, you can change it in the command line