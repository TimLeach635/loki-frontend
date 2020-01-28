import React, { useState } from 'react'

const Scoreboard = () => {
  // Use state, to fetch player list from API asynchronously
  const [ playerList, setPlayerList ] = useState(undefined)

  // Fetch current playr list if we don't have it
  if (!playerList) {
    fetch("http://localhost:5000/players/").then(response => {
      response.json().then(json => {
        setPlayerList(json.players)
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
            <th>Games played</th>
            <th>Win ratio</th>
          </tr>
        </thead>
        <tbody>
          {playerList ? calculateScoreboard(playerList).map((player, i) => <tr key={i}>
            <td>{i + 1}</td>
            <td>{player.full_name}</td>
            <td>{player.win_count}</td>
            <td>{player.play_count}</td>
            <td>{player.win_ratio.toPrecision(2)}</td>
          </tr>) : null}
        </tbody>
      </table>
    </main>
  )
}

const calculateScoreboard = playerList => {
  // Map each player to their win ratio
  const winRatioList = playerList.map(player => {
    const winCount = player.plays.filter(play => play.did_win).length
    const playCount = player.plays.length

    return {
      full_name: `${player.first_name} ${player.last_name}`,
      win_count: winCount,
      play_count: playCount,
      win_ratio: winCount / playCount
    }
  })

  // Then order
  const scoreboard = winRatioList.filter(player => player.play_count > 0).sort((playerA, playerB) => playerB.win_ratio - playerA.win_ratio)

  return scoreboard
}

export default Scoreboard
