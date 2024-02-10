import eslint_prettier from "eslint-config-prettier";
import tsplugin from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                sourceType: "module",
                ecmaFeatures: { modules: true },
                ecmaVersion: "latest"
            }
        },
        plugins: {
            eslint_prettier,
            ts: tsplugin
        },
        rules: {
            ...tsplugin.configs["eslint-recommended"].rules
        }
    },
    eslint_prettier
];
