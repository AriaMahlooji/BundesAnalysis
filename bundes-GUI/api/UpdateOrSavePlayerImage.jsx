export function saveOrUploadPlayerImage(playerName, playerImage)
{
  
    return fetch("http://localhost:8080/api/playerimages/upload",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name":playerName + ".jpg",
        "image":playerImage})
    })
}