module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": 0,
        "no-unused-vars": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 9
      },
    "globals": {
    "supertest": true,
    "expect": true
    }
};