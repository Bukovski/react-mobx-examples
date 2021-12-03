import React from 'react';
import { configure } from 'mobx';
import { Provider } from "mobx-react";

import { Counter, counterState } from "./1.Counter";
import TodoComponent from "./1.HelloTwoStore";
import { NameCounter, nameStore } from "./2.NameCounter";
import { appStore, Controls, TableControls } from "./3.TableControlsAsync";
import { AnimalCounter, giraffe } from "./4.AnimalAutorun";
import { BooksContainer, booksStore } from "./5.BookInject";
import { Birds, singletonBird } from "./5.BirdInject";
import { Home, store, StoreProvider, Username } from "./6.StoreContext";


configure({ enforceActions: 'observed' });


const App = () => {
  return (
    <div className="app">
      <Counter store={ counterState } />
      <TodoComponent />
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
  
        <hr/>
  
        <Username />
      </StoreProvider>
    </div>
  );
}


export default App;
