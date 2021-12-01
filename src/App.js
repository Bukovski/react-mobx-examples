import React from 'react';
import { configure } from 'mobx';

import { Counter, counterState } from "./Counter";
import { NameCounter, nameStore } from "./NameCounter";


configure({ enforceActions: 'observed' });


const App = () => {
  return (
    <div className="app">
      <Counter store={ counterState } />
      <NameCounter name={ nameStore } />
    </div>
  );
}


export default App;
