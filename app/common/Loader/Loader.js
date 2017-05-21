import React from 'react'

const Loader = () => {
  const style = {
    height: '5em',
    width: '5em'
  }
  return (
    <div className="level">
      <div className="level-item">
        <div style={style} className="loader" />
      </div>
    </div>
  )
}

export default Loader