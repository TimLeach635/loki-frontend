import React, { useState } from 'react'
import Navbar from './navbar/Navbar'
import Scoreboard from './scoreboard/Scoreboard'
import PlayerList from './players/PlayerList'
import GameList from './games/GameList'
import MatchList from './matches/MatchList'

import lokiLogo from '../Loki_logo.png'

require('dotenv').config()

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
        <div className="columns is-mobile">
          <div className="column is-1">
            <figure className="image is-2by3">
              <img src={lokiLogo} alt="Loki logo" />
            </figure>
          </div>
          <div className="column">
            <h1 className="title is-1">Loki</h1>
            <p className="subtitle is-3">Who's winning?</p>
          </div>
        </div>
        <hr />
        <Navbar goHome={goHome} goPlayers={goPlayers} goGames={goGames} goMatches={goMatches} />
        <hr />
        <Component backendUrl={process.env.REACT_APP_BACKEND_URL} />
      </div>
    </React.Fragment>
  )
}

export default Loki
