import React from 'react'

const Match = ({ match, deleteFunc }) => {
  return (
    <div className="media">
      <div className="media-left">
        <button className="delete" onClick={() => {deleteFunc(match.match_id)}} />
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>Game:</strong> {match.game_name}
          </p>
          <p>
            <strong>Date:</strong> {new Date(match.match_date).toLocaleDateString('en-GB')}
          </p>
          <p>
            <strong>Winners:</strong> {match.players
              .filter(player => player.did_win)
              .map(player => player.first_name)
              .join(", ")}
          </p>
          <p>
            <strong>Non-winners:</strong> {match.players
              .filter(player => !player.did_win)
              .map(player => player.first_name)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Match
