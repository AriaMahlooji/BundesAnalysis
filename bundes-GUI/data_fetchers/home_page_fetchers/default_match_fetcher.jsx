export function getDefaultMatches(teamId, pageNumber, seasons, finalStatus)
{
  
    return fetch(`http://localhost:8080/api/teams/${teamId}/matches?pageSize=15&pageNumber=${pageNumber}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "seasons":seasons,
        "finalStatus":finalStatus})
    })
}