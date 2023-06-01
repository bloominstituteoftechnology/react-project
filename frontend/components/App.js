import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const StyledApp = styled.div`
  padding: 1rem;
  width: 100%;
  background-color: lightskyblue;
  // button { margin-left: 4px; }
`

export default function App() {
  const [todos, setTodos] = useState([])

  const getAll = () => fetch('http://localhost:9000/api/todos')
    .then(res => res.json())
    .then(data => setTodos(data))

  const toggle = id => axios.patch(`http://localhost:9000/api/todos/${id}`)
    .then(res => setTodos(res.data))

  useEffect(() => { getAll() }, [])

  return (
    <StyledApp>
      <h2>React Todos</h2>
      <ul>
        {
          todos.map(todo => (
            <li key={todo.id}>
              <span>{todo.name} {todo.complete ? 'DONE' : 'pending'}</span>
              <button onClick={() => toggle(todo.id)}>
                {todo.complete ? 'uncomplete' : 'complete'}
              </button>
            </li>
          ))
        }
      </ul>
    </StyledApp>
  )
}
