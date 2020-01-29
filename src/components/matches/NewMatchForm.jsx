import React, { useState, useEffect } from 'react'
import xor from 'logical-xor'

const NewMatchForm = ({refreshFunc}) => {
  const [ playerList, setPlayerList ] = useState(undefined)
  const [ gameList, setGameList ] = useState(undefined)
  const [ gameData, setGameData ] = useState(undefined)
  const [ dateData, setDateData ] = useState(new Date())
  const [ playData, setPlayData ] = useState({})

  const handleSubmit = () => {
    // Get winner and non-winner id lists
    let winner_ids = []
    let non_winner_ids = []
    for (const id in playData) {
      if (playData[id].win) {
        winner_ids.push(id)
      } else if (playData[id].nonWin) {
        non_winner_ids.push(id)
      }
    }

    // Submit as POST request to backend
    fetch("http://localhost:5000/matches/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        game_id: gameData,
        date: dateData,
        winner_ids: winner_ids,
        non_winner_ids: non_winner_ids
      })
    })

    refreshFunc()
  }

  useEffect(() => {
    const updatePlayerList = async () => {
      const fetchResponse = await fetch("http://localhost:5000/players/")
      const responseJson = await fetchResponse.json()

      const newPlayData = {}
      for (let player of responseJson.players) {
        newPlayData[player.player_id] = {
          win: false,
          nonWin: false
        }
      }
      setPlayData(newPlayData)
      setPlayerList(responseJson.players)
    }
    const updateGameList = async () => {
      const fetchResponse = await fetch("http://localhost:5000/games/")
      const responseJson = await fetchResponse.json()

      setGameList(responseJson.games)
      setGameData(responseJson.games[0].game_id)
    }

    updatePlayerList()
    updateGameList()
  }, [])

  const generateCheckboxFunction = (id, win) => {
    return () => {
      const newPlayData = {}
      Object.assign(newPlayData, playData)
      // toggle the win if 'win'
      newPlayData[id].win = xor(!win, !newPlayData[id].win)
      // toggle the non-win if !win
      newPlayData[id].nonWin = xor(win, !newPlayData[id].nonWin)
      setPlayData(newPlayData)
    }
  }

  const onGameSelectChange = event => {
    setGameData(event.target.value)
  }

  const onDateChange = event => {
    setDateData(new Date(event.target.value))
  }

  return (
    <React.Fragment>
      <h2 className="title is-3">Add new</h2>
      <div className="field">
        <div className="label">Game</div>
        <div className="control">
          <div className="select">
            <select value={gameData} onChange={onGameSelectChange}>
              {gameList ? gameList.map(game => 
                <option key={game.game_id} value={game.game_id}>{game.name}</option>) : null}
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <div className="label">Date</div>
        <div className="control">
          <input className="input" type="date" onChange={onDateChange} />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Win</th>
            <th>Non-win</th>
          </tr>
        </thead>
        <tbody>
          {playerList ? playerList.map(player => (
            <tr key={player.player_id}>
              <td>{`${player.first_name} ${player.last_name}`}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={generateCheckboxFunction(player.player_id, true)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={generateCheckboxFunction(player.player_id, false)}
                />
              </td>
            </tr> 
          )) : null}
        </tbody>
      </table>
      <button className="button" onClick={handleSubmit}>Add match</button>
    </React.Fragment>
  )
}

export default NewMatchForm
