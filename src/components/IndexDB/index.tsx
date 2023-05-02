import React, { useEffect, useState } from 'react';
import { WorkBoxLayout } from '../WorkBoxLayout';
import { TITLE_INDEX_DB } from '../../constants';
import { Todo, db } from '../../services/db';
import { ListItems } from '../ListItems';

import styles from './styles.module.scss';

const generateTodoItem = (): Todo => ({
  id: Math.round(Math.random() * 5),
  name: Math.random().toString(36).substring(2, 7),
  comment: Math.random().toString(36).substring(2, 7),
});

export function IndexDB() {
  const [todoElement, setTodoElement] = useState<Todo | null>(null);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const saveInIndexDB = async () => {
    if (todoElement) {
      await db.todo.put(todoElement);
      setTodoElement(null);
      setTodoList((prevState) => (
        [...prevState.filter(({ id }) => id !== todoElement.id), todoElement]
      ));
    }
  };

  const getTodoListFromIndexDB = async () => {
    const todoAllList = await db.table('todo').toArray();
    setTodoList(todoAllList);
  };

  const clearTodoListFromIndexDB = async () => {
    await db.todo.clear();
    setTodoList([]);
  };

  useEffect(() => {
    getTodoListFromIndexDB();
  }, []);

  return (
    <WorkBoxLayout title={TITLE_INDEX_DB}>
      <div className={styles.container}>
        <div>
          {todoList.map(({ id, name, comment }) => (
            <div className={styles.todoItem} key={id}>
              <span>
                {`id: ${id}`}
              </span>
              <span>
                {`name: ${name}`}
              </span>
              <span>
                {`comment: ${comment}`}
              </span>
            </div>
          ))}
        </div>
        <button onClick={() => setTodoElement(generateTodoItem())}>Сгенерировать элемент</button>
        {todoElement && <ListItems element={todoElement} />}
        <button onClick={saveInIndexDB}>
          Добавить элемент в таблицу
        </button>
        <button onClick={clearTodoListFromIndexDB}>
          Очистить таблицу
        </button>
      </div>
    </WorkBoxLayout>
  );
}
