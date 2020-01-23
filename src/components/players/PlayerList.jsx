import React, { useState } from 'react'

const PlayerList = () => {
  // Use state, to fetch player list from API asynchronously
  const [ playerList, setPlayerList ] = useState(undefined)

  // Fetch current player list if we don't have it
  if (!playerList) {
    fetch("http://localhost:5000/players/").then(response => {
      response.json().then(json => {
        setPlayerList(json.players)
      })
    })
  }

  return (
    <main>
      <h2 className="title is-2">Players</h2>
      <ul>
        {playerList ? playerList.map((player, i) => <li key={i}>{`${player.first_name} ${player.last_name}`}</li>) : null}
      </ul>
    </main>
  )
}

export default PlayerList
