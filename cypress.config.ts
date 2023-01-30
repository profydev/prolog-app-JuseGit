import { defineConfig } from "cypress";
import { loadEnvConfig } from "@next/env";

const { combinedEnv } = loadEnvConfig(process.cwd());

export default defineConfig({
  retries: {
    runMode: 2,
    openMode: 1,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: combinedEnv,
});
