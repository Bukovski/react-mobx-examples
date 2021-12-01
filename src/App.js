import React from 'react';
import { configure } from 'mobx';
import { Counter, counterState } from "./Counter";

configure({ enforceActions: 'observed' });


const App = () => {
  return (
    <div className="app">
      <Counter store={ counterState } />
    </div>
  );
}


export default App;
