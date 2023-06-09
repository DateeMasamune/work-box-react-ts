import React, { createContext } from 'react';
import { WorkBoxPreCacheImage } from '../components/WorkBoxPreCacheImage';
import { useRouter } from './useRouter';
import {
  WORK_BOX_PRECACHE_IMAGE, THREAD, BACKGROUND_SYNC, INDEX_DB, OFFLINE,
} from './paths';
import { WorkBoxLayout } from '../components/WorkBoxLayout';
import { Thread } from '../components/Thread';
import { BackgroundSync } from '../components/BackgroundSync';
import { IndexDB } from '../components/IndexDB';
import { Offline } from '../components/Offline';
import { TITLE_PAGE_NOT_FOUND } from '../constants';

interface IRouterContext {
    // eslint-disable-next-line no-unused-vars
    routerNavigate: (url: string) => void
}

export const RouterContext = createContext<IRouterContext>({} as IRouterContext);

export function RouterContextProvider() {
  const { currentUrl, routerContextValue } = useRouter();

  const renderPage = () => {
    switch (currentUrl) {
      case WORK_BOX_PRECACHE_IMAGE:
      case '/':
        return <WorkBoxPreCacheImage />;

      case THREAD:
        return <Thread />;

      case BACKGROUND_SYNC:
        return <BackgroundSync />;

      case INDEX_DB:
        return <IndexDB />;

      case OFFLINE:
        return <Offline />;

      default:
        return (
          <WorkBoxLayout title={TITLE_PAGE_NOT_FOUND}>
            <div>Страница не найдена</div>
          </WorkBoxLayout>
        );
    }
  };

  return (
    <RouterContext.Provider value={routerContextValue}>
      {renderPage()}
    </RouterContext.Provider>
  );
}
