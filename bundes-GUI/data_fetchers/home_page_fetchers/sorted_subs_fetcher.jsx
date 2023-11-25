export function getSortedSubsAgainst(teamId, opponents, seasons, pageNumber, ascending)
{
    return fetch(`http://localhost:8080/api/teams/${teamId}/sortedsubstitutions?pageSize=10
    &pageNumber=${pageNumber}&ascending=${ascending}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "seasons":seasons,
        "opponentsIds":opponents})
    })
}