import React, { useState } from 'react'
import Navbar from './navbar/Navbar'
import Scoreboard from './scoreboard/Scoreboard'
import PlayerList from './players/PlayerList'
import GameList from './games/GameList'
import MatchList from './matches/MatchList'

const Loki = () => {
  // Use state to hold what page we're on
  const [ page, setPage ] = useState('home')

  // Functions to pass to the navbar to switch pages
  const goHome = () => {setPage('home')}
  const goPlayers = () => {setPage('players')}
  const goGames = () => {setPage('games')}
  const goMatches = () => {setPage('matches')}

  let Component
  switch (page) {
    case 'home':
      Component = Scoreboard
      break
    case 'players':
      Component = PlayerList
      break
    case 'games':
      Component = GameList
      break
    case 'matches':
      Component = MatchList
      break
    default:
      Component = Scoreboard
      break
  }

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="title is-1">Loki</h1>
        <p className="subtitle is-3">Who's winning?</p>
        <hr />
        <Navbar goHome={goHome} goPlayers={goPlayers} goGames={goGames} goMatches={goMatches} />
        <hr />
        <Component />
      </div>
    </React.Fragment>
  )
}

export default Loki
