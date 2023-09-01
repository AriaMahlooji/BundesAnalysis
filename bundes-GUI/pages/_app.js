import Sidebar from "@/components/Sidebar";
import { PageNumberProvider } from "@/context APIs/PageNumberContext";
import { SeasonProvider } from "@/context APIs/SeasonHomePageContext";
import { TeamIdProvider } from "@/context APIs/TeamIdContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <TeamIdProvider>
      <PageNumberProvider>
        <SeasonProvider>
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        </SeasonProvider>
      </PageNumberProvider>
    </TeamIdProvider>
  );
}
