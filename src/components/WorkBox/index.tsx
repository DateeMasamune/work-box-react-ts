import React, { useContext } from 'react';

import { RouterContext } from '../../Router';
import { LIST } from '../../Router/paths';

export function WorkBox() {
  const { routerNavigate } = useContext(RouterContext);
  return (
    <div>
      WorkBox
      <button onClick={() => routerNavigate(LIST)}>
        list
      </button>
    </div>
  );
}
