import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

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


function App() {
  const [{ data, order }, setTodoItems] = useState(initialTodoItems)
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

  const toggleItem = (itemId: string) => {
    setTodoItems((items) => {
      return items.map((item) => {
        if (item.id === itemId) return {
          ...item,
          isDone: !item.isDone
        }

        return item
      })
    })
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
          {order.map((itemId) => {
            const { id, isDone, description } = data[itemId]
            return <li key={id}>
              <label htmlFor="id">
                <input
                  type="checkbox"
                  checked={isDone}
                  id={id}
                  onClick={() => toggleItem(id)}
                />
                {description}
              </label>
            </li>
          }
          )}
        </ul>
      </div>
    </>
  )
}

export default App
