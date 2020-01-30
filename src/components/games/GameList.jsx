import React, { useState, useEffect } from 'react'
import NewGameForm from './NewGameForm'

const GameList = () => {
  // Use state, to fetch game list from API asynchronously
  const [ gameList, setGameList ] = useState(undefined)
  const [ requireUpdate, setRequireUpdate ] = useState(true)

  const refresh = () => {
    setRequireUpdate(true)
  }

  const deleteGame = async game_id => {
    await fetch(`http://localhost:5000/games/${game_id}/`, {
      method: "DELETE"
    })
    refresh()
  }

  useEffect(() => {
    if (requireUpdate) {
      const updateGameList = async () => {
        const fetchResponse = await fetch("http://localhost:5000/games/")
        const responseJson = await fetchResponse.json()
  
        setRequireUpdate(false)
        setGameList(responseJson.games)
      }
  
      updateGameList()
    }
  }, [requireUpdate])  // This effect will re-run every time requireUpdate changes

  return (
    <main>
      <h2 className="title is-2">Games</h2>
      <table className="table">
        <tbody>
          {gameList ? gameList.map((game, i) =>
            <tr key={i}>
              <td>
                <button className="delete" onClick={() => {deleteGame(game.game_id)}} />
              </td>
              <td>{game.name}</td>
            </tr>) : null}
        </tbody>
      </table>
      <hr />
      <NewGameForm refreshFunc={refresh} />
    </main>
  )
}

export default GameList
