import Profile from "./profile";
import { fetchTeams } from "@/lib/data";

export default async function Page() {
  const teams = await fetchTeams();

  return <Profile leagueTeams={JSON.stringify(teams)}/>;
}
