import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

const initialTodoItems = [
  {
    id: '123',
    isDone: false,
    description: 'Buy some milk'
  }
]

function App() {
  const [todoItems, setTodoItems] = useState(initialTodoItems)
  const [newItemDescription, setNewItemDescription] = useState('')

  const handleNewItemDescription = (e) => {
    setNewItemDescription(e.target.value)
  }

  const addItem = () => {
    setTodoItems((items) => {
      const newItem = {
        id: nanoid(),
        description: newItemDescription,
        isDone: false,
      }
      return [...items, newItem]
    })
    setNewItemDescription('')
  }

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
          {todoItems.map(({ id, isDone, description }) =>
            <li key={id}>
              <label htmlFor="id">
                <input type="checkbox" checked={isDone} id={id} />
                {description}
              </label>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default App
