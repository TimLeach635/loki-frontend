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
    <main>
      <h2 className="title is-2">Scoreboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {scoreboard ? scoreboard.map((row, i) => <tr key={i}><td>{i + 1}</td><td>{row.player_name}</td><td>{row.player_wins}</td></tr>) : null}
        </tbody>
      </table>
    </main>
  )
}

export default Scoreboard
