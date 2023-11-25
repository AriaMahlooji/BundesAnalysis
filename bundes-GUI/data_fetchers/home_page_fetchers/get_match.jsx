export function getMatch(matchId)
{
  return fetch(`http://localhost:8080/api/matches/${matchId}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}