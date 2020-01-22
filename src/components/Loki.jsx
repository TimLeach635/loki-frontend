import React from 'react'
import Navbar from './navbar/Navbar'
import Scoreboard from './scoreboard/Scoreboard'

const Loki = () => {
  return (
    <React.Fragment>
      <div className="container">
        <h1 className="title is-1">Loki</h1>
        <p className="subtitle is-3">Who's winning?</p>
        <hr />
        <Navbar />
        <hr />
        <Scoreboard />
      </div>
    </React.Fragment>
  )
}

export default Loki
