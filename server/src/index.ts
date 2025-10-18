import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { Hono } from "hono";
import userRoutes from "./routes/users.js";

const app = new Hono();

// Включаем обработку CORS
app.use('*', cors());

// Включаем логирование
app.use("*", logger());

// Регистрация маршрутов
app.route("/api", userRoutes);

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
