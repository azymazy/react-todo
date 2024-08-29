import { memo, useEffect, useCallback, useRef, useState } from 'react'
import { useImmer } from 'use-immer'
import { nanoid } from 'nanoid'
import './App.css'

// Utility hook
const useRenderCounter = () => {
  const counter = useRef(0)
  useEffect(() => { counter.current++ })

  return counter.current
}

const initialTodoItems = {
  data: {
    '123': {
      id: '123',
      isDone: false,
      description: 'Buy some milk'
    },
    '432': {
      id: '432',
      isDone: false,
      description: 'Sell some milk'
    },

  },
  order: [
    '123',
    '432'
  ]
}

const TodoItem = memo((props) => {
  const { item, toggleItem } = props
  const { id, isDone, description } = item

  const counter = useRenderCounter()

  return (
    <li key={id}>
      [{counter}]
      <label htmlFor={id}>
        <input
          type="checkbox"
          checked={isDone}
          id={id}
          onChange={() => toggleItem(id)}
        />
        {description}
      </label>
    </li>
  )
})

function App() {
  const [{ data, order }, setTodoItems] = useImmer(initialTodoItems)
  const [newItemDescription, setNewItemDescription] = useState('')

  const handleNewItemDescription = (e) => {
    setNewItemDescription(e.target.value)
  }

  const addItem = () => {
    if (!newItemDescription) return

    setTodoItems((todoItemsDraft) => {
      const newId = nanoid()

      const newItem = {
        id: newId,
        description: newItemDescription,
        isDone: false,
      }

      todoItemsDraft.order.push(newId)
      todoItemsDraft.data[newId] = newItem
    })

    setNewItemDescription('')
  }

  const toggleItem = useCallback(
    (itemId: string) => {
      setTodoItems((todoItemsDraft) => {
        todoItemsDraft.data[itemId].isDone = !todoItemsDraft.data[itemId].isDone
      })
    },
    []
  )

  return (
    <>
      <h1>TODO</h1>
      <div>
        <input
          type="text"
          placeholder='Type here...'
          value={newItemDescription}
          onChange={handleNewItemDescription}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <div>
        <ul>
          {order.map((itemId) => <TodoItem
            item={data[itemId]}
            toggleItem={toggleItem}
            key={itemId}
          />)}
        </ul>
      </div>
    </>
  )
}

export default App
