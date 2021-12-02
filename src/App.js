import React from 'react';
import { configure } from 'mobx';
import { Provider } from "mobx-react";

import { Counter, counterState } from "./Counter";
import { NameCounter, nameStore } from "./NameCounter";
import { appStore, Controls, TableControls } from "./TableControlsAsync";
import { AnimalCounter, giraffe } from "./AnimalAutorun";
import { BooksContainer, booksStore } from "./BookInject";
import { Birds, singletonBird } from "./BirdInject";
import { Home, store, StoreProvider, Username } from "./StoreContext";


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
      
      <hr/>
  
      <Provider
        booksStore={ booksStore }
        BirdStore={ singletonBird } color={ "orange" }
      >
        <BooksContainer />
        
        <hr/>
        
        <Birds />
      </Provider>
  
      <StoreProvider store={ store }>
        <Home />
        <Username />
      </StoreProvider>
    </div>
  );
}


export default App;
