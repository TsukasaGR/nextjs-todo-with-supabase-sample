import Button from './button';

export interface IToDo {
  id: number;
  created_at: string;
  title: string;
  status: `todo` | `done` | `removed`;
}

interface IToDoComponent {
  todo: IToDo;
  update: Function;
}

const ToDo = ({ todo, update }: IToDoComponent) => {
  return (
    <div className='flex gap-2 items-center mb-4' key={todo.id}>
      <p
        className={`w-3/5 ${
          todo.status === `done`
            ? `text-green-400 line-through`
            : todo.status === `removed`
            ? `text-red-400 line-through`
            : ``
        }`}
      >
        {todo.title}
      </p>
      {todo.status !== `todo` && (
        <Button color='gray' modifier='w-1/5' onClick={() => update(todo.id, `todo`)}>
          ReOpen
        </Button>
      )}
      {todo.status !== `done` && (
        <Button color='green' modifier='w-1/5' onClick={() => update(todo.id, `done`)}>
          Done
        </Button>
      )}
      {todo.status !== `removed` && (
        <Button color='red' modifier='w-1/5' onClick={() => update(todo.id, `removed`)}>
          Remove
        </Button>
      )}
    </div>
  );
};

export default ToDo;
