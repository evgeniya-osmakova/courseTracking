import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
    ...nextVitals,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            import: importPlugin,
        },
        rules: {
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    pathGroups: [
                        {
                            pattern: '(utils|global|packages|providers|services|types)/**/*',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '*.css',
                            patternOptions: { matchBase: true },
                            group: 'index',
                            position: 'after',
                        },
                    ],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            
            indent: [
                'error',
                4,
                {
                    ignoredNodes: ['JSXElement'],
                    SwitchCase: 1,
                },
            ],
            
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-unexpected-multiline': 'error',
            'no-unreachable': 'error',
            
            'react/no-unknown-property': 'warn',
            
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'never',
                    named: 'never',
                    asyncArrow: 'always',
                },
            ],
        },
    },
    
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),
])
