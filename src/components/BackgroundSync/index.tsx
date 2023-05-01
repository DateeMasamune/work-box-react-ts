import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TITLE_BACKGROUND_SYNC } from '../../constants';
import { WorkBoxLayout } from '../WorkBoxLayout';

import styles from './styles.module.scss';
import { ListItems } from '../ListItems';

interface Post {
  title: string
  body: string
  userId: number
}

const generatePost = () => ({
  title: Math.random().toString(36).substring(2, 7),
  body: Math.random().toString(36).substring(2, 7),
  userId: Math.round(Math.random() * 100),
});

export function BackgroundSync() {
  const [post, setPost] = useState<Post | null>(null);

  const sendPost = async () => {
    await axios.post('https://jsonplaceholder.typicode.com/posts', post, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    setPost(null);
  };

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('@@@@@@@@@@@message', event);
    });
  }, []);

  return (
    <WorkBoxLayout title={TITLE_BACKGROUND_SYNC}>
      <div className={styles.post}>
        <button onClick={() => setPost(generatePost())}>
          Создать пост
        </button>
        {post && <ListItems element={post} />}
        <button onClick={sendPost}>
          Отправить пост
        </button>
      </div>
    </WorkBoxLayout>
  );
}
