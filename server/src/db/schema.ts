import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fio: varchar("fio", { length: 255 }).notNull(),
  date: timestamp("date").defaultNow(),
  status: text("status").default("active"),
});
