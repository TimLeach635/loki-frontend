import React, { useState, useEffect } from 'react'
import Match from './Match'
import NewMatchForm from './NewMatchForm'

const MatchList = ({backendUrl}) => {
  // Use state, to fetch match list from API asynchronously
  const [ matchList, setMatchList ] = useState(undefined)
  const [ requireUpdate, setRequireUpdate ] = useState(true)

  const refresh = () => {
    setRequireUpdate(true)
  }

  const deleteMatch = async matchId => {
    await fetch(`${backendUrl}/matches/${matchId}/`, {
      method: "DELETE"
    })
    refresh()
  }

  useEffect(() => {
    if (requireUpdate) {
      const updateMatchList = async () => {
        const fetchResponse = await fetch(`${backendUrl}/matches/`)
        const responseJson = await fetchResponse.json()
  
        setRequireUpdate(false)
        setMatchList(responseJson.matches)
      }

      updateMatchList()
    }
  }, [backendUrl, requireUpdate])

  return (
    <main>
      <h2 className="title is-2">Matches</h2>
      {matchList ? matchList.map((match, i) => <Match key={i} match={match} deleteFunc={deleteMatch} />) : null}
      <hr />
      <NewMatchForm backendUrl={backendUrl} refreshFunc={refresh} />
    </main>
  )
}

export default MatchList
