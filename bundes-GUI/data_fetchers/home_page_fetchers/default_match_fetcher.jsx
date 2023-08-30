export function getDefaultMatches()
{
    return fetch("http://localhost:8080/api/teams/8/matches?pageSize=60&pageNumber=1",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
}