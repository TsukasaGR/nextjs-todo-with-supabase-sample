import { toUnicode } from 'punycode';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Button from '../components/button';
import ToDo, { IToDo } from '../components/todo';
import { supabase } from '../utils/supabaseClient';

const Home: NextPage = () => {
  const [title, setTitle] = useState(``);
  const [todos, setTodos] = useState<IToDo[]>([]);

  const inProgressToDo = (): IToDo[] => todos.filter((todo) => todo.status === `todo`);
  const doneToDo = (): IToDo[] => todos.filter((todo) => todo.status === `done`);
  const removedToDo = (): IToDo[] => todos.filter((todo) => todo.status === `removed`);

  const add = async () => {
    if (!title) {
      alert(`タイトル未入力`);
      return;
    }
    const { data: todo, error } = await supabase
      .from(`todos`)
      .insert({ title, status: `todo` }, { returning: `minimal` });
    console.log(`todo = `, todo);
    if (error) {
      console.error(error);
      throw new Error(`Supabase登録エラー`);
    }
    refreshToDos();
    setTitle(``);
    return todo;
  };

  const update = async (id: number, status: `todo` | `done` | `removed`) => {
    const { data: todo, error } = await supabase.from(`todos`).update({ status }).match({ id });
    console.log(`todo = `, todo);
    if (error) {
      console.error(error);
      throw new Error(`Supabase登録エラー`);
    }
    refreshToDos();
  };

  const refreshToDos = async () => {
    const { data: todos, error, status } = await supabase.from(`todos`).select();
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw new Error(`Supabase登録エラー`);
    }
    setTodos(todos as IToDo[]);
    console.log(todos);
  };

  useEffect(() => {
    refreshToDos();
  }, []);

  return (
    <div className=''>
      <Head>
        <title>Next.js x Supabase's ToDo App</title>
        <meta name='description' content={`Next.js x Supabase's ToDo App`} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container py-8 mx-auto'>
        <h1 className='text-4xl'>Next.js x Supabase's ToDo App</h1>
        <div className='p-6 m-4 w-full bg-blue-50 rounded shadow'>
          <div className='flex mt-4 mb-16'>
            <input
              className='py-2 px-3 mr-4 w-full text-gray-600 rounded border shadow appearance-none'
              placeholder='Add Todo'
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button color='green' onClick={add}>
              Add
            </Button>
          </div>
          <div>
            {/* ToDoアイテム */}
            {inProgressToDo().length > 0 && (
              <>
                <p className='text-2xl font-bold'>ToDo Item</p>
                {inProgressToDo().map((todo) => {
                  return <ToDo todo={todo} update={update} key={todo.id} />;
                })}
              </>
            )}
            {/* Doneアイテム */}
            {doneToDo().length > 0 && (
              <>
                <p className='text-2xl font-bold'>Done Item</p>
                {doneToDo().map((todo) => {
                  return <ToDo todo={todo} update={update} key={todo.id} />;
                })}
              </>
            )}
            {/* Removedアイテム */}
            {removedToDo().length > 0 && (
              <>
                <p className='text-2xl font-bold'>Removed Item</p>
                {removedToDo().map((todo) => {
                  return <ToDo todo={todo} update={update} key={todo.id} />;
                })}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
