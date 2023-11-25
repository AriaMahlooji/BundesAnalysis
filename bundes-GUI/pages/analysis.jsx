import TeamsStanding from "@/components/TeamsStanding";
import SideContent from "@/components/SideContent";
import Analyzer from "@/components/Analyzer";
import { useOpponentsModalIsOpen } from "@/context APIs/OpponentModalVisibilityContext";
import ChooseOpponentModal from "@/components/ChooseOpponentsModal";
import { useTeamId } from "@/context APIs/TeamIdContext";
import { useOpponents } from "@/context APIs/OpponentsContext";
import { useSeason } from "@/context APIs/SeasonHomePageContext";
import { useEffect, useState } from "react";
import { getSortedSubsAgainst } from "@/data_fetchers/home_page_fetchers/sorted_subs_fetcher";
import EvaluatedSubstitutionsList from "@/components/EvaluatedSubstitutionsList";
import { usePageNumber } from "@/context APIs/PageNumberContext";
import { useAscending } from "@/context APIs/AscendingContext";
import EvaluatedSubstitutionModal from "@/components/EvaluatedSubstitutionModal";
import { useChosenEvaluatedSubstitution } from "@/context APIs/ChosenEvaluatedSubstitution";

const analysis = () => {
  const {teamId, setTeamId} = useTeamId();
  const {opponents, setOpponents} = useOpponents();
  const {seasons, setSeasons} = useSeason();
  const {pageNumber, setPageNumber} = usePageNumber();
  const {ascending, setAscending} = useAscending();
  const [evaluatedSubstitutions, setEvaluatedSubstitutions] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const {chosenEvaluatedSubstitution, setChosenEvaluatedSubstitution} = useChosenEvaluatedSubstitution();
  

  useEffect(()=>{
    setIsLoading(true);
    getSortedSubsAgainst(teamId, opponents, seasons, pageNumber, ascending)
      .then(res=> res.json())
      .then(data=>{setEvaluatedSubstitutions(data); setIsLoading(false)});
  },[teamId, opponents, seasons, pageNumber, ascending]);

  useEffect(()=>{
    if(chosenEvaluatedSubstitution)
    {
      setEvaluatedSubstitutionModalIsOpen(true);
    }

    else
      setEvaluatedSubstitutionModalIsOpen(false);
  },[chosenEvaluatedSubstitution])

  
  const closeChooseOpponentModal = () => {
    setOpponentsModalIsOpen(false);
  };

  const closeEvaluatedSubstitutionModal = () => {
    setEvaluatedSubstitutionModalIsOpen(false);
    setChosenEvaluatedSubstitution();
  };
  const {opponentsModalIsOpen, setOpponentsModalIsOpen} = useOpponentsModalIsOpen();
  const [evaluatedSubstitutionModalIsOpen, setEvaluatedSubstitutionModalIsOpen] = useState(true);


  return (
    <div>
      <div className="bg-gray-300 min-h-screen p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="col-span-2 bg-white rounded-lg">
          <Analyzer />
        </div>
        <div className="bg-white rounded-lg p-2">
          <SideContent title="Substitutions">
            <EvaluatedSubstitutionsList isLoading={isLoading} evaluatedSubstitutions={evaluatedSubstitutions}/>
          </SideContent>
        </div>
      </div>
      <ChooseOpponentModal
        isOpen={opponentsModalIsOpen}
        onClose={closeChooseOpponentModal}
      ></ChooseOpponentModal>

      <EvaluatedSubstitutionModal isOpen={evaluatedSubstitutionModalIsOpen}
       onClose={closeEvaluatedSubstitutionModal}/>
    </div>
  );
};

export default analysis;
