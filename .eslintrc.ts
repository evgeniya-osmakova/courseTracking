// @ts-ignore
import reactCompiler from 'eslint-plugin-react-compiler'

export default [
  {
    extends: "next/core-web-vitals",
    plugins: {
      "react-compiler": reactCompiler,
  },
  rules: {
    "react-compiler/react-compiler": "error",
    quotes: [2, "single", "avoid-escape"],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          [
            "builtin",
            "external"
          ],
          [
            "internal",
            "index",
            "parent",
            "sibling"
          ],
          "unknown"
        ],
        pathGroups: [
          {
            pattern: "(utils|global|packages|providers|services|types)/**/*",
            group: "internal",
            position: "before"
          },
          {
            pattern: "*.css",
            patternOptions: {
              matchBase: true
            },
            group: "unknown",
            position: "after"
          }
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ],
    indent: [
      "error",
      4,
      {
        ignoredNodes: [
          "JSXElement"
        ],
        SwitchCase: 1
      }
    ],
    "no-console": 1,
    "no-debugger": 2,
    "no-unexpected-multiline": 2,
    "no-unreachable": 2,
    "react/no-unknown-property": 1,
    semi: "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always"
      }
    ]
  }
}]
