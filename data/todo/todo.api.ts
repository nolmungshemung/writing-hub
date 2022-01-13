import axios from 'axios';
import { Todo } from './todo.model';

const ENDPOINT = '/api';

export async function getTodos() {
  const { data } = await axios.get<Todo[]>(`${ENDPOINT}/todo`);
  return data;
}

export async function createTodo(requestBody: Todo) {
  return axios.post<unknown>(`${ENDPOINT}/todo`, requestBody);
}

export async function updateTodo(requestBody: Todo) {
  const response = await axios.put<unknown>(`${ENDPOINT}/todo`, requestBody);
  return response;
}

export async function deleteTodo(data: { id: number }) {
  const response = await axios.delete<unknown>(`${ENDPOINT}/todo`, {
    data,
  });
  return response;
}
