export function getplayerImage(season, teamId, playerName)
{
    return fetch(`http://localhost:8080/api/players/image`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "season":season,
        "teamId":teamId,
        "abbreviatedName":playerName})
    })
}