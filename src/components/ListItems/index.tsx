import React from 'react';

interface IProp<T> {
    element: T
}

export function ListItems<T>(props: IProp<T>) {
  const { element } = props;

  if (!element) return null;

  return (
    <div>
      { Object.entries(element).map((position) => {
        const [keyName, value] = position;

        return (
          <div key={keyName}>
            {`${keyName} : ${value}`}
          </div>
        );
      })}
    </div>
  );
}
