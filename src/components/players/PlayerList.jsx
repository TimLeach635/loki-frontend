import React, { useState, useEffect } from 'react'
import NewPlayerForm from './NewPlayerForm'

const PlayerList = ({backendUrl}) => {
  // Use state, to fetch player list from API asynchronously
  const [ playerList, setPlayerList ] = useState(undefined)
  const [ requireUpdate, setRequireUpdate ] = useState(true)

  const refresh = () => {
    setRequireUpdate(true)
  }

  const deletePlayer = async player_id => {
    await fetch(`${backendUrl}/players/${player_id}/`, {
      method: "DELETE"
    })
    refresh()
  }

  useEffect(() => {
    if (requireUpdate) {
      const updatePlayerList = async () => {
        const fetchResponse = await fetch(`${backendUrl}/players/`)
        const responseJson = await fetchResponse.json()
  
        setRequireUpdate(false)
        setPlayerList(responseJson.players)
      }

      updatePlayerList()
    }
  }, [backendUrl, requireUpdate])

  return (
    <main>
      <h2 className="title is-2">Players</h2>
      <table className="table">
        <tbody>
          {playerList ? playerList.map((player, i) =>
            <tr key={i}>
              <td>
                <button className="delete" onClick={() => {deletePlayer(player.player_id)}} />
              </td>
              <td>{`${player.first_name} ${player.last_name}`}</td>
            </tr>) : null}
        </tbody>
      </table>
      <hr />
      <NewPlayerForm backendUrl={backendUrl} refreshFunc={refresh} />
    </main>
  )
}

export default PlayerList
