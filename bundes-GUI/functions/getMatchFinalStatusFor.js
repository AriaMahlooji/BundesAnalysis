export function getMatchFinalStatusFor(match, chosenTeamId)
{
    let homeTeamScore = match.match.homeTeamScore;
    let awayTeamScore = match.match.awayTeamScore;

    if(match.match.homeTeamId === chosenTeamId)
    {
        if(homeTeamScore === awayTeamScore)
        {
            return "draw";
        }
        
        if(homeTeamScore > awayTeamScore)
        {
            return "won";
        }
        else
        {
            return "lost";
        }
    }
    else
    {
        if(homeTeamScore === awayTeamScore)
        {
            return "draw";
        }
        
        if(homeTeamScore > awayTeamScore)
        {
            return "lost";
        }
        else
        {
            return "won";
        }
    }
}