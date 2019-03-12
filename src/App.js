import React, { useState } from 'react';
import './App.css';

// Single todo row component
const Todo = ({todo, index, completeTodo, unCompleteTodo, deleteTodo, upTodo, downTodo}) => {

  return (
    <div  style={{textDecoration: todo.isCompleted ? 'line-through' : ''}} className='todo'>
    {todo.text}
      <div>
      {
        todo.isCompleted ?
          <button onClick={() => unCompleteTodo(index)}>Uncomplete</button>
          :
          <button onClick={() => completeTodo(index)}>Complete</button>
      }
      <button onClick={() => deleteTodo(index)}>Delete</button>

      <button onClick={() => upTodo(index)}>Up</button>
      <button onClick={() => downTodo(index)}>Down</button>
      
        
      </div>
    </div>
  );
}


// Todo form
const TodoForm = ({addTodo}) => {
  const [value , setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        className="input"
        value={value}
        placeholder="Add Todo..."
        onChange={e => setValue(e.target.value)} />
    </form>
  );
}


// App Component
const App = () => {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React Hooks',
      isCompleted: false,
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false,
    },
    {
      text: 'Build really cool to do app',
      isCompleted: false,
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, {text}]
    setTodos(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;    
    setTodos(newTodos);
  }

  const unCompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  }
  

  const deleteTodo = index =>{
    const newTodos = [...todos];
    newTodos.splice(index, 1);

    console.log(newTodos);
    setTodos(newTodos);
  }

  const upTodo = index => {
    const newTodos = [...todos];
    if(index === 0)return;
    const tmpTodo =  newTodos[index - 1];
    newTodos[index - 1] = newTodos[index];
    newTodos[index] = tmpTodo;

    setTodos(newTodos);
  }

  const downTodo = index => {
    const newTodos = [...todos];
    if(index === newTodos.length - 1)return;
    const tmpTodo =  newTodos[index + 1];
    newTodos[index + 1] = newTodos[index];
    newTodos[index] = tmpTodo;

    setTodos(newTodos);
  }


  return(
  
    <div className='app'>
      <div className='todo-list'>
      {
        todos.map((todo, index) => (
        <Todo 
          key={index} 
          index={index} 
          todo={todo} 
          completeTodo={completeTodo} 
          unCompleteTodo={unCompleteTodo} 
          deleteTodo={deleteTodo}
          upTodo={upTodo}
          downTodo={downTodo}
        />
        ))
      }

      <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );


}

export default App;
