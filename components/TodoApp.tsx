"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const STORAGE_KEY = "todo-semuni-tasks";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTodos(JSON.parse(saved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, loaded]);

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos([{ id: ""+Math.random(), text: trimmed, done: false }, ...todos]);
    setText("");
  }

  function toggleTodo(id: string) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTodo(id: string) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <section className="todo-app">
      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="O que você precisa fazer?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty">Nenhuma tarefa ainda. Adicione a primeira acima!</p>
      ) : (
        <>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.done ? "done" : ""}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button
                  className="remove"
                  onClick={() => removeTodo(todo.id)}
                  aria-label="Remover tarefa"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <p className="counter">{remaining} tarefa(s) pendente(s)</p>
        </>
      )}
    </section>
  );
}
