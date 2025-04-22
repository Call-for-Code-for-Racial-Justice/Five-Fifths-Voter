// @ts-check
import stylistic from "@stylistic/eslint-plugin";
// @ts-ignore
import tailwind from "eslint-plugin-tailwindcss";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  stylistic.configs["recommended"],
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "tailwindcss/no-custom-classname": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "double"],
      "operator-linebreak": ["error", "none"],
      "vue/block-order": [
        "warn",
        {
          order: [
            "script",
            "template",
            "style",
          ],
        },
      ],
      "vue/component-name-in-template-casing": ["error", "PascalCase", {
        registeredComponentsOnly: false,
        ignores: ["/^cv-/"],
      }],
    },
  },
]);
