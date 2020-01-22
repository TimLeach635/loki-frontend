import React from 'react'
import Scoreboard from './scoreboard/Scoreboard'

const Loki = () => {
  return (
    <main className="container">
      <h1 className="title is-1">Loki</h1>
      <p className="subtitle is-3">Who's winning?</p>
      <hr />
      <Scoreboard />
    </main>
  )
}

export default Loki
