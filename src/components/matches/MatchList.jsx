import React, { useState, useEffect } from 'react'
import Match from './Match'
import NewMatchForm from './NewMatchForm'

const MatchList = () => {
  // Use state, to fetch match list from API asynchronously
  const [ matchList, setMatchList ] = useState(undefined)
  const [ requireUpdate, setRequireUpdate ] = useState(true)

  const refresh = () => {
    setRequireUpdate(true)
  }

  useEffect(() => {
    if (requireUpdate) {
      const updateMatchList = async () => {
        const fetchResponse = await fetch("http://localhost:5000/matches/")
        const responseJson = await fetchResponse.json()
  
        setRequireUpdate(false)
        setMatchList(responseJson.matches)
      }

      updateMatchList()
    }
  }, [requireUpdate])

  return (
    <main>
      <h2 className="title is-2">Matches</h2>
      {matchList ? matchList.map((match, i) => <Match key={i} match={match} />) : null}
      <hr />
      <NewMatchForm refreshFunc={refresh} />
    </main>
  )
}

export default MatchList
