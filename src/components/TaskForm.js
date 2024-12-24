import React, { useState } from 'react';

const TaskForm = ({ addTask, categories, addCategory }) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState(''); 
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = isAddingNew ? newCategory.trim() : category;
    if (taskName.trim() === '' || finalCategory === '') return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      priority,
      dueDate,
      category: finalCategory,
    };
    addTask(newTask);
    if (isAddingNew && newCategory.trim() !== '') {
        addCategory(newCategory.trim());

        const updatedCategories = [...categories, newCategory.trim()];
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
      }
    setTaskName('');
    setPriority('Medium');
    setDueDate('');
    setCategory(finalCategory); 
    setNewCategory('');
    setIsAddingNew(false);
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    if (selected === 'new') {
      setIsAddingNew(true);
    } else {
      setCategory(selected);
      setIsAddingNew(false);
    }
  };

  const handleAddNewCategory = (e) => {
    if (e.key === 'Enter' && newCategory.trim() !== '') {
      if (!categories.includes(newCategory.trim())) {
        addCategory(newCategory.trim());
        setCategory(newCategory.trim());
        setNewCategory('');
        setIsAddingNew(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 1000);
      }
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    // Remove tasks associated with this category
    removeTasksByCategory(categoryToDelete);
    // Remove from the local state and localStorage
    const updatedCategories = categories.filter((cat) => cat !== categoryToDelete);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    removeCategory(categoryToDelete);  // Update the parent state
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-6 rounded shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        {!isAddingNew ? (
          <div>
            <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="new">+ New</option>
          </select>
          </div>
        ) : (
            <>
          <input
            type="text"
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-2 border rounded"
            autoFocus
          />
          <button
          type="button"
          onClick={handleAddNewCategory} // Add category when clicked
          className={`bg-green-500 text-white px-4 py-2 rounded mt-2 ${
            saveSuccess ? 'bg-green-700' : ''
          }`}
        >
          {saveSuccess ? 'Category Added!' : 'Add Category'}
        </button>
          </>
        )}
      </div>

      <div className="mb-4">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
          
        />
      </div>

      <div className="mb-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Urgent">Urgent 🔴</option>
          <option value="High">High 🟡</option>
          <option value="Low">Low 🟢</option>
        </select>
      </div>


      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
