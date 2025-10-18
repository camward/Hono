import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { Hono } from "hono";
import userRoutes from "./routes/users.js";

const app = new Hono();

app.use("*", logger());

// Регистрация маршрутов
app.route("/users", userRoutes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
