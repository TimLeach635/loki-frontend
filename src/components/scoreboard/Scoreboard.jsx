import React, { useState } from 'react'

const Scoreboard = () => {
  // Use state, to fetch scoreboard from API asynchronously
  const [ scoreboard, setScoreboard ] = useState(undefined)

  // Fetch current scoreboard if we don't have it
  if (!scoreboard) {
    fetch("http://localhost:5000").then(response => {
      response.json().then(json => {
        setScoreboard(json.scoreboard)
      })
    })
  }

  return (
    <React.Fragment>
      <h2 className="title is-2">Scoreboard</h2>
      <ol>
        {scoreboard ? scoreboard.map((name, i) => <li key={i}>{name}</li>) : null}
      </ol>
    </React.Fragment>
  )
}

export default Scoreboard
