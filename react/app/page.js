'use client';

import React from 'react';

export default function Home() {
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Apprendre React', done: false },
    { id: 2, text: 'Faire les courses', done: true },
    { id: 3, text: 'Aller courir', done: false },
  ]);

  const [newTask, setNewTask] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = newTask.trim();

    // Verify task content
    if (!trimmed) {
      setError('La tâche ne peut pas être vide.');
      return;
    }

    // Verify task length
    if (trimmed.length > 50) {
      setError('La tâche ne doit pas dépasser 50 caractères.');
      return;
    }

    // Verify exist task
    if (tasks.some((t) => t.text.toLowerCase() === trimmed.toLowerCase())) {
      setError('Cette tâche existe déjà.');
      return;
    }

    // Add task
    setTasks([
      { id: 'task-' + Date.now(), text: trimmed, done: false },
      ...tasks,
    ]);
    setNewTask('');
    setError('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const allDone = tasks.length > 0 && tasks.every((t) => t.done);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-xl shadow">
        <h1 className="text-xl font-bold mb-3">Todo List</h1>

        <form onSubmit={handleSubmit} className="flex mb-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 p-2 border rounded-l"
            placeholder="Nouvelle tâche..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded-r"
          >
            Ajouter
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {allDone ? (
          <p className="text-green-600 font-semibold">
            Toutes les tâches sont terminées 🎉
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((t) => (
              <li key={t.id}>
                <label
                  htmlFor={t.id}
                  className="flex items-center space-x-2 p-2 bg-white rounded shadow-sm"
                >
                  <input
                    id={t.id}
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTask(t.id)}
                  />
                  <span className={t.done ? 'line-through text-gray-500' : ''}>
                    {t.text}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
