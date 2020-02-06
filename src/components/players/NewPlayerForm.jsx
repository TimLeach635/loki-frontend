import React, { useState } from 'react'

const NewPlayerForm = ({refreshFunc, backendUrl}) => {
  // Use state
  const [ firstNameValue, setFirstNameValue ] = useState("")
  const [ lastNameValue, setLastNameValue ] = useState("")

  const handleFirstNameChange = event => {
    setFirstNameValue(event.target.value)
  }
  
  const handleLastNameChange = event => {
    setLastNameValue(event.target.value)
  }

  const handleSubmit = () => {
    // Submit as POST request to backend
    fetch(`${backendUrl}/players/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: firstNameValue,
        last_name: lastNameValue
      })
    }).then(refreshFunc)

    // then clear
    setFirstNameValue("")
    setLastNameValue("")
  }

  return (
    <React.Fragment>
      <h2 className="title is-3">Add new</h2>
      <div className="field">
        <label className="label">
          First name
        </label>
        <div className="control">
          <input className="input" type="text" placeholder="First name" value={firstNameValue} onChange={handleFirstNameChange} />
        </div>
      </div>
      <div className="field">
        <label className="label">
          Last name
        </label>
        <div className="control">
          <input className="input" type="text" placeholder="Last name" value={lastNameValue} onChange={handleLastNameChange} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button" onClick={handleSubmit}>Add player</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NewPlayerForm
