import React, { useState } from 'react'
import Match from './Match'

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
      {matchList ? matchList.map((match, i) => <Match key={i} match={match} />) : null}
    </main>
  )
}

export default MatchList
