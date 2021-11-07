import { useQueryClient } from 'react-query';
import { Todo } from '~/data/todo/todo.model';
import { useUpdateTodo, useDeleteTodo } from '~/data/todo/todo.hooks';
import { ChangeEvent, useState } from 'react';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(todo.text);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const updateMutation = useUpdateTodo({
    onError(error) {
      console.error(error);
    },
  });

  const deleteMutation = useDeleteTodo({
    onSuccess() {
      queryClient.invalidateQueries('todos');
    },
    onError(error) {
      console.error(error);
    },
  });

  const onUpdate = (todo: Todo) => {
    updateMutation.mutate({
      ...todo,
    });
  };

  const onDelete = (id: number) => {
    deleteMutation.mutate({
      id,
    });
  };

  return (
    <div className="Todo__Item" key={todo.id}>
      <p>
        <input type="text" value={value} onChange={onChange} />
        <button className="Update__Button" onClick={() => onUpdate(todo)}>
          Update
        </button>
        <button className="Delete__Button" onClick={() => onDelete(todo.id)}>
          X
        </button>
      </p>
    </div>
  );
}

export default TodoItem;
