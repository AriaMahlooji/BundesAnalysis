export function getStandings()
{
    return fetch("http://localhost:8080/api/analysis/standing",{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"seasons":["15/16", "16/17", "17/18", "18/19", "19/20", "20/21", "21/22"]}) // Convert the data to JSON format
    } )
}