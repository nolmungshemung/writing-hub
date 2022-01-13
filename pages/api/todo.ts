import type { NextApiRequest, NextApiResponse } from 'next';

type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

let initialState: Todo[] = [
  { id: 0, text: 'React-Query 스터디', isDone: false },
  { id: 1, text: 'jest 스터디', isDone: false },
  { id: 2, text: 'msw 스터디', isDone: false },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (req.method) {
    case 'GET':
      res.status(200).json(initialState);
      break;
    case 'POST':
      initialState.push(body);
      res.status(200).json({ message: 'create todo success' });
      break;
    case 'PUT':
      initialState = initialState.map((todo) => {
        if (todo.id === body.id) {
          return {
            ...todo,
            ...body,
          };
        } else {
          return todo;
        }
      });
      res.status(200).json({ message: 'update todo success' });
      break;
    case 'DELETE':
      initialState = initialState.filter((todo) => todo.id !== body.id);
      res.status(200).json({ message: 'delete todo success' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
