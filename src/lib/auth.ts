import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { mcp } from "better-auth/plugins";

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "http://192.168.18.10:3000",
  ],
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  user: {
    modelName: "userTable",
  },
  session: {
    modelName: "sessionTable",
  },
  account: {
    modelName: "accountTable",
  },
  verification: {
    modelName: "verificationTable",
  },
  plugins: [
    mcp({
      loginPage: "/sign-in", // path to your login page
    }),
  ],
});
