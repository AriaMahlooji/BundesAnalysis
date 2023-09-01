export function getStandings(seasons)
{
    return fetch("http://localhost:8080/api/analysis/standing",{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"seasons":seasons}) // Convert the data to JSON format
    } )
}