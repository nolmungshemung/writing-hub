import axios from 'axios';
import { Todo } from './todo.model';

const ENDPOINT = 'http://localhost:3000/api';

export async function getTodos() {
  const { data } = await axios.get<Todo[]>(`${ENDPOINT}/todo`);
  return data;
}

export async function createTodo(requestBody: Todo) {
  return axios.post<unknown>(`${ENDPOINT}/todo`, requestBody);
}

export async function updateTodo(requestBody: Todo) {
  return await axios.put<unknown>(`${ENDPOINT}/todo`, requestBody);
}

export async function deleteTodo(data: { id: number }) {
  return await axios.delete<unknown>(`${ENDPOINT}/todo`, {
    data,
  });
}
