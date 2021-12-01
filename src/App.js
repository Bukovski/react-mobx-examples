import React from 'react';
import { observer } from 'mobx-react';
import { configure, makeAutoObservable } from 'mobx';


configure({ enforceActions: 'observed' });


class TodoStore {
  todos = [
    { id: 1, title: "some text 1", completed: false, count: 4 },
    { id: 2, title: "some text 12", completed: false, count: 2 },
    { id: 3, title: "some text 123", completed: false, count: 8 },
  ];
  
  constructor() {
    makeAutoObservable(this) // автоматически настраивает store
    
    // { id: 7, title: { name: "some name", label: "text" }, completed: false },
    // makeAutoObservable(this, {}, { deep: true }) // глубокое отслеживанеи вложенных данных
    
    // makeObservable(this, { todos: observable, addTodo: action, counter: completed }) // в ручную указываем к чему относить свойства класса
  }
  
  addTodo(todo) {
    this.todos.push(todo);
  }
  
  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }
  
  completeTodo(id) {
    this.todos = this.todos.map(todo => (todo.id === id) ? { ...todo, completed: !todo.completed } : todo)
  }
  
  get counter() {
    let count = 0;
    
    this.todos.forEach(todo => count += (todo.completed) ? todo.count : 0);
    
    return count;
  }
  
  fetchUser() {
    fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(json => {
        const res = json.results[ 0 ]
        const transform = { id: res.login.md5, title: res.name.title + " " + res.name.first, completed: false, count: res.dob.age }
        
        // this.todos = [ ...this.todos, transform ];
        this.todos.push(transform);
      })
  }
}

const store = new TodoStore();

/**********/

// observer - заставляет компонент обновиться если данные в store изменились
const Todo = observer(() => {
  return (
    <div>
      { store.counter }
      
      { store.todos.map(todo =>
        <div className="todo" key={ todo.id }>
          <input
            type="checkbox"
            checked={ todo.completed }
            onChange={ () => store.completeTodo(todo.id) }
          />
          { todo.title }
          <button onClick={ () => store.removeTodo(todo.id) }>X</button>
        </div>
      )}
      
      <button onClick={ () => store.fetchUser() }>More Users</button>
    </div>
  )
})


const App = () => {
  
  return (
    <div className="app">
      <Todo />
    </div>
  );
}


export default App;
