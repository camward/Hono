import { Hono } from "hono";
import type { User } from "../entity/user/types.js";

export const userRoutes = new Hono(); // отдельный экземпляр Hono для группы маршрутов

let users: User[] = [
  {
    id: 1,
    fio: "Иванов Иван Иванович",
    date: "2023-01-01",
    status: "active",
  },
  {
    id: 2,
    fio: "Петрова Анна Сергеевна",
    date: "2023-02-01",
    status: "inactive",
  },
  {
    id: 3,
    fio: "Васильев Алексей Петрович",
    date: "2023-03-01",
    status: "active",
  },
];

// Получение списка пользователей
userRoutes.get("/users", async (c) => {
  return c.json(users);
});

// Добавление нового пользователя
userRoutes.post("/users", async (c) => {
  try {
    const body = await c.req.json();
    if (!body.fio) throw new Error("Поле ФИО обязательно для заполнения");

    // Генерация ID (для простоты используем инкрементальный счётчик)
    let nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: nextId,
      fio: body.fio,
      date: new Date().toISOString(),
      status: "active",
    };

    users.push(newUser);

    return c.json({ success: true, data: newUser });
  } catch (err) {
    return c.json({ err }, 400);
  }
});

// Обновление статуса пользователя
userRoutes.patch("/users/:id/status", async (c) => {
  const idParam = Number(c.req.param("id"));
  const body = await c.req.json();

  if (!body.status)
    return c.json({ error: "Поле статус обязательно для заполнения" }, 400);

  const foundIndex = users.findIndex((user) => user.id === idParam);

  if (foundIndex !== -1) {
    users[foundIndex].status = body.status;
    return c.json({ success: true, updatedUser: users[foundIndex] });
  } else {
    return c.json({ error: "Пользователь не найден" }, 404);
  }
});

export default userRoutes;
