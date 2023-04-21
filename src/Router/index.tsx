import React, { createContext } from 'react';
import { WorkBox } from '../components/WorkBox';
import { List } from '../components/List';
import { useRouter } from './useRouter';
import { WORK_BOX, LIST } from './paths';

interface IRouterContext {
    // eslint-disable-next-line no-unused-vars
    routerNavigate: (url: string) => void
}

export const RouterContext = createContext<IRouterContext>({} as IRouterContext);

export function RouterContextProvider() {
  const { currentUrl, routerContextValue } = useRouter();

  const renderPage = () => {
    switch (currentUrl) {
      case WORK_BOX:
        return <WorkBox />;
      case LIST:
        return <List />;
      default:
        return <WorkBox />;
    }
  };

  return (
    <RouterContext.Provider value={routerContextValue}>
      {renderPage()}
    </RouterContext.Provider>
  );
}
