import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TITLE_BACKGROUND_SYNC } from '../../constants';
import { WorkBoxLayout } from '../WorkBoxLayout';

import styles from './styles.module.scss';

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

  const getPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    console.log('==========>posts', data);
  };

  useEffect(() => {
    getPosts();
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log(event.data.msg, event.data.url);
    });
  }, []);

  return (
    <WorkBoxLayout title={TITLE_BACKGROUND_SYNC}>
      <div className={styles.post}>
        <button onClick={() => setPost(generatePost())}>
          Создать пост
        </button>
        {post && (
        <div>
          <div>
            {`title : ${post?.title}`}
          </div>
          <div>
            {`body : ${post?.body}`}
          </div>
          <div>
            {`userId : ${post?.userId}`}
          </div>
        </div>
        )}
        <button onClick={sendPost}>
          Отправить пост
        </button>
      </div>
    </WorkBoxLayout>
  );
}
