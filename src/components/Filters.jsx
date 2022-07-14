import React from 'react'

const Filters = ({isDesktop, theme, currentFilter, setCurrentFilter}) => {

  return (
    <div className={`${isDesktop && "desktop-filter-container"} filter-container ${theme}`}>
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
  )
}

export default Filters