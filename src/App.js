import React from 'react';
import { configure } from 'mobx';

import { Counter, counterState } from "./Counter";
import { NameCounter, nameStore } from "./NameCounter";
import { appStore, Controls, TableControls } from "./TableControlsAsync";


configure({ enforceActions: 'observed' });


const App = () => {
  return (
    <div className="app">
      <Counter store={ counterState } />
      <NameCounter name={ nameStore } />
  
      <hr/>
      
      <Controls store={ appStore } />
      <TableControls store={ appStore } />
    </div>
  );
}


export default App;
