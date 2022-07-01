# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resource](#useful-resource)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- Drag and drop to reorder items on the list

## My process

### Built with

- Semantic HTML5 markup
- Sass custom properties
- Flexbox
- Mobile-first workflow
- React
  - useEffect, useRef, useContext
- Plain JavaScript DOM manipulation

### What I learned

- Hover states only on desktop
```css
@media (hover: hover) and (pointer: fine) {
  .empty-circle:hover {
    border: 3px solid $bright-blue;
  }
  
  .new-todo--empty-circle.light:hover {
    border: 1px solid $lt-light-grayish-blue
  }

  .new-todo--empty-circle.dark:hover {
    border: 1px solid $very-dark-grayish-blue
  }
}
```

- Focus on the input on load (desktop only)
```js
const inputRef = useRef(null)
useEffect(() => {
  if (inputRef) {
    inputRef.current.focus()
  }
}, [inputRef])
```

- useContext for light/dark theme
```js
const ThemeContext = createContext()
function ThemeContextProvider(props) {
  const [theme, setTheme] = useState("dark")
  function toggleTheme() {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark")
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}
```


### Useful resource

- [Web Dev Simplified](https://www.youtube.com/WebDevSimplified) - This is where I learned the drag and drop functionality (for desktop).