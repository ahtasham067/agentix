import { defineConfig, devices } from "@playwright/test";
import { TEST_MAIL_ENV } from "./scripts/test-mail-env.mjs";

// Local Supabase keys for database assertions (written by `npm run db:env`).
try {
  process.loadEnvFile(".env.local");
} catch {
  // CI provides the variables directly.
}

const PORT = Number(process.env.TEST_PORT ?? 3000);
const baseURL = `http://localhost:${PORT}`;
// Smoother, platform-independent text rendering for screenshots.
const launchOptions = { args: ["--font-render-hinting=none"] };

export default defineConfig({
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 3,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL, trace: "retain-on-failure", launchOptions },
  projects: [
    {
      name: "desktop",
      testDir: "tests/e2e",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, launchOptions },
    },
    {
      name: "mobile",
      testDir: "tests/e2e",
      use: { ...devices["Pixel 7"], launchOptions },
    },
    {
      name: "visual",
      testDir: "tests/visual",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
        launchOptions,
      },
    },
    {
      name: "seo",
      testDir: "tests/seo",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, launchOptions },
    },
  ],
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: "ignore",
    stderr: "pipe",
    // Mail goes to the local Mailpit, never to a real inbox.
    env: TEST_MAIL_ENV,
  },
});
