import Sidebar from "@/components/Sidebar";
import { AscendingProvider } from "@/context APIs/AscendingContext";
import { ChosenEvaluatedSubstitutionProvider } from "@/context APIs/ChosenEvaluatedSubstitution";
import { ChosenMatchProvider } from "@/context APIs/ChosenMatchContext";
import { EventTypeProvider } from "@/context APIs/EventTypeContext";
import { FinalStatusProvider } from "@/context APIs/FinalStatusContext";
import { MatchProvider } from "@/context APIs/MatchContext";
import { GoalProvider } from "@/context APIs/MatchContext copy";
import { MatchOrGoalProvider } from "@/context APIs/MatchOrGoalContext";
import { OpponentsModalIsOpenProvider } from "@/context APIs/OpponentModalVisibilityContext";
import { OpponentsProvider } from "@/context APIs/OpponentsContext";
import { PageNumberProvider } from "@/context APIs/PageNumberContext";
import { SeasonProvider } from "@/context APIs/SeasonHomePageContext";
import { SideProvider } from "@/context APIs/SideContext";
import { TeamIdProvider } from "@/context APIs/TeamIdContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ChosenEvaluatedSubstitutionProvider>
      <AscendingProvider>
        <OpponentsModalIsOpenProvider>
          <OpponentsProvider>
            <EventTypeProvider>
              <MatchOrGoalProvider>
                <SideProvider>
                  <GoalProvider>
                    <ChosenMatchProvider>
                      <FinalStatusProvider>
                        <MatchProvider>
                          <TeamIdProvider>
                            <PageNumberProvider>
                              <SeasonProvider>
                                <Sidebar>
                                  <Component {...pageProps} />
                                </Sidebar>
                              </SeasonProvider>
                            </PageNumberProvider>
                          </TeamIdProvider>
                        </MatchProvider>
                      </FinalStatusProvider>
                    </ChosenMatchProvider>
                  </GoalProvider>
                </SideProvider>
              </MatchOrGoalProvider>
            </EventTypeProvider>
          </OpponentsProvider>
        </OpponentsModalIsOpenProvider>
      </AscendingProvider>
    </ChosenEvaluatedSubstitutionProvider>
  );
}
