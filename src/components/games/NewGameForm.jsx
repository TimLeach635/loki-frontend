import React, { useState } from 'react'

const NewGameForm = ({backendUrl, refreshFunc}) => {
  // Use state
  const [ nameValue, setNameValue ] = useState('')

  const handleChange = event => {
    setNameValue(event.target.value)
  }

  const handleSubmit = () => {
    // Submit as POST request to backend
    fetch(`${backendUrl}/games/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameValue
      })
    }).then(refreshFunc)

    // then clear
    setNameValue("")
  }

  return (
    <React.Fragment>
      <h2 className="title is-3">Add new</h2>
      <div className="field">
        <label className="label">
          Game name
        </label>
        <div className="control">
          <input className="input" type="text" placeholder="Game name" value={nameValue} onChange={handleChange} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button" onClick={handleSubmit}>Add game</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NewGameForm
