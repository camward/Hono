import { Hono } from 'hono';

export const userRoutes = new Hono(); // отдельный экземпляр Hono для группы маршрутов

// Простые маршруты CRUD для пользователей
userRoutes.get('/list', async (c) => {
  return c.json({ message: 'Список всех пользователей' });
});

userRoutes.post('/add', async (c) => {
  return c.json({ message: 'Пользователь добавлен' });
});

userRoutes.put('/update/:id', async (c) => {
  const id = c.req.param('id');
  return c.json({ message: `Пользователь ${id} обновлён` });
});

userRoutes.delete('/delete/:id', async (c) => {
  const id = c.req.param('id');
  return c.json({ message: `Пользователь ${id} удалён` });
});

export default userRoutes;