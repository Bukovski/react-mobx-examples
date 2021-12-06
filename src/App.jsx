import React from 'react';

import Examples from "./mini-examples/examples.container";
import { TodoNew, TodoList } from "./components";

import './App.css';


const App = () => {
  return (
    <div className="app">
      {/*<Examples />*/}
      
      <TodoNew />
      <TodoList />
    </div>
  );
}


export default App;
