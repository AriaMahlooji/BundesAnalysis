export function saveOrUploadTeamLogo(teamName, teamLogo)
{
  
    return fetch("http://localhost:8080/api/teamimages/upload",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name":teamName,
        "image":teamLogo})
    })
}