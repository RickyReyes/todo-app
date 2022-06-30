import { useState, useEffect, useRef, useContext } from "react"
import './App.css';
import { ThemeContext } from "./themeContext"


function App() {
  const [newTodo, setNewTodo] = useState('')
  const [id, setId] = useState(0)
  const [allTodos, setAllTodos] = useState([])
  const [currentFilter, setCurrentFilter] = useState('All')
  const renderedTodos = 
    currentFilter === 'Active' ? allTodos.filter(todo => !todo.completed) : 
    currentFilter === 'Completed' ? allTodos.filter(todo => todo.completed) :
    allTodos

  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    document.body.classList = theme
  }, [theme])

  useEffect(() => {
    setId(prevId => prevId + 1)
  }, [allTodos])

  const inputRef = useRef(null)
  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus()
    }
  }, [inputRef])

  function handleInput(e) {
    setNewTodo(e.target.value)
  }
  
  function handleSubmit(e) {
    if (e.key == 'Enter') {
      setAllTodos(prevTodos => [
        {name: newTodo,
        completed: false,
        id: id}, 
        ...prevTodos
      ])
      setNewTodo('')
    }
  }

  function handleDelete(id) {
    setAllTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  function handleDeleteCompleted() {
    setAllTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
  }

  function toggleCompleted(toggledId) {
    setAllTodos(prevTodos => prevTodos.map((todo) => {
      if (toggledId == todo.id) {
        return {...todo, completed: !todo.completed}
      } else {
        return todo
      }
    }))
  }

  /* drag and drop */
  function getDragAfterElement(y) {
    const draggableElements = [...document.querySelectorAll('.todo')]
    return draggableElements.reduce((closest, currentChild) => {
      const box = currentChild.getBoundingClientRect()
      // distance from mouse to middle of box
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: currentChild }
      } else {
        return closest
      }
    }, {offset: Number.NEGATIVE_INFINITY}).element
  }

  useEffect(() => {
    const draggables = document.querySelectorAll('.todo')
    const container = document.querySelector('.todo-ul')
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
      })

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
      })
    })

    container.addEventListener('dragover', e => {
      const afterElement = getDragAfterElement(e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
    })
  }, [allTodos, renderedTodos])

  /* BEGINNING TOUCH FUNCTIONALITY */

  useEffect(() => {
    const draggables = document.querySelectorAll('.todo')
    const container = document.querySelector('.todo-ul')
    draggables.forEach(draggable => {
      draggable.addEventListener('touchstart', () => {
        draggable.classList.add('dragging')
      })

      draggable.addEventListener('touchend', () => {
        draggable.classList.remove('dragging')
      })
    })

    container.addEventListener('touchmove', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(e.targetTouches[0].clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
    })
  }, [allTodos, renderedTodos])

  /* END TOUCH FUNCTIONALITY */

  return (
    <div className={`App ${theme}`}>
      <header className={theme}>
        <div className="header-container">
          <h1>todo</h1>
          <div 
          onClick={toggleTheme}
          className={`toggle-theme-icon ${theme}`}></div>
        </div>
      </header>
      <main>
        <div className="new-todo--container">
          <div className={`new-todo--empty-circle empty-circle ${theme}`}></div>
          <input 
              ref={inputRef}
              onChange={handleInput}
              onKeyPress={handleSubmit}
              className={`new-todo ${theme}`} 
              type="text"  
              placeholder="Create a new todo..." 
              value={newTodo} />
        </div>
        <ul className="todo-ul">
          {renderedTodos.map((todo, idx) => (
            <li 
            key={idx}
            className={"todo" + (todo.completed ? ' completed ' : ' ') + theme}
            draggable={true}>
              <div onClick={() => toggleCompleted(todo.id)} className={`empty-circle  ${todo.completed ? " completed " : " "} ${theme}`}>
                {todo.completed && <svg className="completed-check" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>}
              </div>
              <p className="todo-name">{todo.name}</p>
              <svg onClick={() => handleDelete(todo.id)} className="close-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </li>
          ))}
        </ul>
        {allTodos.length > 0 && <div className={`todo--footer ${theme}`}>
          <p className="items-left">
            {allTodos.filter(todo => !todo.completed).length + " " +
            `item${allTodos.filter(todo => !todo.completed).length !== 1 ? 's' : ''} left`}</p>
          <div className={`desktop-filter-container filter-container ${theme}`}>
            <p className={"filter" + (currentFilter == 'All' ? ' current-filter' : '')}
              onClick={(() => setCurrentFilter('All'))}>
                All
            </p>
            <p className={"filter" + (currentFilter == 'Active' ? ' current-filter' : '')}
                onClick={(() => setCurrentFilter('Active'))}>
                  Active
            </p>
            <p className={"filter" + (currentFilter == 'Completed' ? ' current-filter' : '')}
              onClick={(() => setCurrentFilter('Completed'))}>
              Completed
            </p>
          </div>
          <p className={`clear-completed ${theme}`} onClick={handleDeleteCompleted}>Clear Completed</p>
        </div>}
        <div className={`filter-container ${theme}`}>
          <p className={"filter" + (currentFilter == 'All' ? ' current-filter' : '')}
             onClick={(() => setCurrentFilter('All'))}>
              All
          </p>
          <p className={"filter" + (currentFilter == 'Active' ? ' current-filter' : '')}
              onClick={(() => setCurrentFilter('Active'))}>
                Active
          </p>
          <p className={"filter" + (currentFilter == 'Completed' ? ' current-filter' : '')}
             onClick={(() => setCurrentFilter('Completed'))}>
            Completed
          </p>
        </div>
        {allTodos.length > 1 && <p className="drag-and-drop-p">Drag and drop to reorder list</p>}
      </main>
    </div>

  );
}

export default App;