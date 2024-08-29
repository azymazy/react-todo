import { useCallback, useState, memo } from 'react'
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

const TodoItem = memo((props) => {
  const {item, toggleItem } = props
  const { id, isDone, description } = item
  return (
    <li key={id}>
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
  const [{ data, order }, setTodoItems] = useState(initialTodoItems)
  const [newItemDescription, setNewItemDescription] = useState('')

  const handleNewItemDescription = (e) => {
    setNewItemDescription(e.target.value)
  }

  const addItem = () => {
    if (!newItemDescription) return

    setTodoItems((todoItems) => {
      const newTodoItems = {...todoItems}
      const newId = nanoid()

      const newItem = {
        id: newId,
        description: newItemDescription,
        isDone: false,
      }

      newTodoItems.order = [...newTodoItems.order, newId]
      newTodoItems.data = {...newTodoItems.data, [newId]: newItem}

      return newTodoItems
    })
    setNewItemDescription('')
  }

  const toggleItem = useCallback(
    (itemId: string) => {
      setTodoItems((items) => {
        return items.map((item) => {
          if (item.id === itemId) return {
            ...item,
            isDone: !item.isDone
          }

          return item
        })
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
