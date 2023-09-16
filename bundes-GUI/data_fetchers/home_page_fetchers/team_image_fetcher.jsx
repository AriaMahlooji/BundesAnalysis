export function getTeamImageById(id)
{
  return fetch(`http://localhost:8080/api/teams/${id}/image`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export function getTeamImageByName(name)
{
  return fetch(`http://localhost:8080/api/teams/image/${name}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}