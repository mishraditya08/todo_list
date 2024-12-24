import React from 'react';
import TodoList from './components/ToDoList';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">To-Do List App</h1>
      <TodoList />
    </div>
  );
}

export default App;
