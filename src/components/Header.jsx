import React from 'react'

const Header = ({theme, toggleTheme}) => {
  return (
    <header className={theme}>
      <div className="header-container">
        <h1>todo</h1>
        <div 
        onClick={toggleTheme}
        className={`toggle-theme-icon ${theme}`}></div>
      </div>
    </header>
  )
}

export default Header