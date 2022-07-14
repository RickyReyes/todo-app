import { useState, useEffect, useRef, useContext } from "react"
import './App.css';

import Header from "./components/Header";
import NewTodo from "./components/NewTodo";
import Todo from "./components/Todo";
import Filters from "./components/Filters";
import { ThemeContext } from "./themeContext"

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [allTodos, setAllTodos] = useState(localStorage.getItem('allTodos') ? JSON.parse(localStorage.getItem('allTodos')) : [])
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
    localStorage.setItem('allTodos', JSON.stringify(allTodos))
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
    if (e.key === 'Enter') {
      if (newTodo.trim() === '') {
        alert('Please fill the required field.')
        return
      }
      setAllTodos(prevTodos => [
        {name: newTodo,
        completed: false,
        id: Date.now()},
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

      draggable.addEventListener('touchstart', () => {
        draggable.classList.add('dragging')
      })

      draggable.addEventListener('touchend', () => {
        draggable.classList.remove('dragging')
      })
    })

    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
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


  /* appears on left side of footer. e.g. "1 item left" "3 items left" */
  const itemsLeftWord = 
  <p className="items-left">
    {allTodos.filter(todo => !todo.completed).length + " " +
  `item${allTodos.filter(todo => !todo.completed).length !== 1 ? 's' : ''} left`}
  </p>

  return (
    <div className={`App ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <NewTodo inputRef={inputRef} 
                 handleInput={handleInput}
                 handleSubmit={handleSubmit}
                 theme={theme} 
                 newTodo={newTodo} />
        <ul className="todo-ul">
          {renderedTodos.map((todo) => (
            <Todo key={todo.id} 
                  theme={theme} 
                  toggleCompleted={toggleCompleted} 
                  handleDelete={handleDelete} 
                  todo={todo} />
          ))}
        </ul>
        {allTodos.length > 0 && 
          <div className={`todo--footer ${theme}`}>
          {itemsLeftWord}
            <Filters isDesktop={true}
                    theme={theme} 
                    currentFilter={currentFilter}
                    setCurrentFilter={setCurrentFilter} />  
            <p className={`clear-completed ${theme}`} onClick={handleDeleteCompleted}>Clear Completed</p>
        </div>}
        <Filters theme={theme} 
                 currentFilter={currentFilter}
                 setCurrentFilter={setCurrentFilter} />  
        {allTodos.length > 1 && <p className="drag-and-drop-p">Drag and drop to reorder list</p>}
      </main>
    </div>

  );
}

export default App;