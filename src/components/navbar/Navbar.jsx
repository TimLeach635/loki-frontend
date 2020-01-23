import React from 'react'

const Navbar = ({ goHome, goPlayers, goGames, goMatches }) => {
  return (
    <nav>
      <span>
        <button className="button" onClick={goHome}>Home</button> 
        <button className="button" onClick={goPlayers}>Players</button> 
        <button className="button" onClick={goGames}>Games</button> 
        <button className="button" onClick={goMatches}>Matches</button>
      </span>
    </nav>
  )
}

export default Navbar
