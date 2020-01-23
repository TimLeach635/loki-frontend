import React, { useState } from 'react'

const MatchList = () => {
  // Use state, to fetch match list from API asynchronously
  const [ matchList, setMatchList ] = useState(undefined)

  // Fetch current match list if we don't have it
  if (!matchList) {
    fetch("http://localhost:5000/matches/").then(response => {
      response.json().then(json => {
        setMatchList(json.matches)
      })
    })
  }

  return (
    <main>
      <h2 className="title is-2">Matches</h2>
      <ul>
        {matchList ? matchList.map((match, i) => <li key={i}>{`${match.game_name} - ${match.match_date}`}</li>) : null}
      </ul>
    </main>
  )
}

export default MatchList
