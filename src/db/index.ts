import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "@/db/schema";

export const db: NodePgDatabase<typeof schema> = drizzle(
  process.env.DATABASE_URL!,
  {
    schema,
  },
);
