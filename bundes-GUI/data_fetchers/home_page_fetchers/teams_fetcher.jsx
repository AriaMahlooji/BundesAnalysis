export function getAllTeams()
{
  return fetch("http://localhost:8080/api/teams",{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}
