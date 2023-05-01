import React, { useState } from 'react';
import { WorkBoxLayout } from '../WorkBoxLayout';
import { TITLE_INDEX_DB } from '../../constants';
import { Todo } from '../../services/db';
import { ListItems } from '../ListItems';

import styles from './styles.module.scss';

const generateTodoItem = (): Todo => ({
  id: Math.round(Math.random() * 100),
  name: Math.random().toString(36).substring(2, 7),
  comment: Math.random().toString(36).substring(2, 7),
});

export function IndexDB() {
  const [todoElement, setTodoElement] = useState<Todo | null>(null);
  return (
    <WorkBoxLayout title={TITLE_INDEX_DB}>
      <div className={styles.container}>
        <button onClick={() => setTodoElement(generateTodoItem())}>Сгенерировать элемент</button>
        {todoElement && <ListItems element={todoElement} />}
      </div>
    </WorkBoxLayout>
  );
}
