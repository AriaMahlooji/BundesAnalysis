const allOpponentsIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
export function getEvents(teamId, pageNumber, seasons, side, eventTitles, opponentsIds = allOpponentsIds)
{
  
    return fetch(`http://localhost:8080/api/teams/${teamId}/matches/against/events?pageSize=15&pageNumber=${pageNumber}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "seasons":seasons,
        "opponentsIds": opponentsIds,
        "eventTitles": eventTitles,
        "side":side})
    })
}