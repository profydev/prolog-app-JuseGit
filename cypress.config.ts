import { defineConfig } from "cypress";

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

  env: {
    APP_VERSION: "14.5.2",
  },
});
