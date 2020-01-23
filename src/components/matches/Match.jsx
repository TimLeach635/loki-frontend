import React from 'react'

const Match = ({ match }) => {
  return (
    <div className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>Game:</strong> {match.game_name}
          </p>
          <p>
            <strong>Date:</strong> {new Date(match.match_date).toLocaleDateString('en-GB')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Match
