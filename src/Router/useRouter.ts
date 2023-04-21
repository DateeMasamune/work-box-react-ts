import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

export const useRouter = () => {
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname);

  const routerNavigate = useCallback((url: string) => {
    setCurrentUrl(url);
    window.history.pushState({}, '', url);
  }, []);

  const routerContextValue = useMemo(() => ({
    routerNavigate,
  }), [routerNavigate]);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setCurrentUrl(window.location.pathname);
    });
  }, []);

  return {
    currentUrl,
    routerContextValue,
  };
};
