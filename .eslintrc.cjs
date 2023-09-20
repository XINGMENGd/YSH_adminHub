module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script",
            }
        }
    ],
    "parserOptions": {
        "parser": '@typescript-eslint/parser',
        "ecmaVersion": "latest",
        "sourceType": "module",
        "extraFileExtensions": [".vue"]
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        // "no-console":VITE_ESLINT
        "no-console": "off",
        '@typescript-eslint/no-explicit-any': 'off', // 允许ts使用any
        "@typescript-eslint/method-signature-style": ["error", "method"],
        "semi": ['error', 'never'], // 要求或禁止使用分号代替 ASI
        "eqeqeq": 'off', // 要求使用 === 和 !==
        "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
        '@typescript-eslint/no-unused-expressions': 'off', // 允许使用未使用的表达式，包括三元运算符。
        '@typescript-eslint/promise-function-async': ['off', {
            allowedPromiseNames: [],
            checkArrowFunctions: false,
            checkFunctionDeclarations: false,
            checkMethodDeclarations: false,
        }],
        '@typescript-eslint/no-misused-promises': 'off',
        'vue/multi-word-component-names': 'off', // 不再强制要求组件名
    }
}
