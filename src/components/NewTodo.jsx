import React from 'react'

const NewTodo = ({inputRef, handleInput, handleSubmit, theme, newTodo}) => {
  return (
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
  )
}

export default NewTodo