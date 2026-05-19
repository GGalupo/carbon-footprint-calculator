import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const sharedSrc = fileURLToPath(new URL("../../packages/shared/src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@shared": sharedSrc,
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
