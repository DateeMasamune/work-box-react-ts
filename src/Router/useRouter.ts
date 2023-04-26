import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

const { pathname } = window.location;

export const useRouter = () => {
  const [currentUrl, setCurrentUrl] = useState(pathname);

  const routerNavigate = useCallback((url: string) => {
    setCurrentUrl(url);
    window.history.pushState({}, '', url);
  }, []);

  const routerContextValue = useMemo(() => ({
    routerNavigate,
  }), [routerNavigate]);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setCurrentUrl(document.location.pathname);
    });
  }, []);

  return {
    currentUrl,
    routerContextValue,
  };
};
