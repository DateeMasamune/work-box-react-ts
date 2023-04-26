import React from 'react';
import { RouterContextProvider } from './Router';
import './App.module.scss';

function App() {
  return (
    <div className="App">
      <RouterContextProvider />
    </div>
  );
}

export default App;
