import React from 'react';

import Examples from "./mini-examples/examples.container";
import { TodoNew, TodoList } from "./components";


const App = () => {
  return (
    <div className="App">
      <Examples />
      
      <div className="todoList">
        <TodoNew />
        <TodoList />
      </div>
    </div>
  );
}


export default App;
