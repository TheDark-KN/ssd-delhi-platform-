import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Legacy Convex/admin modules are being retired incrementally during the Supabase migration.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "react/no-unescaped-entities": "off",
      // Legacy files use @ts-nocheck during the incremental migration to Supabase.
      "@typescript-eslint/ban-ts-comment": "off",
      // setMounted(true) inside useEffect is the standard Next.js SSR hydration pattern.
      "react-hooks/set-state-in-effect": "off",
      // debounce() wrapped in useCallback is intentional in useFormPersistence.
      "react-hooks/use-memo": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
