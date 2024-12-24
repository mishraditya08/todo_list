import React, { useState, useEffect } from 'react';
import TodoItem from './ToDoItem';
import TaskForm from './TaskForm';
import CategoryFilter from './CategoryFilter';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');

  // Load tasks and categories from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || ['Work', 'Personal'];
    setTasks(savedTasks);
    setCategories(savedCategories);
  }, []);

  // Handle task addition
  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Handle category addition
  const addCategory = (newCategory) => {
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  // Handle task deletion
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteCategory = (category) => {
    // Remove category from categories list
    const updatedCategories = categories.filter((cat) => cat !== category);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    // Remove all tasks associated with the deleted category
    const updatedTasks = tasks.filter((task) => task.category !== category);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <CategoryFilter categories={categories} setFilteredCategory={setFilteredCategory} deleteCategory={deleteCategory}/>
      <TaskForm addTask={addTask} categories={categories} addCategory={addCategory} />
      <div className="mt-4">
        {tasks
          .filter((task) => filteredCategory === '' || task.category === filteredCategory)
          .map((task) => (
            <TodoItem key={task.id} task={task} deleteTask={deleteTask} />
          ))}
      </div>
    </div>
  );
};

export default TodoList;
