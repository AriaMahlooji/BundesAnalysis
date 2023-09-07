import Sidebar from "@/components/Sidebar";
import { ChosenMatchProvider } from "@/context APIs/ChosenMatchContext";
import { FinalStatusProvider } from "@/context APIs/FinalStatusContext";
import { MatchProvider } from "@/context APIs/MatchContext";
import { PageNumberProvider } from "@/context APIs/PageNumberContext";
import { SeasonProvider } from "@/context APIs/SeasonHomePageContext";
import { TeamIdProvider } from "@/context APIs/TeamIdContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
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
  );
}
