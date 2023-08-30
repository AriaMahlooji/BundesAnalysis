import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import TopCards from "@/components/TopCards";
import BarChart from "@/components/BarChart";
import RecentOrders from "@/components/RecentOrders";
import { RxFace } from "react-icons/rx";
import TeamsStanding from "@/components/TeamsStanding";
import { useEffect, useState } from "react";
import MatchList from "@/components/MatchList";
import { getStandings } from "@/data_fetchers/home_page_fetchers/standing_fetcher";
import { getDefaultMatches } from "@/data_fetchers/home_page_fetchers/default_match_fetcher";
import SideContent from "@/components/SideContent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [standingData, setStandingData] = useState();
  useEffect(()=>{
    getStandings().then(response => response.json())
    .then(data => setStandingData(data))
    .catch(error => console.error('Error fetching data:', error));
  },[]);

  const[matches, setMatches] = useState([]);
  useEffect(()=>{
    getDefaultMatches().then(response => response.json())
    .then(data => setMatches(data))
    .catch(error => console.error('Error fetching data:', error));
  },[])


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-200 min-h-screen">
        <Header title={"Home"}></Header>
        <TopCards />
        <div className="border p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="col-span-2">
            <TeamsStanding standingInfo={standingData}/>
          </div>
          <SideContent title="Matches" ><MatchList matches={matches}></MatchList></SideContent>
        </div>
      </main>
    </>
  );
}
