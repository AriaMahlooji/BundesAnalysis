export function getMatchEvents(matchId)
{
  
    return fetch(`http://localhost:8080/api/matches/${matchId}/events`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
}