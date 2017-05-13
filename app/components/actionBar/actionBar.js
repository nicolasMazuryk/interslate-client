import React from 'react'

const ActionBar = () => {
  return (
    <nav className="panel">
      <div className="panel-block" style={{justifyContent: 'flex-end'}}>
        <div className="level">
          <div className="level-right">
            <p className="level-item">
              <span className="select">
                <select name="languages">
                  <option>Select language</option>
                  <option>With options</option>
                </select>
              </span>
            </p>
            <p className="level-item">
              <button
                name="addKey"
                className="button is-primary is-inverted"
              >
                Add Key
              </button>
            </p>
            <p className="level-item">
              <button
                name="upload"
                className="button is-success"
              >
                Upload
              </button>
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default ActionBar