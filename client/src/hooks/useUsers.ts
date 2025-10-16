import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '../types/user';

type GetUsersResponse = User[];
type AddUserRequest = Pick<User, 'fio'>;
type AddUserResponse = User;

// Хук для получения списка пользователей
export function useGetUsers(): UseQueryResult<GetUsersResponse> {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fio }: AddUserRequest) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fio }),
      });
      return response.json();
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(['users'], (oldUsers: User[] | undefined) =>
        oldUsers ? [...oldUsers, newUser] : [newUser],
      );
    },
  });
}
