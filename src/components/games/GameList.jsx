import React, { useState } from 'react'

const GameList = () => {
  // Use state, to fetch game list from API asynchronously
  const [ gameList, setGameList ] = useState(undefined)

  // Fetch current game list if we don't have it
  if (!gameList) {
    fetch("http://localhost:5000/games/").then(response => {
      response.json().then(json => {
        setGameList(json.games)
      })
    })
  }

  return (
    <main>
      <h2 className="title is-2">Games</h2>
      <ul>
        {gameList ? gameList.map((game, i) => <li key={i}>{game.name}</li>) : null}
      </ul>
    </main>
  )
}

export default GameList
