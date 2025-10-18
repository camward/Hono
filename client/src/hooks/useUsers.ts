import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import type { User } from '../types/user';

type GetUsersResponse = User[];
type AddUserRequest = Pick<User, 'fio'>;
type AddUserResponse = User;

type UpdateUserStatusRequest = Pick<User, 'id' | 'status'>;
type UpdateUserStatusResponse = User;

const baseUrl = 'http://localhost:3000/api';

// Хук для получения списка пользователей
export function useGetUsers(): UseQueryResult<GetUsersResponse> {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/users`);
      return response.json();
    },
  });
}

// Хук для добавления пользователя
export function useAddUser(): UseMutationResult<
  AddUserResponse,
  unknown,
  AddUserRequest,
  unknown
> {
  return useMutation({
    mutationFn: async ({ fio }: AddUserRequest) => {
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fio }),
      });
      return response.json();
    },
  });
}

// Хук для обновления статуса
export function useUpdateUserStatus(): UseMutationResult<
  UpdateUserStatusResponse,
  unknown,
  UpdateUserStatusRequest,
  unknown
> {
  return useMutation({
    mutationFn: async ({ id, status }: UpdateUserStatusRequest) => {
      const response = await fetch(`${baseUrl}/users/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
  });
}
