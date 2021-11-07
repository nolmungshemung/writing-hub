import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import { Todo } from './todo.model';
import { getTodos, createTodo, updateTodo, deleteTodo } from './todo.api';

export function useTodoList(
  /**
   * @see https://github.com/tannerlinsley/react-query/discussions/1195
   * query variables가 필요할 때
   */
  /**
   * @see https://github.com/tannerlinsley/react-query/discussions/1477
   * TQueryFnData : Query 함수의 반환 데이터
   * TError: Query 함수의 에러 반환값
   * TData: Query 함수의 최종 데이터
   */
  options:
    | UseQueryOptions<Todo[], AxiosError<unknown>, Todo[]>
    | undefined = {},
) {
  return useQuery<Todo[], AxiosError>('todos', getTodos, {
    retry: 2,
    ...options,
  });
}

export function useCreateTodo(
  /**
   * TData: 결과값
   * TError
   * TVariables: mutation variables
   */
  options: UseMutationOptions<
    AxiosResponse<unknown>,
    AxiosError<unknown>,
    Todo
  >,
) {
  return useMutation<AxiosResponse<unknown>, AxiosError, Todo>(
    'createTodo',
    createTodo,
    {
      retry: false,
      ...options,
    },
  );
}

export function useUpdateTodo(
  options: UseMutationOptions<
    AxiosResponse<unknown>,
    AxiosError<unknown>,
    Todo
  >,
) {
  return useMutation<AxiosResponse<unknown>, AxiosError, Todo>(
    'updateTodo',
    updateTodo,
    {
      retry: false,
      ...options,
    },
  );
}

export function useDeleteTodo(
  options: UseMutationOptions<
    AxiosResponse<unknown>,
    AxiosError<unknown>,
    { id: number }
  >,
) {
  return useMutation<AxiosResponse<unknown>, AxiosError, { id: number }>(
    'deleteTodo',
    deleteTodo,
    {
      retry: false,
      ...options,
    },
  );
}
