import React from 'react';
import { configure } from 'mobx';

import { Counter, counterState } from "./Counter";
import { NameCounter, nameStore } from "./NameCounter";
import { appStore, Controls, TableControls } from "./TableControlsAsync";
import { AnimalCounter, giraffe } from "./AnimalAutorun";


configure({ enforceActions: 'observed' });


const App = () => {
  return (
    <div className="app">
      <Counter store={ counterState } />
      <NameCounter name={ nameStore } />
  
      <hr/>
      
      <Controls store={ appStore } />
      <TableControls store={ appStore } />
      
      <hr/>
  
      <AnimalCounter animalStore={ giraffe }/>
    </div>
  );
}


export default App;
