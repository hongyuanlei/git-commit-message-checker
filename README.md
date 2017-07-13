# validate-git-commit-message


### Validate rules:
- `[CardNumber] author: commit purpose `
- `[CardNumber] author1 & author2: commit purpose`

## Installation

```shell
yarn add -D validate-git-commit-message
```

## How to use
  This `validate` need to be used with [Husky](https://github.com/typicode/husky) .
  Add this config to package.json
  ```
  "scripts": {
     "commitmsg": "validate-git-commit-msg",
     ....
  }
  ```
