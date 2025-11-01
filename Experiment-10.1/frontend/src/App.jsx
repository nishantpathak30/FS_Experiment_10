import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Create new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue }),
      });
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      setInputValue('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle complete status
  const toggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Start editing
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edit
  const saveEdit = async (id) => {
    if (!editingText.trim()) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editingText }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
      setEditingId(null);
      setEditingText('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>✓ Todo App</h1>
          <p className="subtitle">Organize your tasks efficiently</p>
        </header>

        <form onSubmit={addTodo} className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
            disabled={loading}
          />
          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? '...' : 'Add'}
          </button>
        </form>

        {totalCount > 0 && (
          <div className="stats">
            <span>{completedCount} of {totalCount} completed</span>
          </div>
        )}

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <p>No todos yet. Add one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo._id, todo.completed)}
                    className="checkbox"
                  />
                  
                  {editingId === todo._id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="edit-input"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(todo._id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                    />
                  ) : (
                    <span className="todo-text">{todo.text}</span>
                  )}
                </div>

                <div className="todo-actions">
                  {editingId === todo._id ? (
                    <>
                      <button onClick={() => saveEdit(todo._id)} className="save-btn">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="cancel-btn">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(todo._id, todo.text)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => deleteTodo(todo._id)} className="delete-btn">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
