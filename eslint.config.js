import js from "@eslint/js";
import eslint_prettier from "eslint-config-prettier";
import tsplugin from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";

import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ resolvePluginsRelativeTo: __dirname });

export default [
    ...compat.config({
        overrides: [
            {
                files: ["src/**/*.ts"]
            }
        ],
        extends: ["plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-type-checked"],
        plugins: ["@typescript-eslint"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
            project: true,
            tsconfigRootDir: __dirname
        },
        ignorePatterns: ["**/**.js"],
        root: true
    }),
    {
        files: ["src/*.{mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ignores: ["**/*.js", "node_modules/*"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                sourceType: "module",
                ecmaFeatures: { modules: true },
                ecmaVersion: "latest"
            },
            globals: {
                ...globals.node
            }
        },
        plugins: {
            eslint_prettier,
            tsplugin
        },
        rules: {
            ...js.configs.recommended.rules,
            ...eslint_prettier.rules
        }
    },
    eslint_prettier
];
