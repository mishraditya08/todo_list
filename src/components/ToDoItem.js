import React from 'react';

const TodoItem = ({ task, deleteTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-500';  // Red for Urgent
      case 'High':
        return 'bg-yellow-500';  // Yellow for High
      case 'Low':
        return 'bg-green-500';  // Green for Low
      default:
        return 'bg-red-500';  // Default gray
    }
  };

  return (
    <div className={`p-4 mb-4 rounded shadow-lg flex justify-between items-center ${getPriorityColor(task.priority)}`}>
      <div>
        <h2 className="text-xl font-semibold">{task.name}</h2>
        <p className="text-gray-300">{task.category}</p>
        <p className="text-m text-gray-100">Due: {task.dueDate}</p>
      </div>
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
